// ── Static data shared across the app ──

export const articles = [
  {
    id: 1,
    title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी',
    status: 'published',
    statusLabel: 'प्रकाशित',
    category: 'पर्यटन',
    taluka: 'मालवण',
    author: 'सारिका पवार',
    updated: '१५ मि. पूर्वी',
    image: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=300&h=200&fit=crop',
    excerpt: 'सुट्टीच्या दिवसामुळे राज्याच्या विविध भागांतून तसेच गोव्यातून पर्यटक मोठ्या संख्येने आले होते...',
  },
  {
    id: 2,
    title: 'काजू प्रक्रिया उद्योगासाठी नवीन योजना जाहीर',
    status: 'review',
    statusLabel: 'रिव्ह्यूमध्ये',
    category: 'मासेमारी-शेती',
    taluka: 'वैभववाडी',
    author: 'राजेश कदम',
    updated: '१ तास पूर्वी',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=200&h=150&fit=crop',
    excerpt: 'वैभववाडी तालुक्यातील काजू प्रक्रिया उद्योगांना चालना देण्यासाठी जिल्हा प्रशासनाने नवीन अनुदान योजना जाहीर केली आहे. या योजनेअंतर्गत...',
  },
  {
    id: 3,
    title: 'ग्रामपंचायत निवडणुकीची घोषणा, उमेदवारी अर्ज सुरू',
    status: 'scheduled',
    statusLabel: 'शेड्यूल्ड',
    category: 'राजकारण',
    taluka: 'कणकवली',
    author: 'सारिका पवार',
    updated: '३ तास पूर्वी',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop',
    excerpt: '',
  },
  {
    id: 4,
    title: 'देवगडमध्ये दशावतार महोत्सवाची तयारी सुरू',
    status: 'draft',
    statusLabel: 'ड्राफ्ट',
    category: 'संस्कृती',
    taluka: 'देवगड',
    author: 'मीना जाधव',
    updated: '५ तास पूर्वी',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=200&h=150&fit=crop',
    excerpt: '',
  },
  {
    id: 5,
    title: 'वेंगुर्ला किनाऱ्यावर सांस्कृतिक कार्यक्रमाचे आयोजन',
    status: 'published',
    statusLabel: 'प्रकाशित',
    category: 'संस्कृती',
    taluka: 'वेंगुर्ला',
    author: 'मीना जाधव',
    updated: '१ दिवसापूर्वी',
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=200&h=150&fit=crop',
    excerpt: '',
  },
];

export const reviewQueue = [
  {
    id: 2,
    title: 'काजू प्रक्रिया उद्योगासाठी नवीन योजना जाहीर',
    meta: 'राजेश कदम यांनी सादर केले · मासेमारी-शेती · वैभववाडी · १ तासापूर्वी',
    excerpt: 'वैभववाडी तालुक्यातील काजू प्रक्रिया उद्योगांना चालना देण्यासाठी जिल्हा प्रशासनाने नवीन अनुदान योजना जाहीर केली आहे. या योजनेअंतर्गत...',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=200&h=150&fit=crop',
  },
  {
    id: 6,
    title: 'दोडामार्गमध्ये अवैध वृक्षतोडीविरोधात कारवाई',
    meta: 'मीना जाधव यांनी सादर केले · गुन्हे · दोडामार्ग · ३ तासांपूर्वी',
    excerpt: 'वनविभागाने दोडामार्ग तालुक्यातील एका भागात अवैध वृक्षतोड आढळल्याने संबंधितांवर कारवाई सुरू केली आहे...',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=150&fit=crop',
  },
  {
    id: 7,
    title: 'आंबा बागायतदार संघटनेची जिल्हाधिकाऱ्यांकडे मागणी',
    meta: 'राजेश कदम यांनी सादर केले · राजकारण · देवगड · ५ तासांपूर्वी',
    excerpt: 'यंदाच्या हंगामात आंब्याला योग्य भाव न मिळाल्याने बागायतदार संघटनेने जिल्हाधिकाऱ्यांची भेट घेऊन निवेदन सादर केले...',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=200&h=150&fit=crop',
  },
];

