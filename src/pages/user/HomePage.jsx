import { useState } from 'react';

const breakingNews = [
  'सिंधुदुर्ग किल्ल्यावर आज ३,००० पर्यटकांची विक्रमी गर्दी',
  'कणकवलीत उद्या वीजपुरवठा खंडित राहणार — महावितरण',
  'मालवण बंदरात नवीन मासळी लिलाव केंद्र सुरू',
  'देवगड आंबा हंगाम यंदा लवकर संपणार — बागायतदार',
  'वेंगुर्ला किनाऱ्यावर नवीन वॉटर-स्पोर्ट्स केंद्र कार्यान्वित',
];

const handleImageError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80';
};

const heroArticle = {
  title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी, स्थानिक व्यावसायिकांना दिलासा',
  tag: 'ब्रेकिंग न्यूज',
  meta: 'मालवण · सारिका पवार · १५ मिनिटांपूर्वी',
  excerpt: 'आज सकाळपासून सिंधुदुर्ग किल्ल्यावर पर्यटकांची मोठी गर्दी दिसान इली. सुट्टीच्या दिवसामुळे राज्याच्या विविध भागांतून तसेच गोव्यातून पर्यटक मोठ्या संख्येने आले होते…',
  img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
};

const talukaHighlights = [
  { name: 'मालवण', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop', headline: 'किल्ल्यावर विक्रमी गर्दी' },
  { name: 'कणकवली', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop', headline: 'निवडणूक घोषणा' },
  { name: 'देवगड', img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300&h=200&fit=crop', headline: 'आंबा हंगाम चर्चा' },
  { name: 'सावंतवाडी', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=200&fit=crop', headline: 'खेळणी उद्योगाला प्रोत्साहन' },
  { name: 'वेंगुर्ला', img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=300&h=200&fit=crop', headline: 'किनारपट्टी विकास' },
  { name: 'कुडाळ', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop', headline: 'गणेशोत्सव तयारी' },
];

const categories = [
  { name: 'राजकारण', icon: '🏛️', count: '५६', color: 'var(--navy)' },
  { name: 'पर्यटन', icon: '🏖️', count: '२९', color: 'var(--teal)' },
  { name: 'मासेमारी-शेती', icon: '🐟', count: '३८', color: '#2e7d4f' },
  { name: 'संस्कृती', icon: '🎭', count: '४१', color: 'var(--maroon)' },
  { name: 'क्रीडा', icon: '⚽', count: '१७', color: 'var(--amber)' },
  { name: 'गुन्हे', icon: '⚖️', count: '१२', color: '#6d4c41' },
];

const latestArticles = [
  {
    id: 1,
    title: 'काजू प्रक्रिया उद्योगासाठी नवीन योजना जाहीर',
    tag: 'मासेमारी-शेती',
    meta: 'वैभववाडी · १ तासापूर्वी',
    img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'ग्रामपंचायत निवडणुकीची घोषणा, उमेदवारी अर्ज सुरू',
    tag: 'राजकारण',
    meta: 'कणकवली · ३ तासांपूर्वी',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'देवगडमध्ये दशावतार महोत्सवाची तयारी सुरू',
    tag: 'संस्कृती',
    meta: 'देवगड · ५ तासांपूर्वी',
    img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'वेंगुर्ला किनाऱ्यावर सांस्कृतिक कार्यक्रमाचे आयोजन',
    tag: 'संस्कृती',
    meta: 'वेंगुर्ला · १ दिवसापूर्वी',
    img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=300&h=200&fit=crop',
  },
  {
    id: 5,
    title: 'दोडामार्गमध्ये अवैध वृक्षतोडीविरोधात कारवाई',
    tag: 'गुन्हे',
    meta: 'दोडामार्ग · १ दिवसापूर्वी',
    img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=300&h=200&fit=crop',
  },
  {
    id: 6,
    title: 'सावंतवाडी लाकडी खेळणी उद्योगाला नवसंजीवनी',
    tag: 'संस्कृती',
    meta: 'सावंतवाडी · २ दिवसांपूर्वी',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop',
  },
];

// New Sections Data
const entertainment = [
  { id: 1, title: 'मालवणी कविता: पावसाची चाहूल', author: 'सुहास कुबल', type: 'कविता', icon: '📜', section: 'kavita', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=200&fit=crop' },
  { id: 2, title: 'लेख: दशावतार लोककला वारसा', author: 'गजानन बांदिवडेकर', type: 'लेख', icon: '✍️', section: 'lekh', img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop' },
  { id: 3, title: 'विनोद: मालवणी माणसाची हुशारी', author: 'प्रशांत गावडे', type: 'विनोद', icon: '😂', section: 'vinod', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop' }
];

const festivalsPrograms = [
  { id: 1, title: 'नारळी पौर्णिमा व दर्या पूजन', date: '९ ऑगस्ट', location: 'मालवण पतन', icon: '🥥', img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300&h=200&fit=crop' },
  { id: 2, title: 'सिंधुदुर्ग गणेशोत्सव २०२६', date: '२७ ऑगस्ट', location: 'सिंधुदुर्ग जिल्हा', icon: '🪔', img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop' },
  { id: 3, title: 'भराडी देवी यात्रा नियोजन', date: '१५ फेब्रु', location: 'आंगणेवाडी', icon: '🚩', img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=300&h=200&fit=crop' }
];

const timetables = [
  { id: 1, type: 'रेल्वे', name: 'कोकण कन्या एक्सप्रेस', time: 'रात्री ८:००', route: 'मुंबई ते मडगाव', icon: '🚆' },
  { id: 2, type: 'एसटी', name: 'मालवण - पुणे', time: 'संध्याकाळी ५:३०', route: 'मालवण - कोल्हापूर - पुणे', icon: '🚌' },
  { id: 3, type: 'खाजगी', name: 'पावलो ट्रॅव्हल्स', time: 'रात्री ९:१५', route: 'सावंतवाडी ते मुंबई', icon: '🚐' }
];

const advertisementImg = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1180&h=200&fit=crop';

const calendarEvent = { day: '१९', month: 'जुलै', year: '२०२६', tithi: 'आषाढ शुक्ल पक्ष, एकादशी' };
const cricketScore = { team1: 'भारत', team2: 'ऑस्ट्रेलिया', score: 'IND 245/4 (45 ov)', status: 'भारत फलंदाजी करत आहे' };

const photoGallery = [
  { id: 1, title: 'सिंधुदुर्ग किल्ला', img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=200&h=200&fit=crop' },
  { id: 2, title: 'तारकर्ली बीच', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop' },
  { id: 3, title: 'आंबोली घाट', img: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=200&h=200&fit=crop' },
  { id: 4, title: 'विजयदुर्ग', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&h=200&fit=crop' },
  { id: 5, title: 'रत्नागिरी', img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=200&h=200&fit=crop' },
  { id: 6, title: 'देवगड', img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=200&h=200&fit=crop' }
];

export default function HomePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('सर्व');

  const filteredLatest = activeTab === 'सर्व'
    ? latestArticles
    : latestArticles.filter((a) => a.tag === activeTab);

  return (
    <div>
      {/* 1. Breaking news ticker */}
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
            <div className="ticker-inner font-poppins text-[12.5px] text-[#fbe8c9]">
              {breakingNews.join('   ◆   ')}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 pb-12">

        {/* 1. HERO - Highlighted News */}
        <div className="py-6">
          <div
            className="hero-inner flex gap-6 bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:-translate-y-1"
            onClick={() => onNavigate('article', heroArticle)}
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}
          >
            <img
              src={heroArticle.img}
              alt={heroArticle.title}
              onError={handleImageError}
              className="w-[55%] h-[340px] object-cover flex-shrink-0 block bg-gray-100"
            />
            <div className="flex flex-col justify-center pr-8 py-8">
              <span
                className="flag-tag inline-block font-poppins font-bold text-[10.5px] text-white px-4 py-1 mb-4 self-start"
                style={{ background: 'var(--maroon)' }}
              >
                {heroArticle.tag}
              </span>
              <h2 className="font-tiro text-[28px] leading-[1.35] text-ink mb-4">
                {heroArticle.title}
              </h2>
              <p className="font-mukta text-[16px] leading-relaxed mb-4" style={{ color: '#5a4c3a' }}>
                {heroArticle.excerpt}
              </p>
              <div className="font-poppins text-[12px] text-grey">{heroArticle.meta}</div>
              <button
                className="mt-5 self-start font-poppins font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors hover:bg-opacity-90"
                style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
                onClick={(e) => { e.stopPropagation(); onNavigate('article', heroArticle); }}
              >
                पूर्ण बातमी वाचा →
              </button>
            </div>
          </div>
        </div>

        {/* 2. Taluka Highlights */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">तालुका बातम्या</h2>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {talukaHighlights.map((t) => (
              <div
                key={t.name}
                onClick={() => onNavigate('listing', { taluka: t.name })}
                className="rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:-translate-y-1 shadow-sm"
              >
                <img src={t.img} alt={t.name} onError={handleImageError} className="w-full h-[110px] object-cover block bg-gray-100" />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-2.5"
                  style={{ background: 'linear-gradient(0deg, rgba(14,42,71,.88) 0%, transparent 55%)' }}
                >
                  <div className="font-poppins font-bold text-[12px] text-white">{t.name}</div>
                  <div className="font-mukta text-[11px] leading-snug mt-0.5" style={{ color: '#E8C169' }}>{t.headline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Latest Articles - includes other district & national and other news */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">ताज्या बातम्या</h2>
            <button
              onClick={() => onNavigate('listing')}
              className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
            >
              सर्व बघा →
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {['सर्व', 'राजकारण', 'पर्यटन', 'मासेमारी-शेती', 'संस्कृती'].map((t) => (
              <span
                key={t}
                onClick={() => setActiveTab(t)}
                className="flex-shrink-0 font-poppins text-[12.5px] px-4 py-1.5 rounded-full cursor-pointer border-[1.5px] nav-transition"
                style={activeTab === t
                  ? { background: 'var(--maroon)', color: '#fbe8c9', borderColor: 'var(--maroon)' }
                  : { background: '#fff', color: 'var(--teal)', borderColor: 'var(--line)' }
                }
              >
                {t}
              </span>
            ))}
          </div>

          <div className="home-latest-grid grid grid-cols-3 gap-5">
            {filteredLatest.length > 0 ? (
              filteredLatest.map((a) => (
                <div
                  key={a.id}
                  onClick={() => onNavigate('article', a)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1"
                  style={{ border: '1px solid var(--line)' }}
                >
                  <img src={a.img} alt={a.title} onError={handleImageError} className="w-full h-[160px] object-cover block bg-gray-100" />
                  <div className="p-4">
                    <span className="font-poppins text-[10.5px] text-teal font-bold uppercase tracking-wide">{a.tag}</span>
                    <h3 className="font-tiro text-[17px] leading-snug text-ink mt-1.5 mb-2">{a.title}</h3>
                    <div className="font-poppins text-[11px] text-grey">{a.meta}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-white rounded-xl p-8 text-center shadow-sm" style={{ border: '1px solid var(--line)' }}>
                <span className="text-[24px] block mb-1">📰</span>
                <div className="font-tiro text-[16px] text-ink font-semibold">या विभागात सध्या कोणतीही बातमी उपलब्ध नाही.</div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Category Cards */}
        <div className="mb-10">
          <h2 className="font-tiro text-[24px] text-maroon-deep mb-4">विभागानुसार बातम्या</h2>
          <div className="home-cat-grid grid grid-cols-6 gap-3">
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
                  onClick={() => onNavigate(targetKey)}
                  className="bg-white rounded-xl p-4 text-center shadow-sm transition-transform hover:-translate-y-1"
                  style={{ border: '1.5px solid var(--line)' }}
                >
                  <div className="text-[28px] mb-2">{cat.icon}</div>
                  <div className="font-tiro text-[15px] text-ink mb-1">{cat.name}</div>
                  <div
                    className="font-poppins text-[10px] font-bold px-2 py-0.5 rounded-full inline-block"
                    style={{ background: cat.color + '18', color: cat.color }}
                  >
                    {cat.count} लेख
                  </div>
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
              onClick={() => onNavigate('kavita-lekh')}
              className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
            >
              सर्व साहित्य बघा →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {entertainment.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('kavita-lekh', { section: item.section })}
                className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1 border border-line"
              >
                <div className="relative h-[120px] overflow-hidden">
                  <img src={item.img} alt={item.title} onError={handleImageError} className="w-full h-full object-cover bg-gray-100" />
                  <span className="absolute top-2 left-2 bg-navy/80 backdrop-blur-sm text-gold-light font-poppins font-bold text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1">
                    <span>{item.icon}</span> {item.type}
                  </span>
                </div>
                <div className="p-3.5">
                  <h3 className="font-tiro text-[16.5px] leading-tight text-ink mb-1">{item.title}</h3>
                  <div className="font-poppins text-[11.5px] text-grey">लेखक: {item.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Gavatle San Utsav, Programs (With Images & Icons) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">गावचे सण, उत्सव आणि कार्यक्रम</h2>
            <button
              onClick={() => onNavigate('utsav')}
              className="font-poppins font-semibold text-[12.5px] text-maroon px-4 py-1.5 rounded-lg border border-maroon hover:bg-maroon hover:text-white transition-colors"
            >
              सर्व उत्सव पहा →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {festivalsPrograms.map((prog) => (
              <div
                key={prog.id}
                onClick={() => onNavigate('utsav')}
                className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1 border border-line"
              >
                <div className="relative h-[120px] overflow-hidden">
                  <img src={prog.img} alt={prog.title} onError={handleImageError} className="w-full h-full object-cover bg-gray-100" />
                  <span className="absolute top-2 left-2 bg-amber/90 text-navy font-poppins font-bold text-[10.5px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
                    <span>{prog.icon}</span> उत्सव
                  </span>
                </div>
                <div className="p-3.5">
                  <h3 className="font-tiro text-[16.5px] text-navy mb-1.5">{prog.title}</h3>
                  <div className="font-poppins text-[12px] text-grey flex items-center justify-between">
                    <span>📅 {prog.date}</span>
                    <span>📍 {prog.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Railway, ST Bus, Private Vehical Timetable */}
        <div className="mb-10">
          <h2 className="font-tiro text-[24px] text-maroon-deep mb-4">वेळापत्रक (रेल्वे, एसटी, खाजगी वाहने)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {timetables.map((t) => (
              <div key={t.id} className="bg-white rounded-xl p-4 shadow-sm border transition-transform hover:-translate-y-1 cursor-pointer" style={{ borderColor: 'var(--line)' }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[24px] bg-cream p-2 rounded-lg">{t.icon}</div>
                  <span className="font-poppins text-[11px] font-bold text-teal bg-teal bg-opacity-10 px-2 py-1 rounded-full">{t.type}</span>
                </div>
                <h3 className="font-tiro text-[18px] text-ink mb-1">{t.name}</h3>
                <div className="font-poppins text-[12px] text-grey mb-2">{t.route}</div>
                <div className="font-poppins text-[14px] font-bold text-maroon">वेळ: {t.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Advertisement */}
        <div className="mb-10">
          <a href="#" className="block rounded-xl overflow-hidden shadow-sm transition-opacity hover:opacity-95">
            <img src={advertisementImg} alt="Advertisement" className="w-full h-[120px] md:h-[150px] object-cover" />
          </a>
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
              <span className="text-xl">🏏</span>
            </div>
            <h3 className="font-poppins text-[18px] font-bold text-navy mb-1">
              {cricketScore.team1} vs {cricketScore.team2}
            </h3>
            <div className="font-poppins text-[22px] font-bold text-teal mb-1">{cricketScore.score}</div>
            <div className="font-mukta text-[14px] text-grey">{cricketScore.status}</div>
          </div>
        </div>

        {/* 10. Image, Photography Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tiro text-[24px] text-maroon-deep">छायाचित्रे / गॅलरी</h2>
            <button
              onClick={() => onNavigate('gallery')}
              className="font-poppins font-semibold text-[12.5px] text-teal px-4 py-1.5 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors"
            >
              सर्व गॅलरी पहा →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {photoGallery.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onNavigate('gallery')}
                className="rounded-xl overflow-hidden relative cursor-pointer group shadow-sm"
              >
                <img src={photo.img} alt={photo.title} className="w-full h-[120px] object-cover transition-transform duration-300 group-hover:scale-110" />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(0deg, rgba(0,0,0,.7) 0%, transparent 60%)' }}
                >
                  <div className="font-mukta font-medium text-[12px] text-white text-center">{photo.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            onClick={() => onNavigate('chatbot')}
            className="flex-shrink-0 font-poppins font-bold text-[14px] px-7 py-4 rounded-xl flex items-center gap-3 transition-transform hover:scale-105"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
          >
            <span className="text-[20px]">🤖</span>
            AI ला विचारा
          </button>
        </div>

      </div>
    </div>
  );
}
