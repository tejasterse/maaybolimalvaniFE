import { useEffect } from 'react';
import { BASE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from '../../utils/seo.js';

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  jsonLd = [],
  noindex = false
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `मायबोली मालवणी | सिंधुदुर्ग आणि कोकणातील ताज्या बातम्या`;
  const metaDescription = description || "मायबोली मालवणी - सावंतवाडी, मालवण, कणकवली, कुडाळ, वेंगुर्ला, देवगड, वैभववाडी, दोडामार्ग आणि संपूर्ण कोकणातील ताज्या बातम्या व घडामोडी.";
  const currentCanonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`) : BASE_URL;
  const image = ogImage ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`) : DEFAULT_OG_IMAGE;
  const robots = noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper function to update or create meta element
    const setMetaTag = (selector, attrName, attrValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue || '');
    };

    // Helper to set link rel="canonical"
    const setCanonical = (href) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

    // 3. Canonical Link
    setCanonical(currentCanonical);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'mr_IN');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title || SITE_NAME);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentCanonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', image);

    if (ogType === 'article') {
      if (publishedTime) setMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
      if (modifiedTime) setMetaTag('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);
      if (author) setMetaTag('meta[property="article:author"]', 'property', 'article:author', author);
      if (section) setMetaTag('meta[property="article:section"]', 'property', 'article:section', section);
    }

    // 5. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title || SITE_NAME);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    // 6. JSON-LD Structured Data
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach((s) => s.remove());

    const schemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd].filter(Boolean);
    schemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [fullTitle, metaDescription, currentCanonical, image, ogType, publishedTime, modifiedTime, author, section, robots, jsonLd]);

  return null;
}
