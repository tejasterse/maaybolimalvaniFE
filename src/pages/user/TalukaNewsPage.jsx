import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../api/posts.js';
import { getMediaUrl } from '../../utils/media.js';
import SEOHead from '../../components/shared/SEOHead.jsx';
import { generateBreadcrumbSchema, createExcerpt } from '../../utils/seo.js';
import { MapPin, ArrowRight, Flame, Calendar, Eye, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const TALUKA_DETAILS = {
  sindhudurg: {
    marathiName: 'सिंधुदुर्ग',
    englishName: 'Sindhudurg',
    intro: 'सिंधुदुर्ग जिल्ह्यातील ताज्या घडामोडी, स्थानिक बातम्या, राजकीय बातम्या, निसर्ग पर्यटन, संस्कृती आणि हवामान अपडेट्स वाचण्यासाठी मायबोली मालवणीला भेट द्या.',
    metaTitle: 'सिंधुदुर्ग बातम्या | Sindhudurg News | मायबोली मालवणी',
    keywords: 'Sindhudurg news, सिंधुदुर्ग बातम्या, कोकण ताज्या बातम्या, Sindhudurg breaking news'
  },
  malvan: {
    marathiName: 'मालवण',
    englishName: 'Malvan',
    intro: 'मालवण तालुक्यातील ताज्या बातम्या, किल्ले सिंधुदुर्ग, तारकर्ली पर्यटन, मासेमारी, स्थानिक संस्कृती व राजकीय घडामोडींचे विश्वासार्ह व्यासपीठ.',
    metaTitle: 'मालवण बातम्या | Malvan News | मायबोली मालवणी',
    keywords: 'Malvan news, मालवण बातम्या, Tarkarli news, मालवण ताज्या घडामोडी'
  },
  sawantwadi: {
    marathiName: 'सावंतवाडी',
    englishName: 'Sawantwadi',
    intro: 'सावंतवाडी शहर व परिसरातील ताज्या राजकीय, सामाजिक, लाकडी खेळणी उद्योग, पर्यटन आणि हवामानाच्या ताज्या बातम्या.',
    metaTitle: 'सावंतवाडी बातम्या | Sawantwadi News | मायबोली मालवणी',
    keywords: 'Sawantwadi news, सावंतवाडी बातम्या, सावंतवाडी राजकारण'
  },
  kankavli: {
    marathiName: 'कणकवली',
    englishName: 'Kankavli',
    intro: 'कणकवली तालुक्यातील मुख्य राजकीय घडामोडी, व्यापार, शेती, रस्ते विकास आणि ताज्या ब्रेकिंग बातम्या.',
    metaTitle: 'कणकवली बातम्या | Kankavli News | मायबोली मालवणी',
    keywords: 'Kankavli news, कणकवली बातम्या, कणकवली ब्रेक‌िंग न्यूज'
  },
  kudal: {
    marathiName: 'कुडाळ',
    englishName: 'Kudal',
    intro: 'कुडाळ तालुक्यातील सर्व महत्त्वाच्या घडामोडी, सामाजिक उपक्रम, क्रीडा व प्रशासकीय अपडेट्स एकाच ठिकाणी.',
    metaTitle: 'कुडाळ बातम्या | Kudal News | मायबोली मालवणी',
    keywords: 'Kudal news, कुडाळ बातम्या, कुडाळ ताज्या बातम्या'
  },
  vengurla: {
    marathiName: 'वेंगुर्ला',
    englishName: 'Vengurla',
    intro: 'वेंगुर्ला किनारपट्टी, बंदर बातम्या, आंबा काजू शेती, पर्यटन आणि स्थानिक वृत्त संकलन.',
    metaTitle: 'वेंगुर्ला बातम्या | Vengurla News | मायबोली मालवणी',
    keywords: 'Vengurla news, वेंगुर्ला बातम्या, वेंगुर्ला पर्यटन'
  },
  devgad: {
    marathiName: 'देवगड',
    englishName: 'Devgad',
    intro: 'देवगड हापूस आंबा हंगाम, बंदर विकास, मासेमारी व्यवसाय आणि स्थानिक ग्रामपंचायत बातम्या.',
    metaTitle: 'देवगड बातम्या | Devgad News | मायबोली मालवणी',
    keywords: 'Devgad news, देवगड बातम्या, देवगड हापूस आंबा'
  },
  vaibhavwadi: {
    marathiName: 'वैभववाडी',
    englishName: 'Vaibhavwadi',
    intro: 'वैभववाडी तालुक्यातील सह्याद्री परिसर, धबधबे, शेती बातम्या व स्थानिक प्रशासकीय घडामोडी.',
    metaTitle: 'वैभववाडी बातम्या | Vaibhavwadi News | मायबोली मालवणी',
    keywords: 'Vaibhavwadi news, वैभववाडी बातम्या'
  },
  dodamarg: {
    marathiName: 'दोडामार्ग',
    englishName: 'Dodamarg',
    intro: 'दोडामार्ग तालुका, गोवा सीमावर्ती भाग, निसर्ग संवर्धन व स्थानिक नागरिक अपडेट्स.',
    metaTitle: 'दोडामार्ग बातम्या | Dodamarg News | मायबोली मालवणी',
    keywords: 'Dodamarg news, दोडामार्ग बातम्या'
  }
};

const ALL_TALUKAS = [
  { slug: 'sindhudurg', name: 'सिंधुदुर्ग' },
  { slug: 'malvan', name: 'मालवण' },
  { slug: 'sawantwadi', name: 'सावंतवाडी' },
  { slug: 'kankavli', name: 'कणकवली' },
  { slug: 'kudal', name: 'कुडाळ' },
  { slug: 'vengurla', name: 'वेंगुर्ला' },
  { slug: 'devgad', name: 'देवगड' },
  { slug: 'vaibhavwadi', name: 'वैभववाडी' },
  { slug: 'dodamarg', name: 'दोडामार्ग' }
];

export default function TalukaNewsPage({ talukaKey = 'malvan', onNavigate, onGoBack }) {
  const details = TALUKA_DETAILS[talukaKey] || TALUKA_DETAILS.sindhudurg;

  const { data: postsData = {}, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  const allPosts = postsData.posts || [];

  // Filter posts matching this district/taluka or show top posts if overall district
  const filteredPosts = allPosts.filter((p) => {
    if (talukaKey === 'sindhudurg') return true;
    return (p.districtName && p.districtName.trim() === details.marathiName) ||
           (p.content && p.content.includes(details.marathiName)) ||
           (p.title && p.title.includes(details.marathiName));
  });

  const breadcrumbs = [
    { name: 'होम', url: '/' },
    { name: 'सिंधुदुर्ग', url: '/sindhudurg' },
    { name: details.marathiName, url: `/${talukaKey}` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const handleShare = (post, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/news/${post.slug || post.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success('बातमीची लिंक कॉपी झाली!');
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 font-mukta">
      <SEOHead
        title={details.metaTitle}
        description={details.intro}
        canonicalUrl={`/${talukaKey}`}
        jsonLd={[breadcrumbSchema]}
      />

      {/* Header Banner for Taluka */}
      <div className="bg-gradient-to-r from-maroon-deep via-maroon to-maroon-deep text-white p-6 sm:p-8 rounded-3xl mb-8 shadow-md border-2 border-gold/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gold-light font-poppins text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin size={16} />
            <span>तालुका विशेष / Local News</span>
          </div>
          <h1 className="font-tiro text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 drop-shadow">
            {details.marathiName} बातम्या ({details.englishName} News)
          </h1>
          <p className="text-cream text-sm sm:text-base max-w-3xl leading-relaxed font-mukta">
            {details.intro}
          </p>
        </div>
      </div>

      {/* Related Taluka Pills */}
      <div className="mb-8">
        <h3 className="text-xs font-poppins font-bold text-grey-dark uppercase tracking-wider mb-3">
          सिंधुदुर्गातील इतर तालुके (Explore Talukas):
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_TALUKAS.map((t) => (
            <button
              key={t.slug}
              onClick={() => onNavigate ? onNavigate(t.slug) : (window.location.href = `/${t.slug}`)}
              className={`px-4 py-1.5 rounded-full font-poppins text-xs font-bold transition-all border ${
                talukaKey === t.slug
                  ? 'bg-maroon text-gold-light border-gold shadow'
                  : 'bg-white text-maroon hover:bg-amber-50 border-gold/40'
              }`}
            >
              {t.name} बातम्या
            </button>
          ))}
        </div>
      </div>

      {/* Main Articles List */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-gold">
          <h2 className="font-tiro text-2xl font-bold text-maroon-deep flex items-center gap-2">
            <Flame className="w-6 h-6 text-maroon" />
            <span>{details.marathiName} तालुक्यातील ताज्या घडामोडी ({filteredPosts.length})</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-grey font-poppins">बातमी लोड होत आसा...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-12 text-center bg-white p-8 rounded-2xl border border-gold/30 text-grey-dark">
            {details.marathiName} तालुक्यात सध्या कोणतीही नवीन बातमी उपलब्ध नाही.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const imgUrl = post.image
                ? getMediaUrl(post.image)
                : post.image_type
                ? getMediaUrl(`/posts/${post.id}/image`)
                : 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=600&h=400&fit=crop';

              const postDate = new Date(post.createdAt).toLocaleDateString('mr-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <article
                  key={post.id}
                  onClick={() => onNavigate ? onNavigate('article', post.slug || post.id) : (window.location.href = `/news/${post.slug || post.id}`)}
                  className="bg-white rounded-2xl border border-gold/30 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={imgUrl}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.categoryName && (
                      <span className="absolute top-3 left-3 bg-maroon-deep/90 text-gold-light font-poppins text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-gold/30">
                        {post.categoryName}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-grey mb-2 font-poppins">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {postDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={13} />
                          {post.viewer_count || 0}
                        </span>
                      </div>
                      <h3 className="font-tiro text-lg font-bold text-maroon-deep line-clamp-2 leading-snug group-hover:text-gold-dark transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-grey-dark text-xs mt-2 line-clamp-3 leading-relaxed font-mukta">
                        {createExcerpt(post.content, 120)}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-poppins font-semibold">
                      <span className="text-maroon group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        सविस्तर वाचा <ArrowRight size={14} />
                      </span>
                      <button
                        onClick={(e) => handleShare(post, e)}
                        className="p-1.5 hover:bg-amber-50 rounded-full text-grey hover:text-maroon transition-colors"
                        title="शेअर करा"
                      >
                        <Share2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
