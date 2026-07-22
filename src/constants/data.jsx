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
  // 1. राजकारण (Politics)
  { id: 101, img: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=300&h=200&fit=crop', tag: 'राजकारण · कणकवली', taluka: 'कणकवली', categoryKey: 'rajkaran', title: 'ग्रामपंचायत निवडणुकीची अधिकृत घोषणा, उमेदवारी अर्ज भरण्यास सुरुवात', excerpt: 'कणकवली तालुक्यातील २४ ग्रामपंचायतींसाठी निवडणूक कार्यक्रम जाहीर झाला असून राजकीय वातावरण तापायला सुरुवात झाली आहे...', meta: '२ तासांपूर्वी · सारिका पवार' },
  { id: 102, img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&h=200&fit=crop', tag: 'राजकारण · सावंतवाडी', taluka: 'सावंतवाडी', categoryKey: 'rajkaran', title: 'सावंतवाडी नगरपरिषदेची विशेष सर्वसाधारण सभा, विकासकामांना मंजुरी', excerpt: 'नगरपरिषद सभागृहात पार पडलेल्या बैठकीत शहरातील रस्ते आणि गटार विकासकामांसाठी कोटींचा निधी मंजूर झाला...', meta: '५ तासांपूर्वी · राजेश कदम' },
  { id: 103, img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=300&h=200&fit=crop', tag: 'राजकारण · मालवण', taluka: 'मालवण', categoryKey: 'rajkaran', title: 'मालवण नगरपरिषदेत पाणीपुरवठा योजनेवरून सत्ताधारी आणि विरोधकांत जुंपली', excerpt: 'ऐन उन्हाळ्यात पाणी टंचाई तीव्र झाल्याने विरोधकांनी मुख्याधिकाऱ्यांच्या दालनात निदर्शने केली...', meta: '१ दिवसापूर्वी · मीना जाधव' },
  { id: 104, img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=300&h=200&fit=crop', tag: 'राजकारण · कुडाळ', taluka: 'कुडाळ', categoryKey: 'rajkaran', title: 'जिल्हा परिषद सदस्यांचा विकास कामांसाठी वाढीव निधीची मागणी', excerpt: 'कुडाळ तालुक्यातील ग्रामीण रस्त्यांच्या दुरुस्तीसाठी जिल्हा नियोजन समितीकडे विशेष निधीची मागणी करण्यात आली आहे...', meta: '२ दिवसांपूर्वी · सारिका पवार' },

  // 2. मासेमारी-शेती (Fisheries & Agriculture)
  { id: 201, img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=300&h=200&fit=crop', tag: 'मासेमारी-शेती · वैभववाडी', taluka: 'वैभववाडी', categoryKey: 'maasemari', title: 'काजू प्रक्रिया उद्योगासाठी नवीन अनुदान योजना जाहीर', excerpt: 'वैभववाडी तालुक्यातील काजू प्रक्रिया उद्योगांना चालना देण्यासाठी जिल्हा प्रशासनाने ५० टक्के अनुदानाची नवीन योजना आणली आहे...', meta: '१ तासापूर्वी · राजेश कदम' },
  { id: 202, img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300&h=200&fit=crop', tag: 'मासेमारी-शेती · मालवण', taluka: 'मालवण', categoryKey: 'maasemari', title: 'मालवण बंदरात नवीन हाय-टेक मासळी लिलाव गृह कार्यान्वित', excerpt: 'मच्छिमारांना थेट योग्य भाव मिळण्यासाठी आधुनिक लिलाव केंद्र उभारले असून शीतगृहाची सोय करण्यात आली आहे...', meta: '४ तासांपूर्वी · सारिका पवार' },
  { id: 203, img: 'https://images.unsplash.com/photo-1595425964272-5651fbf82a3e?w=300&h=200&fit=crop', tag: 'मासेमारी-शेती · देवगड', taluka: 'देवगड', categoryKey: 'maasemari', title: 'देवगड हापूस आंब्याला भौगोलिक मानांकन (GI Tag) क्यूआर कोड प्रणाली लागू', excerpt: 'बनावट हापूस विकणाऱ्यांवर चाप बसवण्यासाठी प्रत्येक देवगड आंब्याच्या पेटीवर आता क्यूआर कोड असणार आहे...', meta: '१ दिवसापूर्वी · मीना जाधव' },
  { id: 204, img: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop', tag: 'मासेमारी-शेती · वेंगुर्ला', taluka: 'वेंगुर्ला', categoryKey: 'maasemari', title: 'वेंगुर्ला येथील प्रादेशिक फळ संशोधन केंद्रात आंबा बागायतदार परिषद', excerpt: 'कीड नियंत्रण आणि आधुनिक छाटणी पद्धतींवर तज्ज्ञांनी बागायतदारांना मार्गदर्शन केले...', meta: '३ दिवसांपूर्वी · राजेश कदम' },

  // 3. पर्यटन (Tourism)
  { id: 301, img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=300&h=200&fit=crop', tag: 'पर्यटन · मालवण', taluka: 'मालवण', categoryKey: 'paryatan', title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी, बोटचालकांना दिलासा', excerpt: 'सुट्टीच्या दिवसामुळे राज्याच्या विविध भागांतून तसेच गोव्यातून पर्यटक मोठ्या संख्येने आले होते. ३००० हून अधिक बोट फेऱ्या पार पडल्या...', meta: '१५ मि. पूर्वी · सारिका पवार' },
  { id: 302, img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=300&h=200&fit=crop', tag: 'पर्यटन · वेंगुर्ला', taluka: 'वेंगुर्ला', categoryKey: 'paryatan', title: 'वेंगुर्ला शिरोडा किनाऱ्यावर नवीन स्कूबा डायव्हिंग आणि वॉटर स्पोर्ट्स सेंटर सुरू', excerpt: 'पर्यटकांसाठी बनामा बोट, पॅरासेलिंग आणि स्कूबा डायव्हिंगच्या नव्या आधुनिक बोटी दाखल झाल्या आहेत...', meta: '१ दिवसापूर्वी · मीना जाधव' },
  { id: 303, img: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=300&h=200&fit=crop', tag: 'पर्यटन · सावंतवाडी', taluka: 'सावंतवाडी', categoryKey: 'paryatan', title: 'आंबोली घाटात वर्षा पर्यटनासाठी गर्दी, पोलिसांचा कडक बंदोबस्त', excerpt: 'धबधब्यांवर पर्यटकांचा उत्साह ओसंडून वाहत असून सुरक्षिततेच्या कारणास्तव पोलीस चौकी तैनात करण्यात आली आहे...', meta: '२ दिवसांपूर्वी · राजेश कदम' },
  { id: 304, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop', tag: 'पर्यटन · देवगड', taluka: 'देवगड', categoryKey: 'paryatan', title: 'विजयदुर्ग आणि देवगड दीपस्तंभ परिसर पर्यटन विकासासाठी निधी मंजूर', excerpt: 'ऐतिहासिक विजयदुर्ग किल्ल्याचे संवर्धन आणि रोषणाईसाठी पर्यटन मंत्रालयाने विशेष निधीची तरतूद केली आहे...', meta: '३ दिवसांपूर्वी · सारिका पवार' },

  // 4. संस्कृती (Culture)
  { id: 401, img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop', tag: 'संस्कृती · देवगड', taluka: 'देवगड', categoryKey: 'sanskriti', title: 'देवगड तालुक्यात ३० दिवसांचा भव्य दशावतार नाट्य महोत्सव', excerpt: 'कोकणची लोककला असलेल्या दशावताराचे पारंपारिक आणि पौराणिक प्रयोग पाहण्यासाठी भाविकांची तुडूंब गर्दी...', meta: '५ तासांपूर्वी · मीना जाधव' },
  { id: 402, img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop', tag: 'संस्कृती · सावंतवाडी', taluka: 'सावंतवाडी', categoryKey: 'sanskriti', title: 'सावंतवाडीच्या लाकडी खेळणी परंपरेचा जीआय महोत्सव उत्साहात', excerpt: 'चितारअळीतील कारागिरांच्या हाताने घडलेल्या वस्तूंचे प्रदर्शन आणि थेट प्रात्यक्षिक पर्यटकांचे लक्ष वेधून घेत आहे...', meta: '२ दिवसांपूर्वी · राजेश कदम' },
  { id: 403, img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop', tag: 'संस्कृती · मालवण', taluka: 'मालवण', categoryKey: 'sanskriti', title: 'अस्सल मालवणी बोलीभाषा संवर्धन संमेलन मालवणात थाटात संपन्न', excerpt: 'मालवणी भाषेतील कविता, म्हणी आणि दशावतारी संवादांच्या सादरीकरणाने संमेलनाची सांगता झाली...', meta: '४ दिवसांपूर्वी · सारिका पवार' },

  // 5. क्रीडा (Sports)
  { id: 501, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop', tag: 'क्रीडा · कुडाळ', taluka: 'कुडाळ', categoryKey: 'krida', title: 'कुडाळमध्ये राज्यस्तरीय कबड्डी स्पर्धेचे उद्घाटन, ३२ संघ सहभागी', excerpt: 'छत्रपती शिवाजी महाराज क्रीडांगणावर भरलेल्या या स्पर्धेत महाराष्ट्रातील नामवंत पुरुष व महिला संघ भिडणार आहेत...', meta: '३ तासांपूर्वी · राजेश कदम' },
  { id: 502, img: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=300&h=200&fit=crop', tag: 'क्रीडा · वेंगुर्ला', taluka: 'वेंगुर्ला', categoryKey: 'krida', title: 'वेंगुर्ला बीच वॉलीबॉल चषकावर स्थानिक मालवण संघाचे वर्चस्व', excerpt: 'रोमहर्षक अंतिम सामन्यात वेंगुर्ला क्रीडा मंडळाला मात देत मालवण संघाने अजिंक्यपद पटकावले...', meta: '२ दिवसांपूर्वी · मीना जाधव' },
  { id: 503, img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=200&fit=crop', tag: 'क्रीडा · कणकवली', taluka: 'कणकवली', categoryKey: 'krida', title: 'कणकवली प्रीमियर लीग टी-२० क्रिकेट स्पर्धेचा आज अंतिम सामना', excerpt: 'कणकवली स्टेडियमवर पार पडणाऱ्या अंतिम सामन्यात देवगड टायटन्स विरुद्ध कणकवली वॉरियर्स लढत होणार...', meta: '३ दिवसांपूर्वी · सारिका पवार' },

  // 6. गुन्हे (Crime / Law & Order)
  { id: 601, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop', tag: 'गुन्हे · दोडामार्ग', taluka: 'दोडामार्ग', categoryKey: 'gunhe', title: 'दोडामार्ग वनक्षेत्रात अवैध लाकूड तस्करीवर वनविभागाची मोठी कारवाई', excerpt: 'दोडामार्ग तालुक्यातील तिळारी खोऱ्यात बेकायदेशीररीत्या खैराची झाडे तोडून वाहतूक करणाऱ्या दोघांना रंगेहाथ पकडले...', meta: '३ तासांपूर्वी · मीना जाधव' },
  { id: 602, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop', tag: 'गुन्हे · कणकवली', taluka: 'कणकवली', categoryKey: 'gunhe', title: 'कणकवली महामार्गावर धाडसी जबरी चोरी, संशयित पोलिसांच्या ताब्यात', excerpt: 'राष्ट्रीय महामार्गावर रात्रीच्या वेळी दुचाकीस्वाराला अडवून लुटणाऱ्या टोळीतील तीन जणांना स्थानिक गुन्हे शाखेने मुसक्या आवळल्या...', meta: '६ तासांपूर्वी · राजेश कदम' },
  { id: 603, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop', tag: 'गुन्हे · सावंतवाडी', taluka: 'सावंतवाडी', categoryKey: 'gunhe', title: 'सावंतवाडीत ऑनलाईन लॉटरी फ्रॉड प्रकरणी सायबर पोलिसांकडून गुन्हा दाखल', excerpt: 'सर्वसामान्य नागरिकांना जास्त परताव्याचे आमिष दाखवून लाखो रुपयांची फसवणूक करणाऱ्या टोळीचा पर्दाफाश...', meta: '१ दिवसापूर्वी · सारिका पवार' },
  { id: 604, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop', tag: 'गुन्हे · मालवण', taluka: 'मालवण', categoryKey: 'gunhe', title: 'मालवण समुद्रकिनाऱ्यावर बेकायदेशीर वाळू उपशावर महसूल विभागाची धाड', excerpt: 'परवानग्या नसताना वाळूचे उत्खनन करणाऱ्या ३ बोटी व साहित्य जप्त करण्यात आले असून दंडात्मक कारवाई सुरू...', meta: '२ दिवसांपूर्वी · मीना जाधव' }
];

export const searchResults = [
  { tag: 'पर्यटन · मालवण', title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी, स्थानिक व्यावसायिकांना दिलासा', excerpt: 'आज सकाळपासून सिंधुदुर्ग किल्ल्यावर पर्यटकांची मोठी गर्दी दिसान इली. सुट्टीच्या दिवसामुळे...', meta: '२ तासांपूर्वी · सारिका पवार', highlight: 'सिंधुदुर्ग किल्ल्या' },
  { tag: 'इतिहास · मालवण', title: 'छत्रपती शिवाजी महाराजांनी बांधलेल्या सिंधुदुर्ग किल्ल्याचा इतिहास', excerpt: '१६६४ साली बांधलेला हा जलदुर्ग आजही आपल्या मजबूत बांधकामासाठी ओळखला जातो...', meta: '२ आठवड्यांपूर्वी · राजेश कदम', highlight: 'सिंधुदुर्ग किल्ल्या' },
  { tag: 'पर्यटन · मालवण', title: 'मालवण बंदरातून सिंधुदुर्ग किल्ल्याकडे जाणाऱ्या बोटींचे नवीन वेळापत्रक', excerpt: 'पर्यटकांच्या सोयीसाठी बोट फेऱ्यांची संख्या वाढवण्यात आली असून नवीन वेळापत्रक जाहीर...', meta: '१ महिन्यापूर्वी · मीना जाधव', highlight: 'सिंधुदुर्ग किल्ल्या' },
];

// ── 5. Kavitas, Lekhs, Vinods Data ──
export const kavitaList = [
  {
    id: 1,
    title: 'मायबोली मालवणी',
    author: 'कवी सुहास कुबल (मालवण)',
    date: '२० जुलै २०२६',
    likes: 142,
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=260&fit=crop',
    excerpt: 'समुद्राच्या लाटांवर गाणारा सूर आमचो, मालवणी बोलीत दडला हा स्वाभिमान आमचो...',
    fullText: `समुद्राच्या लाटांवर गाणारा सूर आमचो,
मालवणी बोलीत दडला हा स्वाभिमान आमचो.
नारळ-सुपारीच्या बागा नि निळसर हा दर्या,
मालवणी माणसाची नाती कायमच असतात खऱ्या!

आंबा, काजू, सोलकढी नि सुरमईची चव,
मालवणी भाषेचा जगभरात मोठा हा ताव!
गोडवा इतका की काय सांगू भावा,
मालवणी बोलीसारखा दुसरा ना ठेवा!`,
    icon: '📜',
    category: 'कविता'
  },
  {
    id: 2,
    title: 'पावसाची चाहूल',
    author: 'आनंद मेस्त्री (कणकवली)',
    date: '१८ जुलै २०२६',
    likes: 98,
    img: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&h=260&fit=crop',
    excerpt: 'कौलारावर पडणारे पाण्याचे थेंब, तांबड्या मातीचा सुवास नि पावसाची पहीली पखरण...',
    fullText: `कौलारावर पडणारे पाण्याचे थेंब,
तांबड्या मातीचा सुवास नि हसणारा थेंब!
शेतातल्या चिखलात रुजणारे रोप,
मालवणातल्या पावसाचा वेगळाच हा झोप!

नद्यानाल्यांना आला हा महापूर,
पावसात भीजायचा गावचा हा सूर!`,
    icon: '🌧️',
    category: 'कविता'
  },
  {
    id: 3,
    title: 'कोकणची सांज',
    author: 'प्राजक्ता परब (वेंगुर्ला)',
    date: '१५ जुलै २०२६',
    likes: 116,
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=260&fit=crop',
    excerpt: 'सोनेरी उन्हात न्हालेला अरबी समुद्र नि किनाऱ्यावर पांगणारे शेकडो पक्षी...',
    fullText: `सोनेरी उन्हात न्हालेला अरबी समुद्र,
किनाऱ्यावर उडणारे पाखरांचे थवे सुंदर!
दीपस्तंभाचा तो लुकलुकणारा प्रकाश,
कोकणच्या सांजेला लाभला निळाभोर आकाश!`,
    icon: '🌅',
    category: 'कविता'
  }
];

export const lekhList = [
  {
    id: 1,
    title: 'दशावतार: कोकणच्या लोककलेचा अजोड वारसा',
    author: 'डॉ. गजानन बांदिवडेकर',
    date: '१९ जुलै २०२६',
    readTime: '५ मि. वाचन',
    img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=260&fit=crop',
    excerpt: 'कोकणातील रात्रभर चालणाऱ्या दशावतारी नाटकांचे महत्त्व केवळ मनोरंजनापुरते मर्यादित नसून संस्कृती जतन करण्यात आहे...',
    content: `दशावतार ही कोकणची सर्वात प्रभावी आणि जिवंत लोककला मानली जाते. लाकडी मुखवटे, अंगावरचे पारंपरिक दागिने आणि रात्रीच्या शांततेत घुमणारा पखवाजचा नाद या कलाप्रकाराला एक वेगळीच भव्यता देतो.

पौराणिक कथांवर आधारित हे प्रयोग रात्रभर चालतात. यात काम करणारे कलाकार अत्यंत निष्ठेने आपली भूमिका साकारतात. आजच्या डिजिटल युगातही दशावताराची क्रेझ थोडीसुद्धा कमी झालेली नाही.`,
    icon: '✍️',
    category: 'लेख'
  },
  {
    id: 2,
    title: 'कोकणी खाद्यसंस्कृती आणि सोलकढीचे गुपित',
    author: 'सुनिता राणे',
    date: '१६ जुलै २०२६',
    readTime: '४ मि. वाचन',
    img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=260&fit=crop',
    excerpt: 'मालवणी मासळी थाळी जितकी प्रसिद्ध आहे तितकीच तृप्ती देणारी ठरते ती म्हणजे चविष्ट सोलकढी...',
    content: `मालवणी जेवणाची खरी गम्मत सोलकढीत दडलेली आहे. नारळाचे ताजे दूध, ओल्या कोकमचा अर्क, लसूण, हिरवी मिरची आणि कोथिंबीर यांचा समतोल मेळ म्हणजे सोलकढी.

पचनासाठी उत्तम असणारी ही कढी प्रत्येक मालवणी घराघरात आणि खानावळीत आस्थेने वाढली जाते.`,
    icon: '🍛',
    category: 'लेख'
  },
  {
    id: 3,
    title: 'सावंतवाडीच्या लाकडी खेळण्यांचा ऐतिहासिक प्रवास',
    author: 'रमेश चितारी',
    date: '१२ जुलै २०२६',
    readTime: '६ मि. वाचन',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=260&fit=crop',
    excerpt: 'सावंतवाडी संस्थानापासून सुरू झालेली लाकडी हस्तकला आजही जगभरात कशी आपली ओळख टिकवून आहे...',
    content: `चितारअळीतील चिंचेच्या लाकडापासून बनवलेली खेळणी आणि गंजीफा कार्ड्स हे सावंतवाडीचे खास वैशिष्ट्य आहे. नैसर्गिक रंगांचा वापर आणि कुशल हस्तकला यामुळे या खेळण्यांना आंतरराष्ट्रीय स्तरावर मागणी आहे.`,
    icon: '🪵',
    category: 'लेख'
  }
];

export const vinodList = [
  {
    id: 1,
    title: 'मासळी बाजारातली बोलणी',
    author: 'प्रशांत गावडे',
    date: '२० जुलै २०२६',
    likes: 210,
    img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&h=260&fit=crop',
    joke: `गिऱ्हाईक: "मावशी, ही सुरमई ताजी हा ना?"
मासळीवाली: "नाही रे बाबा, काल रात्री ती माझ्यासोबत टीव्ही बघत बसलेली!"`,
    punchline: '— मालवणी विनोद',
    icon: '😂',
    category: 'विनोद'
  },
  {
    id: 2,
    title: 'एसटी बसचा कंडक्टर',
    author: 'सुनील तांबडे',
    date: '१८ जुलै २०२६',
    likes: 185,
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=260&fit=crop',
    joke: `प्रवासी: "कंडक्टर साहेब, ही बस मालवणाला कधी पोहोचतली?"
कंडक्टर: "ड्रायव्हरने स्टेअरिंग सोडल्याशिवाय आणि मी ब्रेक दाबताच!"`,
    punchline: '— मालवणी विनोद',
    icon: '😆',
    category: 'विनोद'
  },
  {
    id: 3,
    title: 'डॉक्टर नि मालवणी रुग्ण',
    author: 'नितीन सावंत',
    date: '१४ जुलै २०२६',
    likes: 154,
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=260&fit=crop',
    joke: `डॉक्टर: "तुमच्या पोटात गॅस झाला हा, रोज सकाळी चालायला जात जा."
रुग्ण: "डॉक्टर साहेब, मी रोज चालतोच, पण चालताना पंक्चर झालो तर काय करू?"`,
    punchline: '— मालवणी विनोद',
    icon: '🤣',
    category: 'विनोद'
  }
];

// ── 6. Upcoming & Past Festivals Data ──
export const upcomingFestivals = [
  {
    id: 1,
    title: 'नारळी पौर्णिमा व दर्या पूजन सोहळा',
    date: '९ ऑगस्ट २०२६',
    daysLeft: '२० दिवस बाकी',
    location: 'मालवण पतन व बंदर',
    organizer: 'मच्छिमार कल्याणकारी संस्था',
    img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&h=260&fit=crop',
    description: 'कोळी बांधवांचा सर्वात महत्त्वाचा सण. समुद्राला सोन्याचा नारळ अर्पण करून मासेमारी हंगामाची अधिकृत सुरुवात केली जाते.',
    highlights: ['सोन्याचा नारळ अर्पण मिरवणूक', 'कोळी नृत्य सादरीकरण', 'पारंपरिक खाद्य महोत्सव'],
    status: 'upcoming',
    icon: '🥥'
  },
  {
    id: 2,
    title: 'सिंधुदुर्ग गणेशोत्सव २०२६',
    date: '२७ ऑगस्ट २०२६',
    daysLeft: '३८ दिवस बाकी',
    location: 'संपूर्ण सिंधुदुर्ग जिल्हा',
    organizer: 'सार्वजनिक उत्सव मंडळे व घरोघरी',
    img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=260&fit=crop',
    description: 'कोकणातील सर्वात मोठा व आस्थेचा सण. १० दिवस चालणाऱ्या या उत्सवात चाकरमानी मोठ्या संख्येने गावी येतात.',
    highlights: ['पर्यावरणपूरक शाडूच्या मूर्ती', 'दशावतारी नाटके', 'भजन व आरती स्पर्धा'],
    status: 'upcoming',
    icon: '🪔'
  },
  {
    id: 3,
    title: 'आंगणेवाडी भराडी देवी वार्षिक यात्रा',
    date: '१५ फेब्रुवारी २०२७',
    daysLeft: 'आगामी नियोजन',
    location: 'मसुरे-आंगणेवाडी, मालवण',
    organizer: 'आंगणे कुटुंबिय व ग्रामस्थ',
    img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=260&fit=crop',
    description: 'लाखो भाविकांचे श्रद्धास्थान असलेल्या भराडी देवीची प्रसिद्ध दीड दिवसाची यात्रा.',
    highlights: ['देवीचा नवस फेडणे', 'भक्तांसाठी २४ तास दर्शन महाप्रसाद', 'विशेष एसटी व रेल्वे फेऱ्या'],
    status: 'upcoming',
    icon: '🚩'
  }
];

export const pastFestivals = [
  {
    id: 101,
    title: 'देवगड श्री देव कुणकेश्वर महाशिवरात्री महोत्सव',
    heldDate: '८ मार्च २०२६',
    location: 'कुणकेश्वर समुद्रकिनारा, देवगड',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=260&fit=crop',
    summary: 'लाखो शिवभक्तांनी कुणकेश्वर मंदिरात दर्शन घेतले. समुद्राकाठच्या या तीर्थक्षेत्री ३ दिवस भव्य यात्रा पार पडली.',
    highlights: ['समुद्रस्नान व दर्शन', 'रात्रभर पालखी सोहळा', 'सांस्कृतिक कार्यक्रम व दशावतार'],
    photosCount: '४८ फोटो व ५ व्हिडिओ',
    status: 'completed',
    icon: '🔱'
  },
  {
    id: 102,
    title: 'सावंतवाडी संस्थान होळी व धुलिवंदन उत्सव',
    heldDate: '२५ मार्च २०२६',
    location: 'सावंतवाडी राजवाडा परिसर',
    img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=260&fit=crop',
    summary: 'पारंपरिक पद्धतीने होळी पेटवून पुरणपोळीचा नैवेद्य दाखवण्यात आला. रंगपंचमीचा सण उत्साहात साजरा झाला.',
    highlights: ['राजघराण्यातील पारंपरिक पूजा', 'लोकसंगीताचे सादरीकरण', 'रंगोत्सव'],
    photosCount: '३२ फोटो',
    status: 'completed',
    icon: '🔥'
  },
  {
    id: 103,
    title: 'रामनवमी उत्सव - रामेश्वर मंदिर पास्र',
    heldDate: '१७ एप्रिल २०२६',
    location: 'आचरा, मालवण',
    img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=400&h=260&fit=crop',
    summary: 'दुपारी १२ वाजता श्रीरामाचा जन्मोत्सव साजरा करण्यात आला. सुंठवडा वाटप व महाप्रसादाचे आयोजन करण्यात आले.',
    highlights: ['पालखी मिरवणूक', 'कीर्तन व भजन', 'महाप्रसाद वाटप'],
    photosCount: '२५ फोटो',
    status: 'completed',
    icon: '🏹'
  }
];

// ── 7. Article Media (Photos & Videos) ──
export const articleMedia = {
  // Main article id 1 or fallback
  defaultMedia: {
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=800&h=500&fit=crop', title: 'किल्ल्याचे मुख्य महाद्वार', caption: 'पर्यटकांनी गजबजलेला सिंधुदुर्ग किल्ल्याचा मुख्य दरवाजा' },
      { id: 2, url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop', title: 'बोट फेरी सेवा', caption: 'मालवण बंदरातून बोटीने किल्ल्याकडे जाताना पर्यटकांचा आनंद' },
      { id: 3, url: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=800&h=500&fit=crop', title: 'किल्ल्यावरून दिसणारा अरबी समुद्र', caption: 'सिंधुदुर्ग किल्ल्याच्या तटबंदीवरून दिसणारा नयनरम्य समुद्र' },
      { id: 4, url: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=500&fit=crop', title: 'शिवराजेश्वर मंदिर', caption: 'किल्ल्यातील छत्रपती शिवाजी महाराजांच्या एकमेव मंदिराचे दृश्य' }
    ],
    videos: [
      { id: 1, title: 'सिंधुदुर्ग किल्ला ड्रोन व्ह्यू २०२६', duration: '२:४५ मि.', thumbnail: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=800&h=500&fit=crop', desc: 'आकाशातून दिसणारा भव्य जलदुर्ग सिंधुदुर्ग — ४K ड्रोन व्हिडिओ' },
      { id: 2, title: 'पर्यटक आणि बोटचालकांचे मनोगत', duration: '१:३० मि.', thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop', desc: 'आजच्या विक्रमी गर्दीबद्दल स्थानिक बोटचालक व पर्यटकांची प्रतिक्रिया' }
    ]
  }
};

