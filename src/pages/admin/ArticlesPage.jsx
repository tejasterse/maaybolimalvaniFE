import { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from '../../api/posts.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMediaUrl } from '../../utils/media.js';

const statusColors = {
  DRAFT: 'var(--grey)',
  PENDING_REVIEW: 'var(--amber)',
  PUBLISHED: 'var(--maroon)',
};

const statusLabels = {
  DRAFT: 'ड्राफ्ट',
  PENDING_REVIEW: 'रिव्ह्यूमध्ये',
  PUBLISHED: 'प्रकाशित',
};

const filters = ['सर्व', 'ड्राफ्ट', 'रिव्ह्यूमध्ये', 'प्रकाशित'];

export default function ArticlesPage({ onEdit }) {
  const navigate = useNavigate();
  const handleEdit = (article = null) => {
    if (onEdit) {
      onEdit(article);
    } else {
      navigate(article ? '/admin/articles/edit' : '/admin/articles/new', { state: { article } });
    }
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('सर्व');
  const [selectedTaluka, setSelectedTaluka] = useState('सर्व तालुके');
  const [selectedCategory, setSelectedCategory] = useState('सर्व विभाग');
  const [selectedAuthor, setSelectedAuthor] = useState('सर्व लेखक');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts({ page: currentPage, limit, admin: true });
      const mappedArticles = data.posts ? data.posts.map(post => ({
        ...post,
        status: post.status || 'PUBLISHED',
        statusLabel: statusLabels[post.status || 'PUBLISHED'],
        category: post.categoryName || 'Unknown',
        taluka: post.districtName || 'Unknown',
        author: post.authorName || 'Unknown',
        updated: new Date(post.createdAt).toLocaleDateString('mr-IN'),
      })) : [];
      setArticles(mappedArticles);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("तुम्हाला खात्री आहे का की तुम्हाला हा लेख काढून टाकायचा आहे?")) {
      try {
        await deletePost(id);
        toast.success("लेख यशस्वीरित्या काढून टाकला!");
        loadArticles();
      } catch (error) {
        toast.error("लेख काढताना त्रुटी आली: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const statusMap = {
    'सर्व': 'all',
    'ड्राफ्ट': 'DRAFT',
    'रिव्ह्यूमध्ये': 'PENDING_REVIEW',
    'प्रकाशित': 'PUBLISHED',
  };

  const filteredArticles = articles.filter((a) => {
    const matchesStatus = active === 'सर्व' || a.status === statusMap[active];
    const matchesTaluka = selectedTaluka === 'सर्व तालुके' || a.taluka === selectedTaluka;
    const matchesCategory = selectedCategory === 'सर्व विभाग' || a.category === selectedCategory;
    const matchesAuthor = selectedAuthor === 'सर्व लेखक' || a.author === selectedAuthor;
    return matchesStatus && matchesTaluka && matchesCategory && matchesAuthor;
  });

  return (
    <div>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h1 className="font-tiro text-[26px] text-maroon-deep">लेख</h1>
          <p className="font-poppins text-[12.5px] text-grey mt-1">सर्व लेख — ड्राफ्ट, प्रकाशित व शेड्यूल्ड</p>
        </div>
        <button
          onClick={() => handleEdit()}
          className="font-poppins font-semibold text-[13px] px-[18px] py-2.5 rounded-[7px] text-[#fbe8c9] nav-transition"
          style={{ background: 'var(--maroon)' }}
        >
          + नवीन लेख
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <span
              key={f}
              onClick={() => setActive(f)}
              className={`font-poppins text-[12px] px-3.5 py-[7px] rounded-[20px] cursor-pointer border-[1.5px] transition-colors
                ${active === f
                  ? 'bg-teal text-white border-teal'
                  : 'bg-white text-teal border-line'
                }`}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTaluka}
            onChange={(e) => setSelectedTaluka(e.target.value)}
            className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3 py-1.5 rounded-[20px] outline-none cursor-pointer"
          >
            <option>सर्व तालुके</option>
            <option>मालवण</option>
            <option>कणकवली</option>
            <option>कुडाळ</option>
            <option>सावंतवाडी</option>
            <option>वेंगुर्ला</option>
            <option>देवगड</option>
            <option>वैभववाडी</option>
            <option>दोडामार्ग</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3 py-1.5 rounded-[20px] outline-none cursor-pointer"
          >
            <option>सर्व विभाग</option>
            <option>पर्यटन</option>
            <option>राजकारण</option>
            <option>मासेमारी-शेती</option>
            <option>संस्कृती</option>
            <option>क्रीडा</option>
          </select>

          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="font-poppins text-[12px] text-teal bg-white border-[1.5px] border-line px-3 py-1.5 rounded-[20px] outline-none cursor-pointer"
          >
            <option>सर्व लेखक</option>
            <option>सारिका पवार</option>
            <option>राजेश कदम</option>
            <option>मीना जाधव</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[10px] shadow-sm" style={{ background: '#fff' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#F6F1E6' }}>
              {['चित्र', 'शीर्षक', 'स्थिती', 'वाचक', 'विभाग', 'तालुका', 'लेखक', 'अपडेट', ''].map((h) => (
                <th
                  key={h}
                  className="font-poppins text-[11px] uppercase tracking-[.06em] text-grey text-left px-4 py-3 font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-8 text-center font-mukta text-[15px] text-grey">
                  लेख लोड होत आहेत...
                </td>
              </tr>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((a) => (
                <tr key={a.id} style={{ borderTop: '1px solid var(--line)' }}>
                  <td className="px-4 py-3.5">
                    <img
                      src={a.image ? getMediaUrl(a.image) : a.image_type ? getMediaUrl(`/posts/${a.id}/image`) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'}
                      alt={a.title}
                      className="w-14 h-10 object-cover rounded-[6px] border border-line flex-shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop';
                      }}
                    />
                  </td>
                  <td className="font-tiro text-[16px] text-ink px-4 py-3.5 max-w-[280px]">{a.title}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className="flag-tag inline-block font-poppins text-[10.5px] font-bold text-white px-3 py-1"
                      style={{ background: statusColors[a.status] }}
                    >
                      {a.statusLabel}
                    </span>
                  </td>
                  <td className="font-poppins text-[12px] font-bold text-teal px-4 py-3.5">👁 {(a.viewer_count || 0).toLocaleString('en-IN')}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.category}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.taluka}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.author}</td>
                  <td className="font-poppins text-[12px] text-grey px-4 py-3.5">{a.updated}</td>
                  <td className="px-4 py-3.5 flex gap-3">
                    <button
                      onClick={() => handleEdit(a)}
                      className="font-poppins text-[12px] text-teal font-semibold hover:underline"
                    >
                      संपादित करा
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="font-poppins text-[12px] text-maroon font-semibold hover:underline"
                    >
                      काढून टाका
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center font-mukta text-[15px] text-grey">
                  जुळणारे कोणतेही लेख सापडले नाहीत.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className="font-poppins text-[13px] font-semibold w-8 h-8 rounded flex items-center justify-center border"
              style={
                currentPage === p
                  ? { background: 'var(--maroon)', color: '#fff', borderColor: 'var(--maroon)' }
                  : { background: '#fff', color: 'var(--teal)', borderColor: 'var(--line)' }
              }
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