export const mediaFiles = [
  { name: 'sindhudurg-fort-01.jpg', size: '1.2 MB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=200&h=150&fit=crop' },
  { name: 'gram-panchayat-meeting.jpg', size: '890 KB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop' },
  { name: 'ganeshotsav-prep-kudal.jpg', size: '4.8 MB', type: 'photo', warn: true, warnLabel: 'कॉम्प्रेस करा — मोठी फाईल', img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200&h=150&fit=crop' },
  { name: 'machimar-sahakari-sabha.jpg', size: '1.5 MB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200&h=150&fit=crop' },
  { name: 'sawantwadi-khelani.jpg', size: '1.1 MB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&h=150&fit=crop' },
  { name: 'devgad-dashavtar.jpg', size: '2.0 MB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=200&h=150&fit=crop' },
  { name: 'vengurla-beach-event.jpg', size: '980 KB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=200&h=150&fit=crop' },
  { name: 'fishing-cooperative.jpg', size: '1.3 MB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&h=150&fit=crop' },
  { name: 'bhat-lagvad-kankavli.jpg', size: '1.7 MB', type: 'photo', warn: false, img: 'https://images.unsplash.com/photo-1595425964272-5651fbf82a3e?w=200&h=150&fit=crop' },
  { name: 'malvan-scuba-video.mp4', size: '14.2 MB', type: 'video', warn: false, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop' },
  { name: 'dasaotara-natak-clip.mp4', size: '18.9 MB', type: 'video', warn: false, img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200&h=150&fit=crop' },
];

export const users = [
  { name: 'सारिका पवार', email: 'sarika@maayboli.in', role: 'Admin', roleKey: 'admin', joined: 'जाने २०२६', status: '🟢 सक्रिय', action: 'व्यवस्थापित करा' },
  { name: 'राजेश कदम', email: 'rajesh@maayboli.in', role: 'Reporter', roleKey: 'reporter', joined: 'मार्च २०२६', status: '🟢 सक्रिय', action: 'व्यवस्थापित करा' },
  { name: 'मीना जाधव', email: 'meena@maayboli.in', role: 'Editor', roleKey: 'editor', joined: 'फेब्रु २०२६', status: '🟢 सक्रिय', action: 'व्यवस्थापित करा' },
  { name: 'विनायक साळगावकर', email: 'vinayak@maayboli.in', role: 'Reporter', roleKey: 'reporter', joined: 'जून २०२६', status: '⏳ आमंत्रण प्रलंबित', action: 'पुन्हा पाठवा' },
];

export const categories = [
  { name: 'राजकारण', count: '५६ लेख' },
  { name: 'मासेमारी-शेती', count: '३८ लेख' },
  { name: 'पर्यटन', count: '२९ लेख' },
  { name: 'संस्कृती', count: '४१ लेख' },
  { name: 'गुन्हे', count: '१२ लेख' },
  { name: 'क्रीडा', count: '१७ लेख' },
];

export const talukas = [
  { name: 'मालवण', count: '६२ लेख' },
  { name: 'कणकवली', count: '३४ लेख' },
  { name: 'कुडाळ', count: '२८ लेख' },
  { name: 'सावंतवाडी', count: '२१ लेख' },
  { name: 'वेंगुर्ला', count: '१९ लेख' },
  { name: 'देवगड', count: '२५ लेख' },
  { name: 'दोडामार्ग', count: '९ लेख' },
  { name: 'वैभववाडी', count: '११ लेख' },
];

export const activities = [
  { initials: 'SP', text: <><b>सारिका पवार</b> यांनी "सिंधुदुर्ग किल्ल्यावर गर्दी" लेख प्रकाशित केला</>, time: '१५ मिनिटांपूर्वी' },
  { initials: 'RK', text: <><b>राजेश कदम</b> यांनी "काजू उद्योग योजना" रिव्ह्यूसाठी सादर केला</>, time: '१ तासापूर्वी' },
  { initials: 'SP', text: <><b>सारिका पवार</b> यांनी "ग्रामपंचायत निवडणूक" वेळापत्रक ठरवले</>, time: '३ तासांपूर्वी' },
  { initials: 'MJ', text: <><b>मीना जाधव</b> यांनी नवीन फोटो गॅलरी अपलोड केली — देवगड महोत्सव</>, time: '५ तासांपूर्वी' },
];

export const galleryItems = [
  { img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=400&h=280&fit=crop', title: 'सिंधुदुर्ग किल्ल्यावर गर्दी', meta: 'मालवण · १८ जुलै', isVideo: false },
  { img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=520&fit=crop', title: 'दशावतार सादरीकरण — व्हिडिओ', meta: 'देवगड · १७ जुलै', isVideo: true },
  { img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=340&fit=crop', title: 'लाकडी खेळणी कारागीर', meta: 'सावंतवाडी · १६ जुलै', isVideo: false },
  { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=260&fit=crop', title: 'मालवणी खाद्यमहोत्सव', meta: 'मालवण · १५ जुलै', isVideo: false },
  { img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=460&fit=crop', title: 'वेंगुर्ला सांस्कृतिक कार्यक्रम', meta: 'वेंगुर्ला · १४ जुलै', isVideo: false },
  { img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&h=300&fit=crop', title: 'मच्छिमार सभा — व्हिडिओ', meta: 'मालवण · १३ जुलै', isVideo: true },
  { img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=380&fit=crop', title: 'देवगड आंबा बाग', meta: 'देवगड · १२ जुलै', isVideo: false },
  { img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', title: 'ग्रामपंचायत सभा', meta: 'कणकवली · ११ जुलै', isVideo: false },
];

export const albums = [
  { img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200&h=140&fit=crop', label: 'देवगड दशावतार महोत्सव' },
  { img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=200&h=140&fit=crop', label: 'सिंधुदुर्ग किल्ला' },
  { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=140&fit=crop', label: 'मालवणी खाद्यमहोत्सव' },
  { img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=200&h=140&fit=crop', label: 'वेंगुर्ला किनारा' },
  { img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200&h=140&fit=crop', label: 'मच्छिमार सहकारी सभा' },
];

export const chatMessages = [
  { role: 'bot', text: 'नमस्कार! मी तुम्हाला सिंधुदुर्ग व कोकण परिसरातल्या ताज्या बातम्यांबद्दल मदत करू शकतो. काय जाणून घ्यायचं आहे?' },
  { role: 'user', text: 'मालवण तालुक्यात आज काय चाल्ला हा?' },
  { role: 'bot', text: 'आज मालवण तालुक्यात सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी झाल्याची बातमी आहे — जवळपास ३,००० पर्यटक आले. तसंच मालवण बंदरात नवीन मासळी लिलाव केंद्रही सुरू झालं आहे.', source: '📰 सिंधुदुर्ग किल्ल्यावर पर्यटकांची गर्दी' },
  { role: 'user', text: 'राजापूर तालुक्यातली बातमी सांग' },
  { role: 'bot', text: 'माफ करा, राजापूर तालुक्याबद्दल सध्या माझ्याकडे प्रकाशित बातमी उपलब्ध नाही. मी फक्त सिंधुदुर्ग जिल्ह्यातल्या तालुक्यांची बातमी देऊ शकतो — मालवण, कणकवली, कुडाळ, सावंतवाडी, वेंगुर्ला, देवगड, दोडामार्ग, वैभववाडी.' },
];

export const listingArticles = [
  { img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=300&h=200&fit=crop', tag: 'पर्यटन · मालवण', taluka: 'मालवण', categoryKey: 'paryatan', title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी, स्थानिक व्यावसायिकांना दिलासा', excerpt: 'सुट्टीच्या दिवसामुळे राज्याच्या विविध भागांतून तसेच गोव्यातून पर्यटक मोठ्या संख्येने आले होते...', meta: '२ तासांपूर्वी · सारिका पवार' },
  { img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=300&h=200&fit=crop', tag: 'पर्यटन · वेंगुर्ला', taluka: 'वेंगुर्ला', categoryKey: 'paryatan', title: 'वेंगुर्ला किनाऱ्यावर नवीन वॉटर-स्पोर्ट्स केंद्र सुरू', excerpt: 'पर्यटकांसाठी जेट-स्कीइंग, बनाना-बोट यांसारख्या सुविधा आता वेंगुर्ला किनाऱ्यावर उपलब्ध...', meta: '१ दिवसापूर्वी · मीना जाधव' },
  { img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop', tag: 'संस्कृती · सावंतवाडी', taluka: 'सावंतवाडी', categoryKey: 'sanskriti', title: 'सावंतवाडी संस्थानाच्या राजवाड्यात हेरिटेज वॉक सुरू', excerpt: 'इतिहासप्रेमी पर्यटकांसाठी दर शनिवारी मार्गदर्शित फेरीचे आयोजन करण्यात येणार आहे...', meta: '२ दिवसांपूर्वी · राजेश कदम' },
  { img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop', tag: 'मासेमारी-शेती · देवगड', taluka: 'देवगड', categoryKey: 'maasemari', title: 'देवगड दीपस्तंभ परिसर पर्यटकांसाठी पुन्हा खुला', excerpt: 'दुरुस्तीच्या कामानंतर देवगड दीपस्तंभ परिसर पर्यटकांसाठी पुन्हा एकदा खुला करण्यात आला आहे...', meta: '३ दिवसांपूर्वी · सारिका पवार' },
  { img: 'https://images.unsplash.com/photo-1595425964272-5651fbf82a3e?w=300&h=200&fit=crop', tag: 'राजकारण · कणकवली', taluka: 'कणकवली', categoryKey: 'rajkaran', title: 'कणकवलीत भव्य पर्यटन महोत्सवाचे आयोजन', excerpt: 'कणकवली शहरात पुढील आठवड्यापासून पाच दिवसीय कोकण पर्यटन महोत्सवाचे आयोजन केले आहे...', meta: '४ दिवसांपूर्वी · मीना जाधव' },
  { img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop', tag: 'क्रीडा · कुडाळ', taluka: 'कुडाळ', categoryKey: 'krida', title: 'कुडाळ तालुक्यातील ऐतिहासिक वास्तूंचे पुनरुज्जीवन करणार', excerpt: 'पर्यटनाला चालना देण्यासाठी कुडाळातील जुन्या ऐतिहासिक मंदिरांचे आणि वास्तूंचे काम हाती घेण्यात येणार...', meta: '५ दिवसांपूर्वी · राजेश कदम' }
];

export const searchResults = [
  { tag: 'पर्यटन · मालवण', title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी, स्थानिक व्यावसायिकांना दिलासा', excerpt: 'आज सकाळपासून सिंधुदुर्ग किल्ल्यावर पर्यटकांची मोठी गर्दी दिसान इली. सुट्टीच्या दिवसामुळे...', meta: '२ तासांपूर्वी · सारिका पवार', highlight: 'सिंधुदुर्ग किल्ल्या' },
  { tag: 'इतिहास · मालवण', title: 'छत्रपती शिवाजी महाराजांनी बांधलेल्या सिंधुदुर्ग किल्ल्याचा इतिहास', excerpt: '१६६४ साली बांधलेला हा जलदुर्ग आजही आपल्या मजबूत बांधकामासाठी ओळखला जातो...', meta: '२ आठवड्यांपूर्वी · राजेश कदम', highlight: 'सिंधुदुर्ग किल्ल्या' },
  { tag: 'पर्यटन · मालवण', title: 'मालवण बंदरातून सिंधुदुर्ग किल्ल्याकडे जाणाऱ्या बोटींचे नवीन वेळापत्रक', excerpt: 'पर्यटकांच्या सोयीसाठी बोट फेऱ्यांची संख्या वाढवण्यात आली असून नवीन वेळापत्रक जाहीर...', meta: '१ महिन्यापूर्वी · मीना जाधव', highlight: 'सिंधुदुर्ग किल्ल्या' },
];
