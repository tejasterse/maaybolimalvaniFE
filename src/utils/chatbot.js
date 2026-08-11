import { fetchPosts } from '../api/posts.js';

export const formatPostDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = String(hours).padStart(2, '0');

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

export const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const generateBotResponse = async (userText) => {
  const now = new Date();
  const todayFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const lowerText = userText.toLowerCase().trim();

  // 1. Fetch real posts directly from database API
  let posts = [];
  try {
    // Query search directly from backend database
    const searchRes = await fetchPosts({ search: userText, limit: 30 });
    const searched = searchRes?.posts || (Array.isArray(searchRes) ? searchRes : []);
    
    // Also fetch full recent posts list from backend database
    const allRes = await fetchPosts({ limit: 100, admin: true });
    const allPosts = allRes?.posts || (Array.isArray(allRes) ? allRes : []);

    // Merge & deduplicate by ID
    const combinedMap = new Map();
    [...searched, ...allPosts].forEach(p => {
      if (p && p.id) combinedMap.set(p.id, p);
    });
    posts = Array.from(combinedMap.values());
  } catch (e) {
    console.error("Database fetch error for chatbot:", e);
  }

  // Filter valid posts
  const validPosts = (posts || []).filter(p => p.status === 'PUBLISHED' || !p.status || p.status === 'DRAFT');

  // 2. Querying TODAY'S news / latest news / dates
  if (
    lowerText.includes('आज') ||
    lowerText.includes('आजच्या') ||
    lowerText.includes('ताज्या') ||
    lowerText.includes('नवीन') ||
    lowerText.includes('तारीख') ||
    lowerText.includes('वेळ') ||
    lowerText.includes('today') ||
    lowerText.includes('latest')
  ) {
    const todayPosts = validPosts.filter(p => {
      if (!p.createdAt) return false;
      return isSameDay(new Date(p.createdAt), now);
    });

    if (todayPosts.length > 0) {
      const newsList = todayPosts.map((p, idx) => {
        const timeStr = formatPostDate(p.createdAt);
        const cleanContent = p.content ? p.content.replace(/<[^>]*>?/gm, '').trim() : '';
        return `${idx + 1}. 📌 *${p.title}*\n   📅 अपलोड तारीख/वेळ: ${timeStr}\n   📍 विभाग: ${p.categoryName || 'सर्वसाधारण'} | तालुका: ${p.districtName || 'सिंधुदुर्ग'}\n   ✍️ लेखक: ${p.authorName || 'संपादक'}${cleanContent ? `\n   📝 मजकूर: ${cleanContent.substring(0, 120)}...` : ''}`;
      }).join('\n\n');

      return {
        text: `आजची तारीख: ${todayFormatted}\n\nडेटाबेसमधून थेट मिळवलेल्या आजच्या मूळ बातम्या:\n\n${newsList}`,
        source: todayPosts[0].title,
        posts: todayPosts
      };
    } else {
      // If no post created today in DB, fetch the latest real database posts
      const recentPosts = [...validPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
      if (recentPosts.length > 0) {
        const newsList = recentPosts.map((p, idx) => {
          const timeStr = formatPostDate(p.createdAt);
          const cleanContent = p.content ? p.content.replace(/<[^>]*>?/gm, '').trim() : '';
          return `${idx + 1}. 📌 *${p.title}*\n   📅 डेटाबेस प्रसिद्धी तारीख/वेळ: ${timeStr}\n   📍 विभाग: ${p.categoryName || '-'} | तालुका: ${p.districtName || '-'}\n   ✍️ लेखक: ${p.authorName || 'संपादक'}${cleanContent ? `\n   📝 मूळ मजकूर: ${cleanContent.substring(0, 100)}...` : ''}`;
        }).join('\n\n');

        return {
          text: `आजची तारीख: ${todayFormatted}\n\nआज (${todayFormatted}) साठी नवीन बातमी अजून अपलोड झालेली नाही. डेटाबेसमधून थेट मिळवलेल्या सर्वात ताज्या मूळ बातम्या:\n\n${newsList}`,
          source: recentPosts[0].title,
          posts: recentPosts
        };
      }
    }
  }

  // 3. Querying Breaking news
  if (lowerText.includes('ब्रेकिंग') || lowerText.includes('breaking')) {
    const breakingPosts = validPosts.filter(p => p.is_breaking === 1 || p.is_breaking === true);
    if (breakingPosts.length > 0) {
      const topBreaking = breakingPosts[0];
      const timeStr = formatPostDate(topBreaking.createdAt);
      const cleanContent = topBreaking.content ? topBreaking.content.replace(/<[^>]*>?/gm, '').trim() : '';
      return {
        text: `🚨 *ब्रेकिंग न्यूज (डेटाबेसमधून थेट)*\n\n📌 *${topBreaking.title}*\n\n📅 अपलोड वेळ/तारीख: ${timeStr}\n📍 विभाग/तालुका: ${topBreaking.categoryName || '-'} / ${topBreaking.districtName || 'सिंधुदुर्ग'}\n✍️ लेखक: ${topBreaking.authorName || 'संपादक'}\n\n📝 *मूळ मजकूर:*\n${cleanContent}`,
        source: topBreaking.title,
        posts: breakingPosts
      };
    }
  }

  // 4. Keyword / Taluka / Category Search in DB
  const keywords = lowerText.split(/\s+/).filter(w => w.length > 1);
  const matchedPosts = validPosts.filter(p => {
    const title = (p.title || '').toLowerCase();
    const content = (p.content || '').toLowerCase();
    const cat = (p.categoryName || '').toLowerCase();
    const dist = (p.districtName || '').toLowerCase();
    const author = (p.authorName || '').toLowerCase();
    return keywords.some(w => title.includes(w) || content.includes(w) || cat.includes(w) || dist.includes(w) || author.includes(w));
  });

  if (matchedPosts.length > 0) {
    const topMatch = matchedPosts[0];
    const timeStr = formatPostDate(topMatch.createdAt);
    const cleanContent = topMatch.content ? topMatch.content.replace(/<[^>]*>?/gm, '').trim() : '';
    return {
      text: `📰 *${topMatch.title}*\n\n📅 प्रसिद्धी तारीख व वेळ: ${timeStr}\n📍 विभाग/तालुका: ${topMatch.categoryName || '-'} / ${topMatch.districtName || '-'}\n✍️ लेखक: ${topMatch.authorName || 'संपादक'}\n\n📝 *मूळ बातमी मजकूर:*\n${cleanContent.substring(0, 300)}${cleanContent.length > 300 ? '...' : ''}`,
      source: topMatch.title,
      posts: matchedPosts
    };
  }

  // 5. Fallback: Return latest real posts from DB
  const latestPosts = [...validPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  if (latestPosts.length > 0) {
    const list = latestPosts.map(p => `• *${p.title}* (अपलोड वेळ: ${formatPostDate(p.createdAt)})`).join('\n');
    return {
      text: `आजची तारीख: ${todayFormatted}\n\nडेटाबेसमधून मिळवलेल्या इतर मूळ बातम्या:\n\n${list}`,
      source: latestPosts[0].title,
      posts: latestPosts
    };
  }

  return {
    text: `आजची तारीख: ${todayFormatted}. सध्या डेटाबेसमध्ये कोणतीही बातमी उपलब्ध नाही.`,
    source: null,
    posts: []
  };
};
