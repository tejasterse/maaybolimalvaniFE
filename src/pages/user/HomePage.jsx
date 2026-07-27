import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { X, Landmark, Palmtree, Fish, Film, Trophy, Scale, Train, Bus, Car, Bot, ArrowRight, Calendar, MapPin, Play, Newspaper } from 'lucide-react';
import { fetchPosts } from '../../api/posts.js';
import { fetchCategories } from '../../api/categories.js';
import { fetchDistricts } from '../../api/districts.js';
import { fetchAds } from '../../api/ads.js';
import { fetchEntertainment } from '../../api/entertainment.js';
import { fetchEvents } from '../../api/events.js';
import { fetchGallery } from '../../api/gallery.js';
import { getMediaUrl } from '../../utils/media.js';

function AdCarousel({ ads }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [lightboxAd, setLightboxAd] = useState(null);

  useEffect(() => {
    if (!ads || ads.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [ads]);

  if (!ads || ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <>
      <div className="mb-10 w-full rounded-xl overflow-hidden shadow-sm transition-opacity hover:opacity-95 bg-white flex justify-center items-center border border-line">
        {currentAd.link_url ? (
          <a href={currentAd.link_url} target="_blank" rel="noreferrer" className="w-full block text-center">
            <img 
              src={getMediaUrl(`/banners/${currentAd.id}/image`)} 
              alt="Promotion" 
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.jpg'; }}
              className="w-full h-auto max-h-[250px] md:max-h-[350px] object-contain mx-auto" 
            />
          </a>
        ) : (
          <div className="w-full block text-center cursor-pointer" onClick={() => setLightboxAd(currentAd)}>
            <img 
              src={getMediaUrl(`/banners/${currentAd.id}/image`)} 
              alt="Promotion" 
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.jpg'; }}
              className="w-full h-auto max-h-[250px] md:max-h-[350px] object-contain mx-auto block" 
            />
          </div>
        )}
      </div>

      {lightboxAd && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(14,42,71,.92)' }}
          onClick={() => setLightboxAd(null)}
        >
          <span
            className="absolute top-6 right-8 text-white cursor-pointer font-poppins"
            onClick={() => setLightboxAd(null)}
          >
            <X size={24} />
          </span>
          <img
            src={getMediaUrl(`/banners/${lightboxAd.id}/image`)}
            alt="Advertisement"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.jpg'; }}
            className="max-w-[800px] max-h-[80vh] rounded-lg"
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,.4)' }}
          />
        </div>
      )}
    </>
  );
}

