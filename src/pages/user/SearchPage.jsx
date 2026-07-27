import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../api/posts.js';
import { getMediaUrl } from '../../utils/media.js';

export default function SearchPage({ onNavigate, onGoBack }) {
  const routerNavigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const { data: searchData, isLoading, isError } = useQuery({
    queryKey: ['search-posts', activeQuery],
    queryFn: () => fetchPosts({ search: activeQuery, limit: 30 }),
    enabled: true
  });

  const posts = searchData?.posts || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
  };

  return (
    <div>
      {/* Search Hero */}
      <div className="bg-white py-8" style={{ borderBottom: '1px solid var(--line)' }}>
        <form onSubmit={handleSearchSubmit} className="max-w-[640px] mx-auto flex gap-2.5 px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="शोधाचे शब्द टाका (उदा. मालवण, पर्यटन, बातमी)..."
            className="flex-1 px-[18px] py-3.5 font-mukta text-[16px] text-ink rounded-[10px] outline-none"
            style={{ border: '2px solid var(--gold)' }}
          />
          <button
            type="submit"
            className="font-poppins font-semibold text-[14px] px-6 rounded-[10px] flex items-center gap-2"
            style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
          >
            <Search size={16} /> शोधा
          </button>
        </form>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-8">
        <h2 className="font-tiro text-[22px] text-ink mb-6">
          {activeQuery ? `"${activeQuery}" संदर्भांतले निकाल (${posts.length})` : `सगळ्यो ताज्यो बातम्या (${posts.length})`}
        </h2>

        {isLoading ? (
          <div className="text-center py-12 font-poppins text-grey">बातम्या शोधतहा...</div>
        ) : isError ? (
          <div className="text-center py-12 font-poppins text-red-500">शोधताना चूक जाली.</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 font-poppins text-grey">खंयचीच बातमी गावूक नाय.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => routerNavigate(`/article/${post.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-line cursor-pointer flex flex-col"
              >
                <img
                  src={post.image ? getMediaUrl(post.image) : post.image_type ? getMediaUrl(`/posts/${post.id}/image`) : 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=250&fit=crop'}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-poppins text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                      {post.categoryName || 'बातमी'}
                    </span>
                    <h3 className="font-tiro text-[17px] font-bold text-ink mt-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </div>
                  <p className="font-poppins text-[12px] text-grey mt-3">
                    {new Date(post.createdAt).toLocaleDateString('mr-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
