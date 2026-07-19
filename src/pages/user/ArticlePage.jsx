import { useState } from 'react';

const relatedArticles = [
  { img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=250&h=150&fit=crop', title: 'वेंगुर्ला किनाऱ्यावर सांस्कृतिक कार्यक्रमाचे आयोजन', meta: '१ दिवसापूर्वी · वेंगुर्ला', key: 'vengurla' },
  { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=250&h=150&fit=crop', title: 'मालवणी जत्रेत यंदा पारंपरिक खाद्यमहोत्सव', meta: '१ दिवसापूर्वी · मालवण', key: 'food_fest' },
  { img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=250&h=150&fit=crop', title: 'सावंतवाडी लाकडी खेळणी उद्योगाला नवसंजीवनी', meta: '५ तासांपूर्वी · सावंतवाडी', key: 'sawantwadi' },
  { img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=250&h=150&fit=crop', title: 'कुडाळात गणेशोत्सवाची जय्यत तयारी सुरू', meta: '४ तासांपूर्वी · कुडाळ', key: 'kudal' },
];

const articlesData = {
  main: {
    tag: 'पर्यटन · मालवण',
    title: 'सिंधुदुर्ग किल्ल्यावर पर्यटकांची विक्रमी गर्दी, स्थानिक व्यावसायिकांना दिलासा',
    author: 'सारिका पवार',
    authorInitial: 'SP',
    time: '१८ जुलै २०२६ · सकाळी ९:४० · ४ मिनिटे वाचन',
    img: 'https://images.unsplash.com/photo-1580746738099-8f2c8b8f8b5e?w=1000&h=560&fit=crop',
    imgCaption: 'सिंधुदुर्ग किल्ल्यावर आज सकाळपासून पर्यटकांची गर्दी — छायाचित्र: मायबोली मालवणी',
    body: [
      'आज सकाळपासून सिंधुदुर्ग किल्ल्यावर पर्यटकांची मोठी गर्दी दिसान इली. सुट्टीच्या दिवसामुळे राज्याच्या विविध भागांतून तसेच गोव्यातून पर्यटक मोठ्या संख्येने आले होते. किल्ल्याच्या प्रवेशद्वारापासूनच रांगा लागल्याचे चित्र होते.',
      'स्थानिक बोटचालक व दुकानदारांनी सांगितले की, गेल्या दोन वर्षांत इतकी गर्दी पहिल्यांदाच पाहायला मिळाली. मालवण बंदरातून किल्ल्यावर जाणाऱ्या बोटींच्या फेऱ्याही वाढवाव्या लागल्या.',
      'जिल्हा पर्यटन विभागाने या वाढत्या गर्दीच्या पार्श्वभूमीवर सुरक्षेच्या दृष्टीने अतिरिक्त कर्मचारी तैनात केले आहेत. पिण्याच्या पाण्याची व स्वच्छतागृहांची व्यवस्थाही वाढवण्यात आली आहे.',
      'स्थानिक व्यावसायिकांनी या गर्दीचे स्वागत केले असून, यामुळे किल्ल्याच्या परिसरातील छोट्या व्यावसायिकांना मोठा आर्थिक दिलासा मिळाल्याचे सांगितले.'
    ],
    quote: '"आज दिवसभरात जवळपास ३,००० पर्यटक किल्ल्यावर आले — हा या हंगामातला सगळ्यात मोठा आकडा हाय." — बोटचालक संघटना, मालवण',
    tags: ['#सिंधुदुर्ग', '#पर्यटन', '#मालवण', '#किल्ला']
  },
  vengurla: {
    tag: 'संस्कृती · वेंगुर्ला',
    title: 'वेंगुर्ला किनाऱ्यावर सांस्कृतिक कार्यक्रमाचे आयोजन',
    author: 'मीना जाधव',
    authorInitial: 'MJ',
    time: '१७ जुलै २०२६ · संध्याकाळी ५:२० · ३ मिनिटे वाचन',
    img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1000&h=560&fit=crop',
    imgCaption: 'वेंगुर्ला किनाऱ्यावर पार पडलेला भव्य सांस्कृतिक सोहळा — छायाचित्र: मायबोली मालवणी',
    body: [
      'वेंगुर्ला येथील सागरकिनाऱ्यावर काल संध्याकाळी एका दिमाखदार सांस्कृतिक सोहळ्याचे आयोजन करण्यात आले होते. कोकणातील विविध पारंपारिक लोककलांचे सादरीकरण या कार्यक्रमाचे प्रमुख आकर्षण होते.',
      'स्थानिक कलाकारांनी नमन, गोफ आणि पारंपारिक कोळी नृत्ये सादर करून उपस्थितांची मने जिंकली. पर्यटकांनीही या सोहळ्याला प्रचंड प्रतिसाद दिला.',
      'आयोजकांनी सांगितले की, अशा उपक्रमांमुळे कोकणातील समृद्ध संस्कृतीचे दर्शन थेट पर्यटकांना घडते आणि स्थानिक कलेला राजाश्रय मिळतो.'
    ],
    quote: '"असे सांस्कृतिक कार्यक्रम दर आठवड्याला राबवल्यास वेंगुर्ल्याचा पर्यटन व्यवसाय आणखी वाढेल." — स्थानिक पर्यटन समिती सदस्य',
    tags: ['#वेंगुर्ला', '#संस्कृती', '#कोकण', '#कला']
  },
  food_fest: {
    tag: 'पर्यटन · मालवण',
    title: 'मालवणी जत्रेत यंदा पारंपरिक खाद्यमहोत्सव',
    author: 'मीना जाधव',
    authorInitial: 'MJ',
    time: '१७ जुलै २०२६ · दुपारी ३:१५ · ५ मिनिटे वाचन',
    img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&h=560&fit=crop',
    imgCaption: 'खाद्यमहोत्सवात सजलेली मालवणी जेवणाची थाळी — छायाचित्र: मायबोली मालवणी',
    body: [
      'मालवणच्या वार्षिक जत्रोत्सवाच्या निमित्ताने यंदा विशेष मालवणी खाद्यमहोत्सवाचे आयोजन करण्यात आले आहे. यामध्ये अस्सल मालवणी पद्धतीचे मासे, मटण आणि शाकाहारी पदार्थ चाखण्याची संधी खवय्यांना मिळत आहे.',
      'खास करून कोळंबी फ्राय, सुरमई थाळी, घावणे-चटणी आणि सोलकढीच्या स्टॉल्सवर खवय्यांची मोठी गर्दी पाहायला मिळत आहे.',
      'स्थानिक महिला बचत गटांनी यात मोठ्या संख्येने सहभाग घेतला असून, त्यांच्या मालाला चांगला प्रतिसाद मिळत असल्याने समाधान व्यक्त केले आहे.'
    ],
    quote: '"अस्सल घरगुती मालवणी चव एकाच छताखाली मिळाल्यामुळे पर्यटकांची पावले आपोआप इकडे वळत आहेत." — खाद्यमहोत्सव समन्वयक',
    tags: ['#मालवण', '#खाद्यमहोत्सव', '#सोलकढी', '#कोकणीजेवण']
  },
  sawantwadi: {
    tag: 'पर्यटन · सावंतवाडी',
    title: 'सावंतवाडी लाकडी खेळणी उद्योगाला नवसंजीवनी',
    author: 'राजेश कदम',
    authorInitial: 'RK',
    time: '१८ जुलै २०२६ · सकाळी ११:०० · ५ मिनिटे वाचन',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&h=560&fit=crop',
    imgCaption: 'चितारअळीतील खेळणी बनवणारे कसबी कारागीर — छायाचित्र: मायबोली मालवणी',
    body: [
      'सावंतवाडीची जगप्रसिद्ध लाकडी खेळणी बनवणाऱ्या कलाकारांसाठी शासनाने नवीन अनुदान आणि विपणन सहाय्य योजना जाहीर केली आहे. यामुळे अडचणीत आलेल्या या पारंपारिक उद्योगाला नवी उभारी मिळण्याची शक्यता आहे.',
      'चितारअळीतील जुन्या कारागिरांनी या निर्णयाचे मनापासून स्वागत केले आहे. नवीन तंत्रज्ञानाचा वापर करून आणि आकर्षक डिझाइन्स आणून खेळण्यांना आधुनिक बाज देण्याचा त्यांचा प्रयत्न आहे.',
      'शासकीय मदतीमुळे कच्च्या मालाचा पुरवठा आणि बाजारपेठ मिळवणे सोपे होणार असल्याचे सांगण्यात आले.'
    ],
    quote: '"लाकडी खेळणी हे सावंतवाडीचे वैभव असून ते टिकवण्यासाठी आणि वृद्धिंगत करण्यासाठी आम्ही कटिबद्ध आहोत." — स्थानिक कारागीर संघ',
    tags: ['#सावंतवाडी', '#लाकडीखेळणी', '#कोकणहस्तकला', '#पारंपारिककला']
  },
  kudal: {
    tag: 'संस्कृती · कुडाळ',
    title: 'कुडाळात गणेशोत्सवाची जय्यत तयारी सुरू',
    author: 'राजेश कदम',
    authorInitial: 'RK',
    time: '१८ जुलै २०२६ · दुपारी १२:३० · ४ मिनिटे वाचन',
    img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1000&h=560&fit=crop',
    imgCaption: 'कुडाळ शहरातील मूर्तिकार गणेशमूर्तींना शेवटचा हात देताना — छायाचित्र: मायबोली मालवणी',
    body: [
      'कोकणचा लाडका सण असलेल्या गणेशोत्सवासाठी कुडाळ शहरात मूर्तिकार आणि सार्वजनिक गणेशोत्सव मंडळांची पूर्वतयारी वेगाने सुरू आहे. कारखान्यांमध्ये सुंदर गणेशमूर्ती घडवण्याचे काम अंतिम टप्प्यात आले आहे.',
      'यंदा पर्यावरणपूरक शाडूच्या मूर्तींना भाविकांची सर्वाधिक पसंती मिळत असल्याचे मूर्तिकारांनी सांगितले.',
      'कुडाळातील बाजारपेठही गणेशोत्सवाच्या खरेदीसाठी हळूहळू सजायला लागली आहे.'
    ],
    quote: '"यंदाही पर्यावरणपूरक उत्सव साजरा करण्यावर आमचा भर असून शाडूच्या मूर्तींची नोंदणी वाढली आहे." — कुडाळ मूर्तिकार संघटना',
    tags: ['#कुडाळ', '#गणेशोत्सव', '#बाप्पा', '#शाडूचीमूर्ती']
  }
};

export default function ArticlePage({ onNavigate }) {
  const [currentArticleKey, setCurrentArticleKey] = useState('main');
  const data = articlesData[currentArticleKey] || articlesData['main'];

  const handleRelatedClick = (key) => {
    setCurrentArticleKey(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialShare = (platform) => {
    alert(`ही बातमी ${platform} वर शेअर केल्याबद्दल धन्यवाद!`);
  };

  return (
    <div>
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="font-poppins text-[12px] text-grey pt-5">
          <button onClick={() => onNavigate && onNavigate('home')} className="text-teal">होम</button> /{' '}
          <button onClick={() => onNavigate && onNavigate('listing')} className="text-teal">पर्यटन</button> / {data.title}
        </div>

        {/* Article Head */}
        <div className="pt-4 pb-6 max-w-[760px]">
          <span
            className="flag-tag-90 inline-block font-poppins text-[11px] font-bold text-[#fbe8c9] px-4 py-1.5 mb-4"
            style={{ background: 'var(--maroon)' }}
          >
            {data.tag}
          </span>
          <h1 className="font-tiro text-[34px] leading-[1.35] text-ink mb-3.5">
            {data.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-poppins font-bold text-[13px] text-white flex-shrink-0"
                style={{ background: 'var(--teal)' }}
              >
                {data.authorInitial}
              </div>
              <div className="font-poppins text-[13px] leading-snug">
                {data.author}
                <div className="text-[11px] text-grey">{data.time}</div>
              </div>
            </div>
            <div className="flex gap-2.5 ml-auto">
              <button
                onClick={() => handleSocialShare('Copy Link')}
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm text-teal bg-white border-[1.5px] border-line cursor-pointer hover:bg-grey-light"
              >
                🔗
              </button>
              <button
                onClick={() => handleSocialShare('WhatsApp')}
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm text-teal bg-white border-[1.5px] border-line cursor-pointer hover:bg-grey-light"
              >
                📱
              </button>
              <button
                onClick={() => handleSocialShare('Facebook')}
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm font-bold text-teal bg-white border-[1.5px] border-line cursor-pointer hover:bg-grey-light"
              >
                f
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <img
        src={data.img}
        alt={data.title}
        className="w-full max-w-[900px] h-[420px] object-cover rounded-[10px] mx-auto block mb-2 shadow-sm"
      />
      <div className="max-w-[900px] mx-auto mb-8 font-poppins text-[11.5px] text-grey text-center">
        {data.imgCaption}
      </div>

      {/* Article Body */}
      <div
        className="max-w-[760px] mx-auto mb-10 font-mukta text-[18px] leading-[2] px-6"
        style={{ color: '#3a2e20' }}
      >
        {data.body.map((para, index) => (
          <p key={index} className="mb-5">
            {para}
          </p>
        ))}
        {data.quote && (
          <div
            className="border-l-4 border-gold pl-5 my-7 font-tiro text-[23px] italic text-maroon-deep leading-[1.5]"
          >
            {data.quote}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="max-w-[760px] mx-auto mb-10 flex gap-2.5 flex-wrap px-6">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="font-poppins text-[12.5px] text-teal bg-white border-[1.5px] border-line px-4 py-[7px] rounded-[18px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Related */}
      <div className="bg-white pt-10 pb-12 mt-2">
        <div className="max-w-[1180px] mx-auto px-6">
          <h2 className="font-tiro text-[24px] text-maroon-deep mb-5">संबंधित बातम्या</h2>
          <div className="related-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedArticles.map((r) => (
              <div
                key={r.title}
                onClick={() => handleRelatedClick(r.key)}
                className="rounded-[10px] overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--cream)' }}
              >
                <img src={r.img} alt={r.title} className="w-full h-[110px] object-cover block" />
                <div className="p-3">
                  <h3 className="font-tiro text-[14.5px] leading-snug text-ink">{r.title}</h3>
                  <div className="font-poppins text-[10px] text-grey mt-2">{r.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
