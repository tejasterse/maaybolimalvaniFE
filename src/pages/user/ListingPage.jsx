import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowRight, Eye, Play } from 'lucide-react';
import { fetchPosts } from '../../api/posts.js';
import { fetchAds } from '../../api/ads.js';
import { getMediaUrl } from '../../utils/media.js';
import SEOHead from '../../components/shared/SEOHead.jsx';
import { generateBreadcrumbSchema } from '../../utils/seo.js';
import AdCarousel from '../../components/shared/AdCarousel.jsx';

const talukaFilters = ['सगळे तालुके', 'मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'वैभववाडी', 'दोडामार्ग'];

const categoryDetails = {
  listing: { title: 'तालुक्यच्यो बातम्या', desc: 'सिंधुदुर्ग आनि कोकण परिसरांतल्यो तालुक्यांच्यो बातम्या', count: 'एकूण ६२ लेख' },
  rajkaran: { title: 'राजकारण', desc: 'सिंधुदुर्ग आनि कोकण परिसरांतल्यो राजकीय घडामोडी', count: 'एकूण ५६ लेख' },
  maasemari: { title: 'मासेमारी-शेती', desc: 'कोकणांतलो मत्स्यव्यवसाय आनि कृषी क्षेत्रांतल्यो घडामोडी', count: 'एकूण ३८ लेख' },
  paryatan: { title: 'पर्यटन', desc: 'सिंधुदुर्ग आनि कोकण परिसरांतल्यो पर्यटनाशी संबंधित सगळ्यो बातम्या', count: 'एकूण २९ लेख' },
  sanskriti: { title: 'संस्कृती', desc: 'कोकणांतली कला, सण, दशावतार आनि सांस्कृतिक वारसा', count: 'एकूण ४१ लेख' },
  krida: { title: 'खेळ', desc: 'सिंधुदुर्ग आनि कोकण परिसरांतल्यो खेळ विश्वांतल्यो घडामोडी', count: 'एकूण १७ लेख' },
  'itar-batme': { title: 'इतर बातमे', desc: 'सिंधुदुर्ग आनि कोकण परिसरांतल्यो इतर महत्त्वाच्यो घडामोडी आनि बातम्या', count: 'एकूण १५ लेख' },
  gunhe: { title: 'गुन्हे बातम्या', desc: 'सिंधुदुर्ग आनि कोकण परिसरांतल्यो कायदा, सुव्यवस्था आनि गुन्हेगारी विषयक घडामोडी', count: 'एकूण १२ लेख' }
};

export default function ListingPage({ categoryKey: propCategoryKey, initialTaluka, onNavigate, onGoBack }) {
  const routerNavigate = useNavigate();
  const navigate = (path) => {
    if (onNavigate) {
      if (path === '/') {
        onNavigate('home');
      } else if (path.startsWith('/article/')) {
        const targetId = path.split('/').pop();
        onNavigate('article', targetId);
      } else {
        onNavigate('home');
      }
    } else {
      routerNavigate(path);
    }
  };
  const location = useLocation();
  const params = useParams();

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  };
  
  const categoryKey = propCategoryKey || params.categoryKey || 'listing';
  
  const [selectedRegion, setSelectedRegion] = useState('कोंकण');
  const [selectedTaluka, setSelectedTaluka] = useState(location.state?.taluka || initialTaluka || 'सगळे तालुके');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const detail = categoryDetails[categoryKey] || categoryDetails['listing'];

  // Sync selectedTaluka if initialTaluka changes
  useEffect(() => {
    if (initialTaluka) {
      setSelectedTaluka(initialTaluka);
    }
  }, [initialTaluka]);

  // Reset page when taluka changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTaluka]);

  const { data = {}, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  });
  const posts = data.posts || [];

  const { data: ads = [] } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds
  });

  const categoryMappingReverse = {
    'rajkaran': ['राजकारण', 'Politics'],
    'paryatan': ['पर्यटन', 'Tourism'],
    'maasemari': ['मासेमारी-शेती', 'मासेमारी', 'शेती', 'Fishing-farming'],
    'sanskriti': ['संस्कृती', 'Culture'],
    'krida': ['खेळ', 'क्रीडा', 'Sports'],
    'itar-batme': ['इतर बातमे', 'इतर बातम्या', 'इतर', 'Other News', 'Other'],
    'itar': ['इतर बातमे', 'इतर बातम्या', 'इतर', 'Other News', 'Other'],
    'gunhe': ['गुन्हे', 'गुन्हे बातम्या', 'Crimes'],
  };

  const filteredArticles = posts.filter((art) => {
    const expectedCatNames = categoryMappingReverse[categoryKey] || [];
    const matchesCategory =
      categoryKey === 'listing' ||
      expectedCatNames.some(name => (art.categoryName || '').includes(name)) ||
      art.categoryKey === categoryKey;
    const matchesTaluka = selectedTaluka === 'सगळे तालुके' || (art.districtName && art.districtName === selectedTaluka);
    return matchesCategory && matchesTaluka;
  });

  const sortedArticles = sortBy === 'latest' ? filteredArticles : [...filteredArticles].reverse();

  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / itemsPerPage));
  const safePageIndex = currentPage > totalPages ? 1 : currentPage;

  const toMarathiNumber = (n) => {
    const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return n.toString().split('').map(digit => marathiDigits[parseInt(digit)] || digit).join('');
  };

  const pagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  const paginatedArticles = sortedArticles.slice((safePageIndex - 1) * itemsPerPage, safePageIndex * itemsPerPage);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'होम', url: '/' },
    { name: details.title, url: `/${categoryKey}` }
  ]);

  return (
    <div>
      <SEOHead
        title={`${details.title} | मायबोली मालवणी`}
        description={details.desc}
        canonicalUrl={`/${categoryKey}`}
        jsonLd={[breadcrumbSchema]}
      />
      {/* Category Banner */}
      <div
        className="py-10"
        style={{ background: 'linear-gradient(120deg, var(--navy) 0%, var(--teal) 100%)' }}
      >
        <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-end flex-wrap gap-4">
          <div>
            <span
              className="flag-tag-90 inline-block font-poppins font-bold text-[11.5px] px-4 py-1.5 mb-3"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}
            >
              विभाग
            </span>
            <h1 className="font-tiro text-[36px] text-white">{detail.title}</h1>
            <p className="font-poppins text-[13px] mt-2" style={{ color: '#c9d6e2' }}>
              {detail.desc}
            </p>
          </div>
          <div
            className="font-poppins text-[13px] text-white px-[18px] py-2.5 rounded-[20px]"
            style={{ background: 'rgba(255,255,255,.12)' }}
          >
            एकूण {sortedArticles.length} लेख
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6">
        {/* Region & District Toolbar */}
        <div className="py-6 border-b border-line/60 mb-4">
          <div className="flex flex-col gap-3">
            {/* 1. Primary Region Categories: कोंकण, महाराष्ट्र, देश */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-poppins text-[12px] font-bold text-maroon-deep mr-1">विभाग:</span>
              {['कोंकण', 'महाराष्ट्र', 'देश'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    setSelectedRegion(reg);
                    if (reg !== 'कोंकण') setSelectedTaluka('सगळे');
                  }}
                  className={`font-poppins text-[13px] font-bold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedRegion === reg
                      ? 'bg-maroon text-gold-light shadow-sm border border-gold/40'
                      : 'bg-white text-navy border border-line hover:bg-cream'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* 2. Sub-categories under कोंकण (Only shown when कोंकण is selected) */}
            {selectedRegion === 'कोंकण' && (
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-line/40">
                <span className="font-poppins text-[11px] text-grey mr-1 font-semibold">तालुका / sub-category:</span>
                {['सगळे तालुके', 'मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'दोडामार्ग', 'वैभववाडी'].map((f) => (
                  <span
                    key={f}
                    onClick={() => setSelectedTaluka(f)}
                    className={`font-poppins text-[12px] px-3 py-1 rounded-full cursor-pointer border transition-all ${
                      selectedTaluka === f
                        ? 'bg-teal text-white font-semibold border-teal shadow-xs'
                        : 'bg-white text-ink border-line hover:bg-teal/5'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Toolbar - Order controls */}
        <div className="flex justify-between items-center pb-4 flex-wrap gap-3">
          <div className="font-poppins text-[13px] text-grey font-medium">
            {selectedRegion === 'कोंकण' && selectedTaluka !== 'सगळे तालुके' 
              ? `${selectedTaluka} बातम्या` 
              : `${selectedRegion} विभाग खबरें`}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-poppins text-[12px] text-grey">क्रमवारी:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-poppins text-[12.5px] bg-white border border-line rounded-lg px-3 py-1.5 text-navy font-medium focus:outline-none focus:border-teal"
            >
              <option value="latest">नवीनतम (Latest)</option>
              <option value="oldest">जुने (Oldest)</option>
            </select>
          </div>
        </div>

        {/* Listing */}
        {isLoading ? (
          <div className="py-10 text-center font-poppins text-grey">बातम्या लोड होतहात...</div>
        ) : paginatedArticles.length > 0 ? (
          paginatedArticles.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/article/${item.id}`)}
              className="bg-white rounded-[10px] p-4 flex gap-4 cursor-pointer transition-transform hover:-translate-y-0.5 border border-line/60 shadow-sm mb-4"
            >
              <div className="relative flex-shrink-0 hidden sm:block">
                <img
                  src={item.image ? getMediaUrl(item.image) : item.image_type ? getMediaUrl(`/posts/${item.id}/image`) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80';
                  }}
                  className="w-[200px] h-[130px] object-cover rounded-lg block bg-gray-100"
                />
                {(item.video_type || item.video_url || item.hasVideo || item.isVideo) && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full backdrop-blur-xs">
                    <Play size={12} fill="currentColor" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-poppins text-[10.5px] text-teal font-bold uppercase tracking-[.05em]">
                    {item.categoryName || 'बातमी'}
                  </span>
                  <h3 className="font-tiro text-[19px] text-ink my-1.5 leading-snug">{item.title}</h3>
                  <p className="font-mukta text-[15px] leading-relaxed mb-2 text-grey line-clamp-2">
                    {item.content ? stripHtml(item.content).substring(0, 140) + '...' : ''}
                  </p>
                </div>
                <div className="font-poppins text-[11px] text-grey flex items-center justify-between">
                  <span>{item.districtName || 'सिंधुदुर्ग'} · {new Date(item.createdAt).toLocaleDateString('mr-IN')}</span>
                  <span className="flex items-center gap-1 font-bold text-navy bg-cream px-2.5 py-0.5 rounded-md border border-line shadow-xs">
                    <Eye size={12} className="text-teal" /> {Number(item.viewer_count ?? item.views ?? 0).toLocaleString('en-IN')} वाचक
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[10px] p-10 text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <Search size={32} className="text-grey" />
            </div>
            <div className="font-tiro text-[18px] text-ink font-semibold">ह्या तालुक्यांत सद्याक खंयचीच बातमी उपलब्ध नाय.</div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 py-8">
            {pagesArray.map((p) => {
              const isActive = safePageIndex === p;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className="font-poppins text-[13px] font-semibold w-9 h-9 rounded-lg flex items-center justify-center border-[1.5px] nav-transition"
                  style={
                    isActive
                      ? { background: 'var(--maroon)', color: '#fbe8c9', borderColor: 'var(--maroon)', cursor: 'pointer' }
                      : { background: '#fff', color: 'var(--teal)', borderColor: 'var(--line)', cursor: 'pointer' }
                  }
                >
                  {toMarathiNumber(p)}
                </button>
              );
            })}
            {safePageIndex < totalPages && (
              <button
                onClick={() => setCurrentPage(safePageIndex + 1)}
                className="font-poppins text-[13px] font-semibold w-9 h-9 rounded-lg flex items-center justify-center border-[1.5px] nav-transition bg-white text-teal border-line"
              >
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* Advertisement Slider */}
        <AdCarousel ads={ads} className="my-8" />
      </div>
    </div>
  );
}
