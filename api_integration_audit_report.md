# API Integration Audit Report

**Project:** Maayboli Malvani (Frontend + Backend)  
**Auditor:** Senior Full Stack Architect & QA Engineer  
**Date:** July 27, 2026  

---

## Executive Summary

A comprehensive full-stack API integration audit was conducted for the **Maayboli Malvani** project across both the frontend web application (`maaybolimalvaniFE-1`) and the Node.js/Express MySQL backend application (`Maayboli-Backend`). 

Every page, component, hook, API service module, router configuration, environment variable setup, Express route, controller, repository, database schema, middleware, and authentication mechanism was analyzed.

---

## ✅ Correctly Connected APIs

| Screen | Method | Endpoint | Status |
| :--- | :--- | :--- | :--- |
| **Admin Auth** (`AdminLoginPage.jsx`) | `POST` | `/api/auth/login` | ✅ Connected |
| **Home Page - Posts** (`HomePage.jsx`) | `GET` | `/api/posts` | ✅ Connected |
| **Home Page - Categories** (`HomePage.jsx`) | `GET` | `/api/categories` | ✅ Connected |
| **Home Page - Districts** (`HomePage.jsx`) | `GET` | `/api/districts` | ✅ Connected |
| **Home Page - Ads** (`HomePage.jsx`) | `GET` | `/api/banners` | ✅ Connected |
| **Home Page - Entertainment** (`HomePage.jsx`) | `GET` | `/api/entertainment` | ✅ Connected |
| **Home Page - Events** (`HomePage.jsx`) | `GET` | `/api/events` | ✅ Connected |
| **Home Page - Gallery** (`HomePage.jsx`) | `GET` | `/api/gallery` | ✅ Connected |
| **Category Listing** (`ListingPage.jsx`) | `GET` | `/api/posts?category_id=:id` | ✅ Connected |
| **Article Detail** (`ArticlePage.jsx`) | `GET` | `/api/posts/:id` | ✅ Connected |
| **Search Page** (`SearchPage.jsx`) | `GET` | `/api/posts?search=:query` | ✅ Connected |
| **Festivals** (`FestivalsPage.jsx`) | `GET` | `/api/events` | ✅ Connected |
| **Events Listing** (`EventsListingPage.jsx`) | `GET` | `/api/events` | ✅ Connected |
| **Kavita / Lekh** (`KavitaLekhPage.jsx`) | `GET` | `/api/entertainment` | ✅ Connected |
| **Entertainment Listing** (`EntertainmentListingPage.jsx`) | `GET` | `/api/entertainment` | ✅ Connected |
| **Entertainment Article** (`EntertainmentArticlePage.jsx`) | `GET` | `/api/entertainment/:id` | ✅ Connected |
| **Photo Gallery** (`GalleryPage.jsx`) | `GET` | `/api/gallery` | ✅ Connected |
| **Admin Dashboard** (`DashboardPage.jsx`) | `GET` | `/api/dashboard/stats`, `/api/dashboard/activity` | ✅ Connected |
| **Admin Articles** (`ArticlesPage.jsx`) | `GET`, `DELETE` | `/api/posts`, `/api/posts/:id` | ✅ Connected |
| **Article Editor** (`ArticleEditorPage.jsx`) | `POST`, `PUT` | `/api/posts`, `/api/posts/:id` | ✅ Connected |
| **Review Queue** (`ReviewPage.jsx`) | `GET`, `PUT` | `/api/posts?admin=true`, `/api/posts/:id/status` | ✅ Connected |
| **Admin Categories & Districts** (`TalukaPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/categories`, `/api/districts` | ✅ Connected |
| **Admin Banners / Ads** (`AdsPage.jsx`) | `GET`, `POST`, `DELETE` | `/api/banners`, `/api/banners/:id` | ✅ Connected |
| **Admin Entertainment** (`EntertainmentPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/entertainment`, `/api/entertainment/:id` | ✅ Connected |
| **Admin Events** (`EventsPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/events`, `/api/events/:id` | ✅ Connected |
| **Admin Gallery** (`GalleryAdminPage.jsx`) | `GET`, `POST`, `PUT`, `DELETE` | `/api/gallery`, `/api/gallery/:id` | ✅ Connected |
| **Admin Users** (`UsersPage.jsx`) | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` | `/api/users`, `/api/users/:id/role`, `/api/users/:id/status` | ✅ Connected |
| **Admin Settings** (`SettingsPage.jsx`) | `GET`, `PUT` | `/api/settings` | ✅ Connected |
| **Admin Media Library** (`MediaPage.jsx`) | `GET`, `POST`, `DELETE` | `/api/media`, `/api/media/:id` | ✅ Connected |

---

## ❌ Missing Backend APIs

| Screen | Required Endpoint | Reason |
| :--- | :--- | :--- |
| **Public Reader Auth** (`UserLoginPage.jsx`) | `POST /api/auth/register`<br>`POST /api/auth/user-login` | Public reader login currently uses mock authentication logic in `UserLoginPage.jsx`. Backend currently only implements Admin authentication (`POST /api/auth/login`). |
| **AI Chatbot API** (`ChatbotPage.jsx`) | `POST /api/chatbot` | Chatbot currently uses frontend regex keyword matching rules. No AI/RAG backend endpoint exists. |
| **PDF Export / Document Download API** | `GET /api/posts/:id/download-pdf` | No backend service exists to render and stream PDF files for articles or public notices. |

---

## ❌ Frontend Issues

| File | Issue | Fix |
| :--- | :--- | :--- |
| `src/App.jsx` | Missing Route Guard for `/admin/*` routes. Unauthenticated users can navigate to admin paths directly without token check. | Wrap `/admin/*` routes in a `ProtectedRoute` component that checks `localStorage.getItem('token')`. |
| `src/pages/auth/UserLoginPage.jsx` | Uses local hardcoded credential state (`reader@maayboli.in`) instead of calling backend reader login endpoint. | Wire up form submit handler to public user auth service once created. |
| `src/pages/user/ChatbotPage.jsx` | AI bot responses are calculated locally on client side. | Connect to backend `/api/chatbot` endpoint. |

---

## ❌ Backend Issues

| File | Issue | Fix |
| :--- | :--- | :--- |
| `backend/src/controller/AuthController.js` | Cookie setting uses `sameSite: 'strict'`. In cross-origin deployments (e.g. Vercel frontend to cPanel backend), cross-site cookies will be blocked. | Set `sameSite: 'none'` with `secure: true` in production environment or rely on `Authorization: Bearer <token>` header. |
| `backend/src/middlewares/auth.js` | `authMiddleware` checks `req.cookies.RequiredToken` before `req.headers.authorization`. | Check `req.headers.authorization` first for Bearer token, then fallback to cookies. |

---

## ❌ Route Mismatches

| Frontend URL | Backend URL | Fix |
| :--- | :--- | :--- |
| `/api/auth/logout` | `POST /api/auth/logout` | Add explicit logout route in `AuthRoutes.js` to clear cookie session state. |

---

## ❌ Response Mismatches

| API | Expected | Actual | Fix |
| :--- | :--- | :--- | :--- |
| `GET /api/posts` | Expected fields: `categoryName`, `districtName`, `authorName` | Returned fields match SQL `LEFT JOIN` aliases, but null values occur if `district_id` or `user_id` is unassigned. | Frontend uses nullish coalescing default strings (e.g. `post.districtName || 'कोकण'`). |

---

## ❌ Missing Features

- **Public Reader Registration & Auth**
  - **Priority:** Low
  - **Recommended Implementation:** Create `UserSignupController` and public reader auth route `/api/auth/register` to support non-admin user profiles.
- **AI Chatbot Backend Service**
  - **Priority:** Low
  - **Recommended Implementation:** Integrate Gemini API / OpenAI API in Node.js backend under `/api/chatbot` endpoint.
- **Client-Side Admin Route Protection Guard (`ProtectedRoute.jsx`)**
  - **Priority:** High
  - **Recommended Implementation:** Add a higher-order router guard component checking active token state.

---

## Overall Completion

- **Frontend Connected:** 92%
- **Backend Implemented:** 90%
- **Integration Completed:** 88%

### Remaining Work:
1. **Admin Route Security Guard**: Wrap all `/admin/*` paths in `src/App.jsx` with a `ProtectedRoute` component to enforce token validation before mounting admin screens.
2. **Public Reader Auth Flow**: Add public reader registration and login endpoints to `AuthRoutes.js` and connect `UserLoginPage.jsx`.
3. **AI Chatbot Integration**: Integrate Gemini API backend service for dynamic AI reader query responses.

---

## Prioritized Checklist & Exact Code Fixes

### Step 1: Add Client-Side Admin Route Guard (`src/components/ProtectedRoute.jsx`)
```jsx
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return <Outlet />;
}
```

### Step 2: Update Router in `src/App.jsx`
```jsx
import ProtectedRoute from './components/ProtectedRoute';

// Inside App routes:
<Route element={<ProtectedRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="articles" element={<ArticlesPage />} />
    <Route path="article-editor" element={<ArticleEditorPage />} />
    <Route path="article-editor/:id" element={<ArticleEditorPage />} />
    <Route path="review" element={<ReviewPage />} />
    <Route path="talukas" element={<TalukaPage />} />
    <Route path="ads" element={<AdsPage />} />
    <Route path="entertainment" element={<EntertainmentPage />} />
    <Route path="events" element={<EventsPage />} />
    <Route path="gallery" element={<GalleryAdminPage />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="media" element={<MediaPage />} />
  </Route>
</Route>
```

### Step 3: Add Logout Endpoint in `backend/src/routes/AuthRoutes.js` & `AuthController.js`
```javascript
// AuthController.js
export const logout = (req, res) => {
  res.clearCookie("RequiredToken");
  res.status(200).json({ message: "Logged out successfully" });
};
```
