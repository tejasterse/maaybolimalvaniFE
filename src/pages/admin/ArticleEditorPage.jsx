import { useState, useEffect } from 'react';
import ToggleSwitch from '../../components/admin/ToggleSwitch.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createPost, updatePost } from '../../api/posts.js';
import { fetchCategories } from '../../api/categories.js';
import { fetchDistricts } from '../../api/districts.js';
import { fetchReporters } from '../../api/users.js';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Globe, ArrowRight, Video } from 'lucide-react';

import { getMediaUrl } from '../../utils/media.js';
import { cleanText } from '../../utils/seo.js';
import toast from 'react-hot-toast';

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const talukaOptions = ['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'वैभववाडी', 'दोडामार्ग'];

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

export default function ArticleEditorPage({ onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article || null;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/admin/articles');
    }
  };

  const [title, setTitle] = useState(article?.title || '');
  const [body, setBody] = useState(article?.content || article?.excerpt || '');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [existingVideo, setExistingVideo] = useState(false);
  const [selectedTaluka, setSelectedTaluka] = useState(article?.taluka || article?.districtName || 'मालवण');
  const [category, setCategory] = useState(article?.category || article?.categoryName || 'पर्यटन');
  const [pubDate, setPubDate] = useState(article?.createdAt ? new Date(article.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const [author, setAuthor] = useState(article?.author || article?.authorName || 'सारिका पवार');
  const [reporterName, setReporterName] = useState(article?.reporter_name || article?.reporterName || '');
  const [youtubeUrl, setYoutubeUrl] = useState(article?.video_url || '');
  const [breakingOn, setBreakingOn] = useState(article?.is_breaking ? true : false);
  const [featureOn, setFeatureOn] = useState(false);
  const [originalText, setOriginalText] = useState(article?.excerpt || '');
  const [aiDraft, setAiDraft] = useState('');

  // SEO State
  const [seoTitle, setSeoTitle] = useState(article?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(article?.seo_description || '');
  const [seoKeywords, setSeoKeywords] = useState(article?.seo_keywords || '');
  const [customSlug, setCustomSlug] = useState(article?.slug || '');

  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setBody(article.content || '');
      setBreakingOn(Boolean(article.is_breaking));
      setFeatureOn(Boolean(article.is_featured));
      setReporterName(article.reporter_name || article.reporterName || '');
      setYoutubeUrl(article.video_url || '');
      setCategory(article.categoryName || article.category || '');
      setSelectedTaluka(article.districtName || article.taluka || '');
      setSeoTitle(article.seo_title || '');
      setSeoDescription(article.seo_description || '');
      setSeoKeywords(article.seo_keywords || '');
      setCustomSlug(article.slug || '');
      if (article.createdAt) {
        setPubDate(new Date(article.createdAt).toISOString().split('T')[0]);
      }
      if (article.image_type || article.image) {
        setExistingImage(getMediaUrl(article.image || `/posts/${article.id}/image`));
      }
      if (article.video_type || article.video_url) {
        setExistingVideo(true);
      }
    }
  }, [article]);

  const { data: categoriesData = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: districtsData = [] } = useQuery({ queryKey: ['districts'], queryFn: fetchDistricts });
  const { data: reportersData = [] } = useQuery({ queryKey: ['reporters'], queryFn: fetchReporters });

  const defaultReporters = [
    { id: 'rep1', name: 'मेघेश मोंडकर (Meghesh Mondkar)' },
    { id: 'rep2', name: 'रत्नाकर प्रभु (Ratnakar Prabhu)' },
    { id: 'rep3', name: 'मनोज घाटकर (Manoj Ghatkar)' },
    { id: 'rep4', name: 'निलेश पाटील (Nilesh Patil)' },
    { id: 'rep5', name: 'संतोष मुळीक' },
    { id: 'rep6', name: 'राजू तावडे' },
    { id: 'rep7', name: 'संदीप मुळीक' },
    { id: 'rep8', name: 'ऋतीका पालकर' },
    { id: 'rep9', name: 'दादा मडकईकर' }
  ];

  const availableReporters = (reportersData && reportersData.length > 0) ? reportersData : defaultReporters;

  const saveMutation = useMutation({
    mutationFn: (formData) => article ? updatePost({ id: article.id, formData }) : createPost(formData),
    onSuccess: () => {
      toast.success(article ? 'लेख यशस्वीरित्या अपडेट केला गेला आहे!' : 'लेख यशस्वीरित्या प्रकाशित केला गेला आहे!');
      handleBack();
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error('सत्र कालबाह्य झाले आहे. कृपया पुन्हा लॉग इन करा.');
      } else {
        toast.error('लेख जतन करताना त्रुटी: ' + (err.response?.data?.message || err.message));
      }
    }
  });

  const compressImage = (file) => {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) return resolve(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const scale = Math.min(1, MAX_WIDTH / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) return resolve(file);
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          }, 'image/jpeg', 0.8);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handlePublish = async (status) => {
    const cat = categoriesData.find(c => 
      c.name === category || 
      c.id === category || 
      (category === 'Politics' && c.name === 'राजकारण') ||
      (category === 'Tourism' && c.name === 'पर्यटन') ||
      (category === 'Fishing-farming' && c.name === 'मासेमारी-शेती') ||
      (category === 'Culture' && c.name === 'संस्कृती') ||
      (category === 'Sports' && (c.name === 'क्रीडा' || c.name === 'खेळ')) ||
      (category === 'Other' && (c.name === 'इतर बातमे' || c.name === 'इतर बातम्या' || c.name === 'इतर')) ||
      (category === 'Crimes' && c.name === 'गुन्हे')
    );
    const dist = districtsData.find(d => d.name === selectedTaluka || d.id === selectedTaluka);

    const cleanTitleStr = cleanText(title);
    const cleanBodyStr = body ? body.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ') : '';
    const cleanReporterStr = cleanText(reporterName);
    const cleanSeoTitleStr = cleanText(seoTitle);
    const cleanSeoDescStr = cleanText(seoDescription);
    const cleanSeoKeyStr = cleanText(seoKeywords);

    const formData = new FormData();
    formData.append('title', cleanTitleStr);
    formData.append('content', cleanBodyStr);
    formData.append('category_id', cat ? cat.id : (article?.category_id || 1));
    if (dist) formData.append('district_id', dist.id);
    formData.append('is_breaking', breakingOn ? 1 : 0);
    formData.append('is_featured', featureOn ? 1 : 0);
    formData.append('reporter_name', cleanReporterStr || '');
    if (pubDate) formData.append('createdAt', pubDate);
    formData.append('status', status);

    formData.append('video_url', youtubeUrl || '');
    formData.append('seo_title', cleanSeoTitleStr || '');
    formData.append('seo_description', cleanSeoDescStr || '');
    formData.append('seo_keywords', cleanSeoKeyStr || '');
    formData.append('slug', customSlug || '');

    if (imageFile) {
      const optimizedImage = await compressImage(imageFile);
      formData.append('image', optimizedImage);
    }
    if (videoFile) {
      formData.append('video', videoFile);
    }

    saveMutation.mutate(formData);
  };

  const handleInsert = () => {
    if (aiDraft.trim() && aiDraft !== "भाषांतर होत आहे...") {
      setBody((prev) => prev + '\n\n' + aiDraft);
    }
  };

  const handleRegenerate = () => {
    if (originalText.trim()) {
      setAiDraft("भाषांतर होत आहे...");
      setTimeout(() => {
        let translated = originalText
          .replace(/दिसून आली/g, 'दिसान इली')
          .replace(/गर्दी होती/g, 'गर्दी हुती')
          .replace(/आले होते/g, 'इले हुते')
          .replace(/चालला आहे/g, 'चाल्ला हा')
          .replace(/आहे/g, 'हाय');
        setAiDraft(translated);
      }, 700);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Topbar Action Header */}
      <div
        className="flex flex-wrap items-center justify-between px-6 py-4 text-white rounded-xl mb-5 shadow-sm gap-4"
        style={{ background: 'var(--navy)' }}
      >
        <div className="flex items-center gap-3.5">
          <span
            onClick={handleBack}
            className="font-poppins text-[13px] text-gold-light cursor-pointer flex items-center gap-1 hover:underline"
          >
            <ArrowLeft size={16} /> लेखांकडे परत
          </span>
          <span className="font-tiro text-[16px] text-white font-medium border-l border-white/20 pl-3.5">मायबोली मालवणी लेख संपादक</span>
        </div>
        <div className="font-poppins text-[11.5px] hidden sm:flex items-center" style={{ color: '#9fb0c2' }}>
          <span
            className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ background: '#4CAF7D' }}
          />
          स्वयं-जतन झाले · २ मिनिटांपूर्वी
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => handlePublish('DRAFT')}
            disabled={saveMutation.isPending}
            className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] bg-transparent border border-white/25 transition-colors hover:bg-white/10 disabled:opacity-50"
            style={{ color: '#d9c9a8' }}
          >
            ड्राफ्ट जतन करा
          </button>
          <button
            onClick={() => handlePublish('PENDING_REVIEW')}
            disabled={saveMutation.isPending}
            className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] text-white transition-colors hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--teal)' }}
          >
            रिव्ह्यूसाठी सादर करा
          </button>
          <button
            onClick={() => handlePublish('PUBLISHED')}
            disabled={saveMutation.isPending}
            className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] transition-colors hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
          >
            {saveMutation.isPending ? 'प्रतीक्षा करा...' : (article ? 'अपडेट करा' : 'प्रकाशित करा')}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
        {/* Editor Column */}
        <div>
          <div className="bg-white rounded-[10px] p-6 shadow-sm">
            {/* Title */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="लेखाचे शीर्षक टाइप करा…"
              className="w-full font-tiro text-[26px] text-ink outline-none pb-3.5 mb-4"
              style={{
                border: 'none',
                borderBottom: '1px solid var(--line)',
                background: 'transparent',
              }}
            />

            {/* Body - React Quill */}
            <div className="quill-editor-container">
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                modules={quillModules}
                placeholder="मालवणी भाषेत लेख इथे लिहा…"
                className="w-full font-mukta text-[17px] text-ink"
                style={{ minHeight: 340 }}
              />
            </div>

            <style>{`
              .quill-editor-container .ql-editor {
                min-height: 300px;
                font-size: 17px;
                font-family: inherit;
                line-height: 1.9;
              }
              .quill-editor-container .ql-toolbar {
                border-top: none;
                border-left: none;
                border-right: none;
                border-bottom: 1px solid var(--line);
                margin-bottom: 15px;
                padding-left: 0;
                padding-right: 0;
              }
              .quill-editor-container .ql-container {
                border: none;
              }
            `}</style>
          </div>

          {/* Media Uploads */}
          <div className="bg-white rounded-[10px] p-5 shadow-sm border border-line mt-5">
            <h2 className="font-poppins font-semibold text-[14.5px] text-ink mb-4">फीचर्ड इमेज आणि व्हिडिओ (Featured Image & Video)</h2>

            <div className="mb-4">
              <label className="block font-poppins text-[12.5px] font-medium text-grey mb-1.5">फोटो (पर्यायी)</label>
              <div className="border-2 border-dashed border-line rounded-[8px] p-5 text-center bg-[#fafafa]">
                {existingImage && !imageFile && (
                  <div className="mb-3">
                    <img src={existingImage} alt="Current" className="max-h-[150px] mx-auto rounded-[6px]" />
                  </div>
                )}
                {imageFile && (
                  <div className="mb-3 font-poppins text-sm text-teal">
                    नवीन फोटो निवडला: {imageFile.name}
                  </div>
                )}
                <div className="font-poppins text-[12px] text-grey mb-2.5">किमान 1200x630px चा फोटो अपलोड करा</div>
                <input
                  type="file"
                  id="featured-image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <label
                  htmlFor="featured-image"
                  className="inline-block font-poppins text-[12px] font-medium px-4 py-2 rounded-[6px] border border-line bg-white cursor-pointer hover:bg-grey-light transition-colors"
                >
                  इमेज निवडा
                </label>
              </div>
            </div>

            <div>
              <label className="block font-poppins text-[12.5px] font-medium text-grey mb-1.5">व्हिडिओ (पर्यायी - कमाल 50MB)</label>
              <div className="border-2 border-dashed border-line rounded-[8px] p-5 text-center bg-[#fafafa]">
                {existingVideo && !videoFile && article && (
                  <div className="mb-3">
                    <video
                      src={getMediaUrl(`/posts/${article.id}/video`)}
                      controls
                      className="max-h-[220px] w-full max-w-[440px] mx-auto rounded-[8px] bg-black mb-2 shadow-sm"
                    />
                    <div className="font-poppins text-[12px] text-teal flex items-center justify-center gap-1 font-medium">
                      <CheckCircle size={14} /> पूर्वी अपलोड केलेला व्हिडिओ उपलब्ध आहे
                    </div>
                  </div>
                )}
                {videoFile && (
                  <div className="mb-3">
                    <video
                      src={URL.createObjectURL(videoFile)}
                      controls
                      className="max-h-[220px] w-full max-w-[440px] mx-auto rounded-[8px] bg-black mb-2 shadow-sm"
                    />
                    <div className="font-poppins text-[12px] text-teal font-medium">
                      नवीन व्हिडिओ पूर्वदृश्य (Preview): {videoFile.name}
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id="featured-video"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-matroska"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
                <label
                  htmlFor="featured-video"
                  className="inline-block font-poppins text-[12px] font-medium px-4 py-2 rounded-[6px] border border-line bg-white cursor-pointer hover:bg-grey-light transition-colors"
                >
                  व्हिडिओ निवडा
                </label>
              </div>
            </div>

            {/* YouTube Video Link Field */}
            <div className="mt-4 pt-4 border-t border-line">
              <label className="block font-poppins text-[13px] font-bold text-red-600 mb-1.5 flex items-center gap-1.5">
                <Video size={16} className="text-red-600" /> युट्यूब व्हिडिओ लिंक (YouTube Video URL)
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="उदा. https://www.youtube.com/watch?v=... किंवा https://youtu.be/..."
                className="w-full border-2 border-red-200 rounded-[8px] px-3.5 py-2.5 font-poppins text-sm outline-none focus:border-red-500 bg-red-50/20 transition-colors"
              />
              {getYouTubeId(youtubeUrl) && (
                <div className="mt-3 bg-black rounded-xl overflow-hidden aspect-video max-w-[440px] mx-auto border border-red-300 shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(youtubeUrl)}`}
                    title="YouTube Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              )}
            </div>
          </div>

          {/* AI Translation Assist commented out
          <div
            className="rounded-[10px] p-5 mt-5 border-[1.5px] border-gold"
            style={{ background: 'linear-gradient(180deg,#FBF3E3 0%, #F6ECD6 100%)' }}
          >
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-poppins text-[13.5px] font-bold text-maroon-deep flex items-center gap-2">
                <Globe size={16} className="inline mr-1" /> AI भाषांतर सहाय्य
                <span
                  className="font-poppins text-[9.5px] px-2 py-0.5 rounded-[10px] font-bold"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                >
                  BETA
                </span>
              </h3>
            </div>
            <p className="font-poppins text-[11.5px] mb-4 leading-relaxed" style={{ color: '#8a7a5e' }}>
              मराठी किंवा इंग्रजीतील मजकूर डावीकडे टाका — AI मालवणी ड्राफ्ट उजवीकडे तयार करेल. संपादकाने तपासून व दुरुस्त करूनच तो लेखात समाविष्ट होईल — AI आपोआप काहीही बदलत नाही.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white rounded-lg p-3.5">
                <div className="font-poppins text-[10px] font-bold uppercase tracking-[.06em] text-teal mb-2">
                  मूळ मजकूर (मराठी/इंग्रजी)
                </div>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="इथे मूळ मजकूर पेस्ट करा…"
                  className="w-full border border-line rounded-[6px] px-2.5 py-2.5 font-mukta text-sm leading-relaxed resize-y outline-none"
                  style={{ minHeight: 110 }}
                />
              </div>
              <div className="bg-white rounded-lg p-3.5 border-[1.5px] border-dashed border-gold">
                <div className="font-poppins text-[10px] font-bold uppercase tracking-[.06em] text-teal mb-2">
                  AI मालवणी ड्राफ्ट
                </div>
                <textarea
                  value={aiDraft}
                  onChange={(e) => setAiDraft(e.target.value)}
                  placeholder="AI ड्राफ्ट इथे दिसेल…"
                  className="w-full border border-line rounded-[6px] px-2.5 py-2.5 font-mukta text-sm leading-relaxed resize-y outline-none"
                  style={{ minHeight: 110 }}
                />
                <div className="flex items-center gap-2 mt-2.5 font-poppins text-[11px] text-grey">
                  विश्वासार्हता
                  <div className="flex-1 h-[5px] rounded-[3px] overflow-hidden" style={{ background: 'var(--line)' }}>
                    <div className="w-[78%] h-full" style={{ background: 'var(--amber)' }} />
                  </div>
                  मध्यम — कृपया तपासा
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2.5 mt-3.5">
              <button
                onClick={handleRegenerate}
                className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] bg-white text-teal border-[1.5px] border-line transition-colors hover:bg-[#F6F1E6]"
              >
                पुन्हा तयार करा
              </button>
              <button
                onClick={handleInsert}
                className="font-poppins font-semibold text-[12.5px] px-4 py-2 rounded-[7px] transition-colors hover:opacity-90"
                style={{ background: 'var(--maroon-deep)', color: '#fbe8c9' }}
              >
                लेखात समाविष्ट करा <ArrowRight size={14} className="inline ml-1" />
              </button>
            </div>
          </div>
          */}
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-4 self-start">
          {/* Publication Details */}
          <div className="bg-white rounded-[10px] p-4 shadow-sm">
            <h4 className="font-poppins text-[12px] font-bold uppercase tracking-[.06em] text-grey mb-3.5">
              प्रकाशन तपशील
            </h4>
            <div className="mb-3.5">
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">विभाग</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 border border-line rounded-[6px] font-poppins text-[13px] text-ink bg-white cursor-pointer"
              >
                {categoriesData.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3.5">
              <label className="block font-poppins text-[11.5px] font-bold text-grey mb-1.5">जिल्हा / प्रादेशिक विभाग</label>
              {/* Region Categories: कोंकण, महाराष्ट्र, देश */}
              <div className="flex items-center gap-1.5 mb-2.5">
                {['कोंकण', 'महाराष्ट्र', 'देश'].map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => {
                      if (reg !== 'कोंकण') {
                        setSelectedTaluka(reg);
                      } else if (!['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'दोडामार्ग', 'वैभववाडी'].includes(selectedTaluka)) {
                        setSelectedTaluka('मालवण');
                      }
                    }}
                    className={`font-poppins text-[11.5px] px-3 py-1 rounded-[14px] cursor-pointer transition-colors font-bold ${
                      (reg === 'कोंकण' && ['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'दोडामार्ग', 'वैभववाडी', 'कोंकण'].includes(selectedTaluka)) || selectedTaluka === reg
                        ? 'bg-maroon text-gold-light shadow-xs'
                        : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              {/* Sub-categories shown when Konkan is selected */}
              {(['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'दोडामार्ग', 'वैभववाडी', 'कोंकण'].includes(selectedTaluka) || !selectedTaluka) && (
                <div>
                  <div className="font-poppins text-[10.5px] text-grey mb-1 font-semibold">कोंकण sub-categories:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['मालवण', 'कणकवली', 'कुडाळ', 'सावंतवाडी', 'वेंगुर्ला', 'देवगड', 'दोडामार्ग', 'वैभववाडी'].map((t) => (
                      <span
                        key={t}
                        onClick={() => setSelectedTaluka(t)}
                        className="font-poppins text-[11.5px] px-2.5 py-1 rounded-[14px] cursor-pointer transition-colors"
                        style={
                          selectedTaluka === t
                            ? { background: 'var(--teal)', color: '#fff', fontWeight: '600' }
                            : { background: '#F6F1E6', color: 'var(--teal)' }
                        }
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3.5">
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">प्रकाशन तारीख</label>
              <input
                type="date"
                value={pubDate}
                onChange={(e) => setPubDate(e.target.value)}
                className="w-full px-2.5 py-2 border border-line rounded-[6px] font-poppins text-[13px] text-ink bg-white"
              />
            </div>
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <span className="font-poppins text-[13px] text-ink font-medium">ताजी फडफडीत बातमी</span>
              <ToggleSwitch on={breakingOn} onToggle={() => setBreakingOn(!breakingOn)} />
            </div>
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <span className="font-poppins text-[13px] text-ink">होमपेजवर फीचर करा</span>
              <ToggleSwitch on={featureOn} onToggle={() => setFeatureOn(!featureOn)} />
            </div>
          </div>



          {/* Reporter Name Dropdown */}
          <div className="bg-white rounded-[10px] p-4 shadow-sm">
            <h4 className="font-poppins text-[12px] font-bold uppercase tracking-[.06em] text-grey mb-3.5">
              प्रतिनिधी / रिपोर्टर (Reporter)
            </h4>
            <div>
              <label className="block font-poppins text-[11.5px] text-grey mb-1.5">रिपोर्टर निवडा (User तक्त्यातून)</label>
              <select
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full px-2.5 py-2 border border-line rounded-[6px] font-poppins text-[13px] text-ink bg-white cursor-pointer outline-none focus:border-teal"
              >
                <option value="">-- रिपोर्टर निवडा --</option>
                {availableReporters.map((rep, idx) => (
                  <option key={rep.id || idx} value={rep.name}>
                    {rep.name}
                  </option>
                ))}
              </select>
              <p className="font-poppins text-[10.5px] text-grey mt-1.5">User तक्त्यातील 'REPORTER' रोल असलेले वापरकर्ते येथे उपलब्ध आहेत.</p>
            </div>
          </div>

          {/* SEO Management & Live Previews */}
          <div className="bg-white rounded-[10px] p-5 shadow-sm border border-gold/40">
            <h4 className="font-poppins text-[13px] font-bold uppercase tracking-[.06em] text-maroon mb-4 flex items-center gap-1.5 border-b pb-2">
              <Globe size={16} className="text-gold-dark" /> SEO आणि सोशल मीडिया ऑप्टिमायझेशन
            </h4>

            {/* Health Check Warnings */}
            {(!imageFile && !existingImage) && (
              <div className="mb-3 p-2.5 bg-amber-50 border border-gold/40 rounded-md text-xs text-maroon-deep font-poppins">
                ⚠️ बातमीचा फोटो अपलोड केलेला नाही. (Google Discover साठी मुख्य फोटो महत्त्वाचा आहे.)
              </div>
            )}
            {(!seoDescription && !body) && (
              <div className="mb-3 p-2.5 bg-amber-50 border border-gold/40 rounded-md text-xs text-maroon-deep font-poppins">
                ⚠️ SEO डिस्क्रिप्शन मोकळे आहे.
              </div>
            )}

            {/* Custom SEO Title */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="font-poppins text-[11.5px] font-semibold text-grey">SEO शीर्षक (Meta Title)</label>
                <span className={`text-[10.5px] font-poppins font-semibold ${(seoTitle || title).length > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {(seoTitle || title).length} / 60 अक्षरे
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title || 'गूगल सर्चसाठी सानुकूल शीर्षक लिहा'}
                className="w-full px-3 py-2 border border-line rounded-md text-xs font-poppins text-ink focus:border-teal outline-none"
              />
            </div>

            {/* Custom Meta Description */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="font-poppins text-[11.5px] font-semibold text-grey">SEO डिस्क्रिप्शन (Meta Description)</label>
                <span className={`text-[10.5px] font-poppins font-semibold ${seoDescription.length > 160 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {seoDescription.length} / 160 अक्षरे
                </span>
              </div>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="बातमीचा मुख्य सारांश लिहा जो गूगल आणि व्हॉट्सॲपवर दिसेल..."
                rows={3}
                className="w-full px-3 py-2 border border-line rounded-md text-xs font-poppins text-ink focus:border-teal outline-none resize-none"
              />
            </div>

            {/* Custom URL Slug */}
            <div className="mb-4">
              <label className="block font-poppins text-[11.5px] font-semibold text-grey mb-1">सानुकूल URL स्लग (Custom Slug)</label>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="उदा. sindhudurg-malvan-rain-news"
                className="w-full px-3 py-2 border border-line rounded-md text-xs font-poppins text-ink focus:border-teal outline-none"
              />
            </div>

            {/* SEO Keywords */}
            <div className="mb-5">
              <label className="block font-poppins text-[11.5px] font-semibold text-grey mb-1">SEO कीवर्ड्स (अल्पविरामाने वेगळे करा)</label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="सिंधुदुर्ग बातम्या, मालवण ताज्या घडामोडी, कोकण न्यूज"
                className="w-full px-3 py-2 border border-line rounded-md text-xs font-poppins text-ink focus:border-teal outline-none"
              />
            </div>

            {/* Google Search Live Preview */}
            <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="block text-[10.5px] font-poppins font-bold uppercase text-slate-500 mb-2">Google सर्च पूर्वावलोकन (Preview)</span>
              <div className="text-xs font-poppins">
                <div className="text-[11px] text-slate-600 truncate mb-0.5">https://maaybolimalvani.com › news › {customSlug || 'article-url'}</div>
                <div className="text-sm font-semibold text-blue-800 line-clamp-1 hover:underline cursor-pointer">{seoTitle || title || 'बातमीचे शीर्षक'} | मायबोली मालवणी</div>
                <div className="text-xs text-slate-600 line-clamp-2 mt-0.5">{seoDescription || (body ? body.replace(/<[^>]*>/g, '').substring(0, 150) : 'बातमीचा सारांश गूगुल शोध परिणामांमध्ये असा दिसेल.')}</div>
              </div>
            </div>

            {/* Social Share Live Preview */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="block text-[10.5px] font-poppins font-bold uppercase text-slate-500 mb-2">व्हॉट्सॲप / फेसबूक कार्ड पूर्वावलोकन</span>
              <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-xs">
                {(existingImage || imageFile) ? (
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : existingImage}
                    alt="Social Preview"
                    className="w-full h-36 object-cover"
                  />
                ) : (
                  <div className="w-full h-36 bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-poppins">फोटो उपलब्ध नाही</div>
                )}
                <div className="p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-poppins">MAAYBOLIMALVANI.COM</div>
                  <div className="font-tiro text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">{seoTitle || title || 'बातमीचे शीर्षक'}</div>
                  <div className="text-xs text-slate-600 line-clamp-2 mt-1">{seoDescription || (body ? body.replace(/<[^>]*>/g, '').substring(0, 100) : 'बातमीचा सारांश')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
