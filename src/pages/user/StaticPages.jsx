export function AboutUsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="font-tiro text-[32px] text-maroon-deep mb-6 text-center border-b pb-4">आमच्याबद्दल (About Us)</h1>
      <div className="font-mukta text-[17px] leading-[1.8] text-ink space-y-6">
        <p>
          <strong>मायबोली मालवणी</strong> हें कोकणांतलें पयलें आनि एकमेव डिजिटल बातमीपत्र आसा जें मालवणी संस्कृती, भाशा आनि अभिमानाक समर्पित आसा. आमचो उद्देश कोकणांतल्या ग्रामीण भागांतल्यो ताज्यो घडामोडी, शेती-मासेमारी विषयक समस्या, पर्यटन आनि हांगाचो सांस्कृतिक वारसो जगामुखार हाडपाचो आसा.
        </p>
        <p>
          कोकणांतली बोलीभाशा आशिल्ल्या <strong>मालवणी</strong> भाशेचें जतन करप आनि नव्ये पिढीक ह्या भाशेची गोडी लावप हें आमचें मुखेल ध्येय आसा. हाचेखातीर आमी आमच्या पोर्टलचेर प्रगत AI तंत्रज्ञानाचो वापर करून मराठी/इंग्रजी बातम्यांचे मालवणी भाशेंत रूपांतर करपाचें अभिनव साधन उपलब्ध केलां.
        </p>
        <div className="bg-white p-6 rounded-xl border border-line shadow-sm mt-8">
          <h3 className="font-tiro text-[20px] text-maroon mb-3">आमचीं मुखेल वैशिष्ट्यां:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>तालुकास्तरावल्यो बातम्या:</strong> मालवण, कणकवली, देवगड, सावंतवाडी सकट सगळ्या तालुक्यांचें थेट वार्तांकन.</li>
            <li><strong>AI भाशांतर सहाय्य:</strong> पत्रकारांखातीर मराठी मजकुराचो मालवणी मसुदा तयार करपाची आधुनिक सुविधा.</li>
            <li><strong>सांस्कृतिक जतन:</strong> दशावतार, स्थानिक जत्रा, आनि कोकणी खाद्यसंस्कृतीचो विखेश प्रचार.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="font-tiro text-[32px] text-maroon-deep mb-6 text-center border-b pb-4">नियम आनि अटी (Terms & Conditions)</h1>
      <div className="font-mukta text-[16px] leading-[1.8] text-ink space-y-6">
        <p>
          मायबोली मालवणी ह्या संकेतस्थळाचो वापर करताना तुमी सकयल दिल्ल्या नियमांचें पालन करप बंधनकारक आसा:
        </p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            <strong>मजकुराचे हक्क:</strong> ह्या संकेतस्थळाचेर उजवाडाक येवपी सगळो मजकूर, फोटो आनि व्हिडिओ हे मायबोली मालवणीचे मालकीचे आसात. पूर्वपरवानगीविना हाचें पुनरुत्पादन वा व्यावसायिक वापर करपाक मनाई आसा.
          </li>
          <li>
            <strong>वाचकांचे मत:</strong> कमेंट्स वा चॅटबॉटमदीं आक्षेपार्ह, वादग्रस्त वा असंसदीय भाशेचो वापर केल्यार कायदेशीर कारवाई जावंक शकता.
          </li>
          <li>
            <strong>AI चॅटबॉटचो वापर:</strong> आमचो AI चॅटबॉट फकत संकेतस्थळाचेर उजवाडाक आयिल्ल्या बातम्यांच्या आधारे म्हायती दिता. खंयचेय म्हायतीची अधिकृत खातरजमा करपाखातीर मुख्य बातमीचो संदर्भ घेवचो.
          </li>
        </ol>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="font-tiro text-[32px] text-maroon-deep mb-6 text-center border-b pb-4">गोपनीयता धोरण (Privacy Policy)</h1>
      <div className="font-mukta text-[16px] leading-[1.8] text-ink space-y-6">
        <p>
          मायबोली मालवणी आमच्या वाचकांच्या गोपनीयतेचो आदर करता. आमी एकठांय केल्ली म्हायती पुरायपणान सुरक्षित दवरतात:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>वैयक्तिक म्हायती:</strong> लॉगिन वेळार घेतिल्ले ईमेल वा नांव हेर खंयच्याय तृतीय पक्षावांगडा (Third Party) सामायिक केले वचनात.
          </li>
          <li>
            <strong>कुकीज (Cookies):</strong> वापरकर्त्याचो अणभव सुधारपाखातीर आनि आवडट्या तालुक्यांच्यो बातम्या दाखोवपाखातीर आमी कुकीजचो वापर करतात.
          </li>
          <li>
            <strong>बदल:</strong> आमच्या गोपनीयतेच्या धोरणांत वेळोवेळ बदल करपाचे अधिकार आमी राखून दवरतात.
          </li>
        </ul>
      </div>
    </div>
  );
}
