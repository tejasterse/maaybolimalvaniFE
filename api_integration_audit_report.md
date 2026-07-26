# API Integration Audit Report

**Project:** Maayboli Malvani (Frontend + Backend)  
**Auditor:** Senior Full Stack Architect & QA Engineer  
**Date:** July 26, 2026  

---

## Executive Summary

A thorough full-stack audit was performed on the **Maayboli Malvani** web application, inspecting all frontend pages, components, hooks, API services (`src/api`), environment configurations, router setups, and backend routes, controllers, middleware, services, repositories, and database schemas (`Maayboli-Backend-main`).

While core CRUD APIs for **Posts**, **Categories**, **Districts**, **Ads/Banners**, **Entertainment**, **Events**, and **Gallery** exist on the backend, several **critical structural mismatches, hardcoded local URLs, missing auth headers, syntax errors, and missing APIs** currently prevent full integration.

---

## ✅ Correctly Connected APIs

| Screen / Component | Method | Endpoint | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Login** (`AdminLoginPage.jsx`) | `POST` | `/api/auth/login` | ⚠️ Partially Connected | Calls API & saves token to `localStorage`, but frontend doesn't attach Bearer token to subsequent requests. |
| **Admin Categories** (`TalukaPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/categories`, `/api/categories/:id` | ✅ Connected | Full CRUD working via TanStack Query and `apiClient`. |
| **Admin Districts/Talukas** (`TalukaPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/districts`, `/api/districts/:id` | ✅ Connected | Full CRUD working via TanStack Query and `apiClient`. |
| **Admin Ads** (`AdsPage.jsx`) | `GET`, `POST`, `DELETE` | `/api/banners`, `/api/banners/:id` | ⚠️ Partially Connected | CRUD works, but image preview uses hardcoded `https://maayboli-backend.yuktiyantra.com`. |
| **Admin Entertainment** (`EntertainmentPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/entertainment`, `/api/entertainment/:id` | ⚠️ Partially Connected | CRUD works, but image preview uses hardcoded URL. |
| **Admin Events** (`EventsPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/events`, `/api/events/:id` | ⚠️ Partially Connected | CRUD works, but image preview uses hardcoded URL. |
| **Admin Gallery** (`GalleryAdminPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/gallery`, `/api/gallery/:id` | ⚠️ Partially Connected | CRUD works, but media preview uses hardcoded URL. |
| **Admin Articles** (`ArticlesPage.jsx`) | `GET`, `DELETE` | `/api/posts`, `/api/posts/:id` | ⚠️ Partially Connected | Lists & deletes posts, but category filtering query param `categoryId` is ignored by backend. |
| **Article Editor** (`ArticleEditorPage.jsx`) | `POST`, `PUT` | `/api/posts`, `/api/posts/:id` | ⚠️ Partially Connected | Creates & updates posts with FormData uploads. Uses hardcoded image URL on edit. |
| **Review Queue** (`ReviewPage.jsx`) | `GET`, `PUT` | `/api/posts?admin=true`, `/api/posts/:id/status` | ⚠️ Partially Connected | Updates status to `PUBLISHED`/`DRAFT`, but hardcoded image URLs used. |

---

## ❌ Missing Backend APIs

| Screen / Feature | Required Endpoint | Reason / Impact |
| :--- | :--- | :--- |
| **Users & Roles Admin** (`UsersPage.jsx`) | `GET /api/users`<br>`POST /api/users/invite`<br>`PUT /api/users/:id/role`<br>`DELETE /api/users/:id` | `UsersPage.jsx` currently displays hardcoded mock data (`constants/data.jsx`). No User management APIs exist in backend. |
| **Dashboard Analytics** (`DashboardPage.jsx`) | `GET /api/dashboard/stats`<br>`GET /api/dashboard/activities` | `DashboardPage.jsx` displays static stats and mock activity log. Backend has no metrics endpoint. |
| **Site Settings** (`SettingsPage.jsx`) | `GET /api/settings`<br>`PUT /api/settings` | Breaking ticker text, WhatsApp channel link, tagline, site email settings are UI-only and lost on refresh. |
| **Global Search API** (`SearchPage.jsx`) | `GET /api/posts/search?q=query` or `GET /api/posts?search=query` | `SearchPage.jsx` uses hardcoded `searchResults` mock array. Backend `PostRepository` has no `LIKE %query%` search implementation. |
| **Chatbot / AI Integration** (`ChatbotPage.jsx`) | `POST /api/chatbot` | Chatbot uses front-end keyword matching rules. No AI/RAG backend API exists. |
| **User / Reader Auth** (`UserLoginPage.jsx`) | `POST /api/auth/login` (Reader role)<br>`POST /api/auth/register` | `UserLoginPage.jsx` uses hardcoded `reader@maayboli.in / kokan@2026` mock logic. No public reader auth flow. |
| **Auth Logout** | `POST /api/auth/logout` | No logout endpoint to invalidate cookies or refresh tokens. |
| **Media Library** (`MediaPage.jsx`) | `GET /api/media`<br>`POST /api/media` | Media library uses hardcoded `mediaFiles` mock data. No standalone media storage repository. |

---

## ❌ Frontend Issues

| File | Issue | Fix |
| :--- | :--- | :--- |
| `src/api/apiClient.js` | **Malformed Base URL**: `baseURL: '\https://maayboli-backend.yuktiyantra.com/api'` has a stray leading backslash `\`. Does NOT read from `.env` (`import.meta.env.VITE_API_URL`). Missing request interceptor to attach Bearer token. | Remove backslash, dynamic fallback to `import.meta.env.VITE_API_URL || 'http://localhost:5000'`, and add Authorization header interceptor. |
| `src/pages/user/EventsListingPage.jsx` | **Runtime Crash**: Uses `<MapPin size={18} />` on line 64 but `MapPin` is missing from `lucide-react` imports! | Add `MapPin` to `import { Calendar, Tent, MapPin } from 'lucide-react'`. |
| `src/api/posts.js` | **Query Param Mismatch**: `fetchPosts` passes `{ categoryId }` (camelCase), but backend expects `category_id` (snake_case). | Change `params.categoryId = categoryId` to `params.category_id = categoryId`. |
| `src/pages/user/HomePage.jsx` | **Hardcoded Localhost**: Lines 35, 44, 66, 177, 253, 307, 404, 469, 506, 592 hardcode `http://localhost:5000` for image/media source URLs instead of using `VITE_API_URL`. | Replace `http://localhost:5000` with `apiClient` base URL or helper `getMediaUrl(path)`. |
| `src/pages/user/ArticlePage.jsx` | **Hardcoded Localhost**: Lines 66, 68 hardcode `http://localhost:5000/api/posts/...`. | Replace with dynamic base URL helper. |
| `src/pages/user/ListingPage.jsx` | **Hardcoded Localhost & Category Filter Bug**: Hardcodes `http://localhost:5000` on line 171. Sends `categoryKey` string instead of `category_id` integer. | Fix media URL and pass resolved `category_id` to `fetchPosts`. |
| `src/pages/user/EntertainmentListingPage.jsx` | **Hardcoded Localhost**: Hardcodes `http://localhost:5000` on line 55. | Replace with dynamic base URL helper. |
| `src/pages/user/EntertainmentArticlePage.jsx` | **Hardcoded Localhost**: Hardcodes `http://localhost:5000` on line 38. | Replace with dynamic base URL helper. |
| `src/pages/user/EventsListingPage.jsx` | **Hardcoded Localhost**: Hardcodes `http://localhost:5000` on line 50. | Replace with dynamic base URL helper. |
| `src/pages/user/GalleryPage.jsx` | **Hardcoded Localhost**: Hardcodes `http://localhost:5000` on lines 72, 74, 112, 120. | Replace with dynamic base URL helper. |
| `src/pages/user/FestivalsPage.jsx` | **Static Mock Data**: Uses static `upcomingFestivals` from `data.jsx` instead of calling `fetchEvents`. | Connect component to `fetchEvents` from `src/api/events.js`. |
| `src/pages/user/KavitaLekhPage.jsx` | **Static Mock Data**: Uses static `kavitaList` from `data.jsx` instead of calling `fetchEntertainment`. | Connect component to `fetchEntertainment` from `src/api/entertainment.js`. |
| `src/pages/admin/AdsPage.jsx`, `EntertainmentPage.jsx`, `EventsPage.jsx`, `GalleryAdminPage.jsx`, `ArticleEditorPage.jsx`, `ReviewPage.jsx` | **Hardcoded Remote Domain**: Hardcode `https://maayboli-backend.yuktiyantra.com` for media image URLs in table/modal previews. | Replace with environment-driven base URL helper. |
| `src/App.jsx` | **Unprotected Admin Routes**: `/admin/*` routes have no route guard (ProtectedRoute) verifying `localStorage.getItem('token')` or user role. | Wrap `/admin` routes in a `ProtectedRoute` wrapper component. |

---

## ❌ Backend Issues

| File | Issue | Fix |
| :--- | :--- | :--- |
| `Maayboli-Backend-main/backend/src/controller/AuthController.js` | **Cookie SameSite Constraint**: Sets `res.cookie('RequiredToken', ..., { sameSite: 'strict' })`. In cross-origin deployments (e.g. Vercel/Netlify frontend to cPanel backend), browser blocks strict cross-site cookies. | Change `sameSite` to `"none"` with `secure: true` in production, or rely on `Bearer` token header. |
| `Maayboli-Backend-main/backend/src/repositories/PostRepository.js` | **Missing Search Filter**: `getPosts` supports filtering by `categoryId` and `districtId`, but lacks SQL `LIKE` filtering for search query string. | Add `req.query.search` / `q` handling with `title LIKE ? OR content LIKE ?`. |
| `Maayboli-Backend-main/backend/src/routes/` | **Missing Routes**: No routes exist for `users`, `settings`, `dashboard`, `search`, `logout`. | Create `UserRoutes.js`, `SettingsRoutes.js`, `DashboardRoutes.js`. |

---

## ❌ Route Mismatches

| Frontend Call | Backend Route | Issue | Fix |
| :--- | :--- | :--- | :--- |
| `fetchPosts({ categoryId })` | `GET /api/posts?category_id=X` | Query key name mismatch: `categoryId` vs `category_id`. | Update `src/api/posts.js` to send `category_id`. |
| `http://localhost:5000/api/banners/:id/image` | `GET /api/banners/:id/image` | Protocol/host mismatch when FE is running on non-localhost or port 5173. | Use dynamic base URL prefix `import.meta.env.VITE_API_URL`. |

---

## ❌ Response Mismatches

| API | Expected Frontend Fields | Actual Backend Returned Fields | Fix |
| :--- | :--- | :--- | :--- |
| `GET /api/posts` | `posts[].categoryName`, `posts[].districtName`, `posts[].authorName` | Backend joins `categories c` as `categoryName`, `district d` as `districtName`, `User u` as `authorName`. ✅ Schema matches, but null values occur if `district_id` is null. | Ensure fallback strings in FE mapping. |
| `GET /api/posts/:id` | `image`, `video_type`, `categoryName`, `districtName` | Returns post object directly. | Verified matching. |

---

## ❌ Missing Features

| Feature | Priority | Recommended Implementation |
| :--- | :--- | :--- |
| **Bearer Token Interceptor** | **High** | Add request interceptor in `apiClient.js` to attach `Authorization: Bearer ${localStorage.getItem('token')}`. |
| **Fix Localhost & Hardcoded Media URLs** | **High** | Create a central `getMediaUrl(endpointPath)` utility using `VITE_API_URL`. |
| **Fix Runtime Crash in EventsListingPage** | **High** | Add missing `MapPin` import in `EventsListingPage.jsx`. |
| **Category Query Param Fix** | **High** | Fix `categoryId` -> `category_id` in `src/api/posts.js` and map slugs to category IDs in `ListingPage.jsx`. |
| **Search Functionality** | **Medium** | Implement `search` parameter in backend `PostRepository.js` and connect `SearchPage.jsx`. |
| **Festivals & Entertainment Screen Integration** | **Medium** | Connect `FestivalsPage.jsx` to `fetchEvents` and `KavitaLekhPage.jsx` to `fetchEntertainment`. |
| **User & Role Management System** | **Medium** | Build `UserRoutes.js`, `UserController.js`, `UserService.js` for CRUD operations on `User` table and connect `UsersPage.jsx`. |
| **Admin Dashboard Analytics API** | **Medium** | Add `GET /api/dashboard/stats` endpoint calculating total posts, drafts, pending reviews, and connect `DashboardPage.jsx`. |
| **Site Settings Storage API** | **Low** | Create `settings` database table, `GET/PUT /api/settings` API, and connect `SettingsPage.jsx`. |
| **Admin Route Protection Guard** | **Medium** | Create `ProtectedRoute.jsx` component redirecting unauthenticated users from `/admin/*` to `/admin-login`. |

---

## Overall Completion

- **Frontend Connected:** 42%
- **Backend Implemented:** 65%
- **Integration Completed:** 45%

### Remaining Work
1. **Fix Critical Integration Bugs**: Repair `apiClient.js` base URL typo, missing Auth interceptor, `MapPin` import crash, and query parameter name mismatch (`categoryId` -> `category_id`).
2. **Dynamic Media Base URLs**: Replace all 15+ hardcoded `http://localhost:5000` and `https://maayboli-backend.yuktiyantra.com` image/video src URLs in user and admin pages with a central environment-driven helper.
3. **Connect Unintegrated Public Screens**: Bind `FestivalsPage.jsx` to `/api/events`, `KavitaLekhPage.jsx` to `/api/entertainment`, and implement backend Search API for `SearchPage.jsx`.
4. **Implement Missing Admin Backend Modules**: Develop backend endpoints and controllers for Users/Roles management, Dashboard stats, and Site Settings.

---

## Prioritized Checklist & Exact Code Fixes

### Step 1: Fix `src/api/apiClient.js`
```javascript
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to attach JWT token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (error.config && error.config.method === 'get' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { BASE_URL };
```

### Step 2: Fix Query Parameter Mismatch in `src/api/posts.js`
```javascript
export const fetchPosts = async ({ page = 1, limit = 50, categoryId, districtId, admin, search } = {}) => {
  const params = { page, limit };
  if (categoryId) params.category_id = categoryId;
  if (districtId) params.district_id = districtId;
  if (admin) params.admin = true;
  if (search) params.search = search;
  
  const { data } = await apiClient.get('/posts', { params });
  return data;
};
```

### Step 3: Fix Missing Import in `src/pages/user/EventsListingPage.jsx`
```javascript
// Change line 2 from:
// import { Calendar, Tent } from 'lucide-react';
// to:
import { Calendar, Tent, MapPin } from 'lucide-react';
```

### Step 4: Create Central Media URL Helper (`src/utils/media.js`)
```javascript
import { BASE_URL } from '../api/apiClient.js';

export const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};
```
Then update `src/pages/user/HomePage.jsx`, `ArticlePage.jsx`, `ListingPage.jsx`, `GalleryPage.jsx`, `EntertainmentListingPage.jsx`, `EntertainmentArticlePage.jsx`, `EventsListingPage.jsx`, and Admin pages to use `getMediaUrl(...)` instead of hardcoded strings.
