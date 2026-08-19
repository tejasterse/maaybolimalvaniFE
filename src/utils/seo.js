/**
 * SEO & Structured Data Utility functions for Maayboli Malvani
 */

export const SITE_NAME = "मायबोली मालवणी";
export const SITE_ENGLISH = "Maayboli Malvani";
export const SITE_TAGLINE = "कोकणाचो आवाज, मालवणी अभिमान!";
export const BASE_URL = "https://maaybolimalvani.com";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/header-logo.jpg`;
export const PUBLISHER_LOGO = `${BASE_URL}/logo.png`;

/**
 * Sanitize text by stripping HTML tags and decoding/replacing HTML entities
 */
export function stripHtmlAndEntities(text) {
  if (!text) return '';
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&rdquo;/gi, '"')
    .replace(/&ldquo;/gi, '"')
    .replace(/&ndash;/gi, '-')
    .replace(/&mdash;/gi, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Clean plain text strings (titles, reporter names, etc.) by replacing non-breaking spaces
 */
export function cleanText(text) {
  if (!text) return '';
  return String(text)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate clean readable text snippet from HTML or plain text
 */
export function createExcerpt(text, maxLength = 160) {
  if (!text) return "";
  const plainText = stripHtmlAndEntities(text);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

/**
 * Generate WebSite Schema
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "alternateName": SITE_ENGLISH,
    "url": BASE_URL,
    "description": "सिंधुदुर्ग आणि संपूर्ण कोकणातील ताज्या ब्रेकिंग, स्थानिक, राजकीय, सांस्कृतिक व पर्यटन बातम्या.",
    "inLanguage": "mr",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": SITE_NAME,
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": PUBLISHER_LOGO,
        "width": 600,
        "height": 600
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": SITE_NAME,
    "alternateName": SITE_ENGLISH,
    "url": BASE_URL,
    "logo": PUBLISHER_LOGO,
    "slogan": SITE_TAGLINE,
    "knowsLanguage": ["mr", "mr-IN"],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Sindhudurg" },
      { "@type": "AdministrativeArea", "name": "Konkan" },
      { "@type": "AdministrativeArea", "name": "Maharashtra" }
    ],
    "email": "contact@maaybolimalvani.com"
  };
}

/**
 * Generate NewsArticle Schema for news post detail page
 */
export function generateNewsArticleSchema(post, imageUrl, articleUrl) {
  if (!post) return null;

  const headline = post.seo_title || post.title;
  const description = post.seo_description || createExcerpt(post.content);
  const pubDate = post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString();
  const modDate = post.updatedAt ? new Date(post.updatedAt).toISOString() : pubDate;
  const authorName = post.reporter_name || post.authorName || "मायबोली बातमीदार";

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "headline": headline,
    "description": description,
    "image": [imageUrl || DEFAULT_OG_IMAGE],
    "datePublished": pubDate,
    "dateModified": modDate,
    "author": {
      "@type": "Person",
      "name": authorName,
      "jobTitle": "News Reporter"
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": SITE_NAME,
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": PUBLISHER_LOGO
      }
    },
    "articleSection": post.categoryName || "बातमी",
    "contentLocation": post.districtName ? {
      "@type": "Place",
      "name": `${post.districtName}, Sindhudurg, Maharashtra`
    } : undefined,
    "inLanguage": "mr"
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(crumbs) {
  if (!crumbs || !crumbs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`
    }))
  };
}

/**
 * Generate VideoObject Schema
 */
export function generateVideoObjectSchema(videoTitle, videoUrl, thumbnailUrl, uploadDate) {
  if (!videoTitle || !videoUrl) return null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoTitle,
    "description": videoTitle,
    "thumbnailUrl": [thumbnailUrl || DEFAULT_OG_IMAGE],
    "uploadDate": uploadDate ? new Date(uploadDate).toISOString() : new Date().toISOString(),
    "embedUrl": videoUrl
  };
}