const talukaHighlights = [
  { name: 'मालवण', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop', headline: 'किल्ल्यावर विक्रमी गर्दी' },
  { name: 'कणकवली', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop', headline: 'निवडणूक घोषणा' },
  { name: 'देवगड', img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300&h=200&fit=crop', headline: 'आंबा हंगाम चर्चा' },
  { name: 'सावंतवाडी', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=200&fit=crop', headline: 'खेळणी उद्योगाला प्रोत्साहन' },
  { name: 'वेंगुर्ला', img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=300&h=200&fit=crop', headline: 'किनारपट्टी विकास' },
  { name: 'कुडाळ', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop', headline: 'गणेशोत्सव तयारी' },
];

const categories = [
  { name: 'राजकारण', icon: <Landmark size={28} />, color: 'var(--navy)' },
  { name: 'पर्यटन', icon: <Palmtree size={28} />, color: 'var(--teal)' },
  { name: 'मासेमारी-शेती', icon: <Fish size={28} />, color: '#2e7d4f' },
  { name: 'संस्कृती', icon: <Film size={28} />, color: 'var(--maroon)' },
  { name: 'क्रीडा', icon: <Trophy size={28} />, color: 'var(--amber)' },
  { name: 'गुन्हे', icon: <Scale size={28} />, color: '#6d4c41' },
];

const timetables = [
  { id: 1, type: 'रेल्वे', name: 'कोकण कन्या एक्सप्रेस', time: 'रात्री ८:००', route: 'मुंबई ते मडगाव', icon: <Train size={24} /> },
  { id: 2, type: 'एसटी', name: 'मालवण - पुणे', time: 'संध्याकाळी ५:३०', route: 'मालवण - कोल्हापूर - पुणे', icon: <Bus size={24} /> },
  { id: 3, type: 'खाजगी', name: 'पावलो ट्रॅव्हल्स', time: 'रात्री ९:१५', route: 'सावंतवाडी ते मुंबई', icon: <Car size={24} /> }
];

const advertisementImg = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1180&h=200&fit=crop';

const calendarEvent = { day: '१९', month: 'जुलै', year: '२०२६', tithi: 'आषाढ शुक्ल पक्ष, एकादशी' };
const cricketScore = { team1: 'भारत', team2: 'ऑस्ट्रेलिया', score: 'IND 245/4 (45 ov)', status: 'भारत फलंदाजी करत आहे' };


export default function HomePage({ onNavigate }) {
  const routerNavigate = useNavigate();
  const navigate = (path) => {
    if (onNavigate) {
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      if (cleanPath.startsWith('article/')) {
        const id = cleanPath.split('/')[1];
        onNavigate('article', id);
      } else if (cleanPath.startsWith('entertainment/')) {
        const id = cleanPath.split('/')[1];
        onNavigate('entertainment-article', id);
      } else if (['listing', 'rajkaran', 'paryatan', 'maasemari', 'sanskriti', 'krida', 'gunhe', 'utsav', 'kavita-lekh', 'kavita', 'search', 'gallery', 'chatbot', 'entertainment', 'events', 'about-us', 'terms', 'privacy'].includes(cleanPath)) {
        onNavigate(cleanPath === 'kavita' ? 'kavita-lekh' : cleanPath);
      } else {
        onNavigate('home');
      }
    } else {
      routerNavigate(path);
    }
  };
  const [activeTab, setActiveTab] = useState('सर्व');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  };

  const { data = {}, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  });
  const posts = data.posts || [];

  const { data: dbCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories()
  });

  const { data: dbDistricts = [] } = useQuery({
    queryKey: ['districts'],
    queryFn: () => fetchDistricts()
  });

  const { data: ads = [] } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds
  });

  const { data: dbEntertainment = [] } = useQuery({
    queryKey: ['entertainment'],
    queryFn: fetchEntertainment
  });

  const { data: dbEvents = [] } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const { data: dbGallery = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery
  });

  const dynamicTalukaHighlights = dbDistricts.map(district => {
    const latestPost = posts.find(p => p.districtName === district.name);
    return {
      name: district.name,
      img: latestPost
        ? latestPost.image ? getMediaUrl(latestPost.image) : getMediaUrl(`/posts/${latestPost.id}/image`)
        : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=200&h=140&fit=crop',
      headline: latestPost ? latestPost.title : 'सध्या बातमी उपलब्ध नाही'
    };
  });

  const filteredLatest = activeTab === 'सर्व'
    ? posts
    : posts.filter((a) => a.categoryName === activeTab);

  // Dynamic breaking news from database
  const breakingNewsData = posts.filter(p => p.is_breaking === 1 || p.is_breaking === true);

  // Rotate hero article if multiple breaking news exist
  useEffect(() => {
    if (breakingNewsData.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % breakingNewsData.length);
    }, 4000); // 4 seconds rotation
    return () => clearInterval(intervalId);
  }, [breakingNewsData.length]);

  const activeHero = breakingNewsData.length > 0
    ? breakingNewsData[currentHeroIndex]
    : (posts.length > 0 ? posts[0] : null);

  return (
    <div>
      {/* 1. Breaking news ticker */}
      {breakingNewsData.length > 0 && (
        <div
          className="overflow-hidden py-2 px-4"
          style={{ background: 'var(--maroon)', borderBottom: '2px solid var(--gold)' }}
        >
          <div className="flex items-center gap-4">
            <span
              className="flex-shrink-0 font-poppins font-bold text-[10px] uppercase tracking-[.12em] text-navy px-3 py-1 rounded-full"
              style={{ background: 'var(--gold)' }}
            >
              ताज्या बातम्या
            </span>
            <div className="overflow-hidden flex-1">
              <div className="ticker-inner font-poppins text-[12.5px] text-[#fbe8c9] whitespace-nowrap flex items-center">
                {breakingNewsData.map((b, index) => (
                  <span key={b.id} className=" items-center">
                    <span
                      onClick={() => navigate(`/article/${b.id}`)}
                      className="cursor-pointer hover:underline transition-all"
                    >
                      {b.title}
                    </span>
                    {index < breakingNewsData.length - 1 && <span className="mx-4" style={{ color: 'var(--gold)' }}>◆</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1180px] mx-auto px-6 pb-12">

        {breakingNewsData.length > 0 ? (
          <div className="py-6">
            <div className="relative overflow-hidden rounded-xl h-[420px] md:h-[340px]" style={{ boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}>
              <div
                className="flex flex-col transition-transform duration-700 ease-in-out h-full w-full"
                style={{ transform: `translateY(-${currentHeroIndex * 100}%)` }}
              >
                {breakingNewsData.map((hero) => (
                  <div
                    key={hero.id}
                    className="hero-inner flex flex-col md:flex-row gap-0 md:gap-6 bg-white h-[420px] md:h-[340px] flex-shrink-0 cursor-pointer w-full group overflow-hidden"
                    onClick={() => navigate(`/article/${hero.id}`)}
                  >
                    <img
                      src={hero.image ? getMediaUrl(hero.image) : hero.image_type ? getMediaUrl(`/posts/${hero.id}/image`) : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=800&h=500&fit=crop'}
                      alt={hero.title}
                      className="w-full md:w-[55%] h-[180px] md:h-[340px] object-cover flex-shrink-0 block"
                    />
                    <div className="flex flex-col justify-center px-4 md:pr-8 py-4 md:py-8 w-full md:w-[45%] h-[240px] md:h-full">
                      <span
                        className="flag-tag inline-block font-poppins font-bold text-[10.5px] text-white px-4 py-1 mb-4 self-start"
                        style={{ background: 'var(--maroon)' }}
                      >
                        ब्रेकिंग न्यूज
                      </span>
                      <h2 className="font-tiro text-[20px] md:text-[28px] leading-[1.35] text-ink mb-2 md:mb-4 group-hover:text-teal transition-colors line-clamp-2 md:line-clamp-none">
                        {hero.title}
                      </h2>
                      {/* <p className="font-mukta text-[14px] md:text-[16px] leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-3" style={{ color: '#5a4c3a' }}>
                        {stripHtml(hero.content)}
                      </p> */}
                      <div className="font-poppins text-[12px] text-grey">
                        {hero.districtName || 'सिंधुदुर्ग'} · {new Date(hero.createdAt).toLocaleDateString('mr-IN')}
                      </div>
                      <button
                        className="mt-5 self-start font-poppins font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors hover:bg-opacity-90"
                        style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/article/${hero.id}`); }}
                      >
                        पूर्ण बातमी वाचा <ArrowRight size={14} className="inline ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots indicator for rotation */}
            {breakingNewsData.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {breakingNewsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentHeroIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${currentHeroIndex === i ? 'bg-maroon-deep' : 'bg-line'}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeHero ? (
          <div className="py-6">
            <div
              className="hero-inner flex flex-col md:flex-row gap-0 md:gap-6 bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:-translate-y-1 h-[420px] md:h-auto"
              onClick={() => navigate(`/article/${activeHero.id}`)}
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}
            >
              <img
                src={activeHero.image ? getMediaUrl(activeHero.image) : activeHero.image_type ? getMediaUrl(`/posts/${activeHero.id}/image`) : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=800&h=500&fit=crop'}
                alt={activeHero.title}
                className="w-full md:w-[55%] h-[180px] md:h-[340px] object-cover flex-shrink-0 block"
              />
              <div className="flex flex-col justify-center px-4 md:pr-8 py-4 md:py-8 w-full md:w-[45%] h-[240px] md:h-full">
                <span
                  className="flag-tag inline-block font-poppins font-bold text-[10.5px] text-white px-4 py-1 mb-4 self-start"
                  style={{ background: 'var(--maroon)' }}
                >
                  {activeHero.categoryName || 'ताज्या बातम्या'}
                </span>
                <h2 className="font-tiro text-[20px] md:text-[28px] leading-[1.35] text-ink mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
                  {activeHero.title}
                </h2>
                <p className="font-mukta text-[14px] md:text-[16px] leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-3" style={{ color: '#5a4c3a' }}>
                  {stripHtml(activeHero.content)}
                </p>
                <div className="font-poppins text-[12px] text-grey">
                  {activeHero.districtName || 'सिंधुदुर्ग'} · {new Date(activeHero.createdAt).toLocaleDateString('mr-IN')}
                </div>
                <button
                  className="mt-5 self-start font-poppins font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors hover:bg-opacity-90"
                  style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/article/${activeHero.id}`); }}
                >
                  पूर्ण बातमी वाचा <ArrowRight size={14} className="inline ml-1" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6"></div>
        )}

        {/* 2. Taluka Highlights */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">तालुका बातम्या</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {dynamicTalukaHighlights.map((t) => (
              <div
                key={t.name}
                onClick={() => navigate('/listing', { state: { taluka: t.name } })}
                className="rounded-xl p-4 cursor-pointer transition-transform hover:-translate-y-1 shadow-sm bg-white flex flex-col justify-center items-center text-center h-[110px] border-b-4 border-teal"
                style={{ borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}
              >
                <div className="font-tiro font-bold text-[18px] text-maroon-deep mb-1">{t.name}</div>
                <div className="font-mukta text-[11px] leading-snug text-grey line-clamp-2">{t.headline}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Advertisement 1 */}
        <AdCarousel ads={ads} />

        {/* 3. Latest Articles - includes other district & national and other news */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">ताज्या बातम्या</h2>
            <button
              onClick={() => navigate('/listing')}
              className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
            >
              सर्व बघा <ArrowRight size={14} className="inline ml-1" />
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {['सर्व', ...dbCategories.map(c => c.name)].map((t) => (
              <span
                key={t}
                onClick={() => setActiveTab(t)}
                className="flex-shrink-0 font-poppins text-[12.5px] px-4 py-1.5 rounded-full cursor-pointer border-[1.5px] nav-transition whitespace-nowrap"
                style={activeTab === t
                  ? { background: 'var(--maroon)', color: '#fbe8c9', borderColor: 'var(--maroon)' }
                  : { background: '#fff', color: 'var(--teal)', borderColor: 'var(--line)' }
                }
              >
                {t}
              </span>
            ))}
          </div>

          <div className="home-latest-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {isLoading ? (
              <div className="col-span-3 text-center py-10 font-poppins text-grey">बातम्या लोड होत आहेत...</div>
            ) : filteredLatest.length > 0 ? (
              filteredLatest.slice(0, 8).map((a) => (
                <div
                  key={a.id}
                  onClick={() => navigate(`/article/${a.id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1"
                  style={{ border: '1px solid var(--line)' }}
                >
                  <img src={a.image ? getMediaUrl(a.image) : a.image_type ? getMediaUrl(`/posts/${a.id}/image`) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'} alt={a.title} className="w-full h-[160px] object-cover block" />
                  <div className="p-4">
                    <span className="font-poppins text-[10.5px] text-teal font-bold uppercase tracking-wide">{a.categoryName || 'बातमी'}</span>
                    <h3 className="font-tiro text-[17px] leading-snug text-ink mt-1.5 mb-2 line-clamp-2">{a.title}</h3>
                    <div className="font-poppins text-[11px] text-grey">{a.districtName || 'सिंधुदुर्ग'} · {new Date(a.createdAt).toLocaleDateString('mr-IN')}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-white rounded-xl p-8 text-center shadow-sm" style={{ border: '1px solid var(--line)' }}>
                <span className="flex justify-center mb-2"><Newspaper size={32} className="text-grey" /></span>
                <div className="font-tiro text-[16px] text-ink font-semibold">या विभागात सध्या कोणतीही बातमी उपलब्ध नाही.</div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Category Cards */}
        <div className="mb-10">
          <h2 className="font-tiro text-[24px] text-maroon-deep mb-4">विभागानुसार बातम्या</h2>
          <div className="home-cat-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => {
              const categoryMapping = {
                'राजकारण': 'rajkaran',
                'पर्यटन': 'paryatan',
                'मासेमारी-शेती': 'maasemari',
                'संस्कृती': 'sanskriti',
                'क्रीडा': 'krida',
                'गुन्हे': 'gunhe',
              };
              const targetKey = categoryMapping[cat.name] || 'listing';
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate(`/${targetKey}`)}
                  className="bg-white rounded-xl p-4 text-center shadow-sm transition-transform hover:-translate-y-1"
                  style={{ border: '1.5px solid var(--line)' }}
                >
                  <div className="flex justify-center mb-2">{cat.icon}</div>
                  <div className="font-tiro text-[15px] text-ink font-semibold">{cat.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Poems, Writings, Other Entertainment (With Images & Icons) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">कविता, लेख आणि मनोरंजन</h2>
            <button
              onClick={() => navigate('/entertainment')}
              className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
            >
              सर्व साहित्य बघा <ArrowRight size={14} className="inline ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dbEntertainment.length > 0 ? dbEntertainment.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/entertainment/${item.id}`)}
                className="bg-cream rounded-xl overflow-hidden shadow-sm cursor-pointer flex transition-transform hover:-translate-y-1"
                style={{ border: '1.5px solid var(--line)' }}
              >
                <img src={item.image_type ? getMediaUrl(`/entertainment/${item.id}/image`) : 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=200&fit=crop'} alt={item.title} className="w-[100px] h-[100px] object-cover block flex-shrink-0" />
                <div className="p-3 flex flex-col justify-center w-full overflow-hidden">
                  <span className="font-poppins text-[10px] text-amber font-bold uppercase tracking-wide">{item.type}</span>
                  <h3 className="font-tiro text-[15px] leading-tight text-ink mt-1 mb-1 truncate">{item.title}</h3>
                  <div className="font-poppins text-[11px] text-grey truncate">लेखक: {item.author || '-'}</div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-5 font-poppins text-grey text-sm border border-dashed border-line rounded-xl">कोणतीही माहिती उपलब्ध नाही</div>
            )}
          </div>
        </div>

        {/* Dynamic Advertisement 2 */}
        <AdCarousel ads={ads} />

        {/* 6. Gavatle San Utsav, Programs */}
        {dbEvents.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-tiro text-[24px] text-maroon-deep">गावचे सण, उत्सव आणि कार्यक्रम</h2>
              <button
                onClick={() => navigate('/events')}
                className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
              >
                अधिक वाचा <ArrowRight size={14} className="inline ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {dbEvents.slice(0, 3).map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => navigate('/events')}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer transition-transform hover:-translate-y-1 border-l-4"
                  style={{ borderColor: 'var(--amber)', borderTop: '1px solid var(--line)', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
                >
                  <div className="flex items-center gap-4">
                    <img src={prog.image_type ? getMediaUrl(`/events/${prog.id}/image`) : 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop'} alt={prog.title} className="w-[60px] h-[60px] rounded-full object-cover" />
                    <div>
                      <h3 className="font-tiro text-[16px] text-navy mb-1 line-clamp-1">{prog.title}</h3>
                      <div className="font-poppins text-[12px] text-grey flex items-center gap-2">
                        <span className="flex items-center gap-1"><Calendar size={13} /> {prog.event_date}</span>
                        <span className="flex items-center gap-1 truncate"><MapPin size={13} /> {prog.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Railway, ST Bus, Private Vehical Timetable */}
        <div className="mb-10">
          <h2 className="font-tiro text-[24px] text-maroon-deep mb-4">वेळापत्रक (रेल्वे, एसटी, खाजगी वाहने)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {timetables.map((t) => (
              <div key={t.id} className="bg-white rounded-xl p-4 shadow-sm border transition-transform hover:-translate-y-1 cursor-pointer" style={{ borderColor: 'var(--line)' }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-cream p-2 rounded-lg text-teal flex items-center justify-center">{t.icon}</div>
                  <span className="font-poppins text-[11px] font-bold text-teal bg-teal bg-opacity-10 px-2 py-1 rounded-full">{t.type}</span>
                </div>
                <h3 className="font-tiro text-[18px] text-ink mb-1">{t.name}</h3>
                <div className="font-poppins text-[12px] text-grey mb-2">{t.route}</div>
                <div className="font-poppins text-[14px] font-bold text-maroon">वेळ: {t.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Calender, Cricket Score */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Calendar Widget */}
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-5 border cursor-pointer transition-transform hover:-translate-y-1" style={{ borderColor: 'var(--line)' }}>
            <div className="flex flex-col items-center justify-center bg-maroon text-white rounded-xl w-[80px] h-[80px] flex-shrink-0">
              <span className="font-poppins text-[28px] font-bold leading-none">{calendarEvent.day}</span>
              <span className="font-mukta text-[14px]">{calendarEvent.month}</span>
            </div>
            <div>
              <h3 className="font-tiro text-[20px] text-navy mb-1">आजची तिथी</h3>
              <div className="font-mukta text-[15px] text-grey">{calendarEvent.tithi}</div>
              <div className="font-poppins text-[12px] text-amber font-semibold mt-1">{calendarEvent.year}</div>
            </div>
          </div>

          {/* Cricket Score Widget */}
          <div className="bg-white rounded-xl p-5 shadow-sm border relative overflow-hidden cursor-pointer transition-transform hover:-translate-y-1" style={{ borderColor: 'var(--line)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-5 rounded-bl-full pointer-events-none"></div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-poppins text-[12px] font-bold text-red-600 uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                Live Score
              </span>
              <Trophy size={20} className="text-teal" />
            </div>
            <h3 className="font-poppins text-[18px] font-bold text-navy mb-1">
              {cricketScore.team1} vs {cricketScore.team2}
            </h3>
            <div className="font-poppins text-[22px] font-bold text-teal mb-1">{cricketScore.score}</div>
            <div className="font-mukta text-[14px] text-grey">{cricketScore.status}</div>
          </div>
        </div>

        {/* 10. Image, Photography Section */}
        {dbGallery.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-tiro text-[24px] text-maroon-deep">छायाचित्रे / गॅलरी</h2>
              <button
                onClick={() => navigate('/gallery')}
                className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
              >
                सर्व गॅलरी पहा <ArrowRight size={14} className="inline ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {dbGallery.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/gallery')}
                  className="rounded-xl overflow-hidden relative cursor-pointer group shadow-sm bg-black"
                >
                  {item.is_video === 1 ? (
                    <video src={getMediaUrl(`/gallery/${item.id}/media`)} className="w-full h-[120px] object-cover opacity-80" muted />
                  ) : (
                    <img src={getMediaUrl(`/gallery/${item.id}/media`)} alt={item.title} className="w-full h-[120px] object-cover transition-transform duration-300 group-hover:scale-110" />
                  )}
                  {item.is_video === 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-[10px] px-2 py-0.5 rounded flex items-center justify-center">
                      <Play size={8} fill="currentColor" />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(0deg, rgba(0,0,0,.7) 0%, transparent 60%)' }}
                  >
                    <div className="font-mukta font-medium text-[12px] text-white text-center line-clamp-2">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chatbot CTA banner */}
        <div
          className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(120deg, var(--navy) 0%, var(--teal) 100%)' }}
        >
          <div>
            <div className="font-poppins text-[12px] font-bold uppercase tracking-[.1em] text-gold-light mb-2">
              AI-powered · मायबोली मालवणी
            </div>
            <h2 className="font-tiro text-[26px] text-white mb-2">
              तुमच्या भागातल्या बातम्यांबद्दल विचारा
            </h2>
            <p className="font-poppins text-[13px]" style={{ color: '#c9d6e2' }}>
              AI बॉट फक्त प्रकाशित बातम्यांवर आधारित उत्तर देतो — नेहमी बातमीच्या लिंकसह.
            </p>
          </div>
          <button
            onClick={() => navigate('/chatbot')}
            className="flex-shrink-0 font-poppins font-bold text-[14px] px-7 py-4 rounded-xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
          >
            <Bot size={20} />
            AI ला विचारा
          </button>
        </div>

      </div>
    </div>
  );
}
