import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowRight } from 'lucide-react';
import { fetchPosts } from '../../api/posts.js';

const talukaFilters = ['सर्व तालुके', 'मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड'];

const categoryDetails = {
  listing: { title: 'तालुका बातम्या', desc: 'सिंधुदुर्ग व कोकण परिसरातील तालुक्यांच्या बातम्या', count: 'एकूण ६२ लेख' },
  rajkaran: { title: 'राजकारण', desc: 'सिंधुदुर्ग व कोकण परिसरातील राजकीय घडामोडी', count: 'एकूण ५६ लेख' },
  maasemari: { title: 'मासेमारी-शेती', desc: 'कोकणातील मत्स्यव्यवसाय आणि कृषी क्षेत्रातील घडामोडी', count: 'एकूण ३८ लेख' },
  paryatan: { title: 'पर्यटन', desc: 'सिंधुदुर्ग व कोकण परिसरातील पर्यटनाशी संबंधित सर्व बातम्या', count: 'एकूण २९ लेख' },
  sanskriti: { title: 'संस्कृती', desc: 'कोकणातील कला, सण, दशावतार आणि सांस्कृतिक वारसा', count: 'एकूण ४१ लेख' },
  krida: { title: 'क्रीडा', desc: 'सिंधुदुर्ग व कोकण परिसरातील क्रीडा विश्वातील घडामोडी', count: 'एकूण १७ लेख' },
  gunhe: { title: 'गुन्हे बातम्या', desc: 'सिंधुदुर्ग व कोकण परिसरातील कायदा, सुव्यवस्था आणि गुन्हेगारी विषयक घडामोडी', count: 'एकूण १२ लेख' }
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
  
  const [selectedTaluka, setSelectedTaluka] = useState(location.state?.taluka || initialTaluka || 'सर्व तालुके');
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

  const categoryMappingReverse = {
    'rajkaran': 'राजकारण',
    'paryatan': 'पर्यटन',
    'maasemari': 'मासेमारी-शेती',
    'sanskriti': 'संस्कृती',
    'krida': 'क्रीडा',
  };

  const filteredArticles = posts.filter((art) => {
    const expectedCatName = categoryMappingReverse[categoryKey];
    const matchesCategory = categoryKey === 'listing' || art.categoryName === expectedCatName;
    const matchesTaluka = selectedTaluka === 'सर्व तालुके' || (art.districtName && art.districtName === selectedTaluka);
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

  return (
    <div>
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
            {detail.count}
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center py-6 flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {talukaFilters.map((f) => (
              <span
                key={f}
                onClick={() => setSelectedTaluka(f)}
                className="font-poppins text-[12.5px] px-3.5 py-[7px] rounded-[18px] cursor-pointer border-[1.5px] nav-transition"
                style={
                  selectedTaluka === f
                    ? { background: 'var(--maroon)', color: '#fbe8c9', borderColor: 'var(--maroon)' }
                    : { background: '#fff', color: 'var(--maroon-deep)', borderColor: 'var(--line)' }
                }
              >
                {f}
              </span>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-poppins text-[12.5px] text-teal bg-white border-[1.5px] border-line px-3.5 py-2 rounded-lg outline-none"
          >
            <option value="latest">नवीनतम आधी</option>
            <option value="popular">लोकप्रिय आधी</option>
          </select>
        </div>

        {/* Listing */}
        {isLoading ? (
          <div className="py-10 text-center font-poppins text-grey">बातम्या लोड होत आहेत...</div>
        ) : paginatedArticles.length > 0 ? (
          paginatedArticles.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/article/${item.id}`)}
              className="listing-item-inner flex gap-5 bg-white rounded-[10px] p-4 mb-4 shadow-sm cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <img
                src={(item.image || item.image_type) ? `http://localhost:5000/api/posts/${item.id}/image` : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'}
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80';
                }}
                className="w-[200px] h-[130px] object-cover rounded-lg flex-shrink-0 hidden sm:block bg-gray-100"
              />
              <div>
                <span className="font-poppins text-[10.5px] text-teal font-bold uppercase tracking-[.05em]">
                  {item.categoryName || 'बातमी'}
                </span>
                <h3 className="font-tiro text-[19px] text-ink my-2 leading-snug">{item.title}</h3>
                <p className="font-mukta text-[15px] leading-relaxed mb-3 text-grey line-clamp-3">
                  {item.content ? stripHtml(item.content).substring(0, 150) + '...' : ''}
                </p>
                <div className="font-poppins text-[11px] text-grey">
                  {item.districtName || 'सिंधुदुर्ग'} · {new Date(item.createdAt).toLocaleDateString('mr-IN')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[10px] p-10 text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <Search size={32} className="text-grey" />
            </div>
            <div className="font-tiro text-[18px] text-ink font-semibold">या तालुक्यात सध्या कोणतीही बातमी उपलब्ध नाही.</div>
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
      </div>
    </div>
  );
}
