export function AboutUsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="font-tiro text-[32px] text-maroon-deep mb-6 text-center border-b pb-4">आमच्याबद्दल (About Us)</h1>
      <div className="font-mukta text-[17px] leading-[1.8] text-ink space-y-6">
        <p>
          <strong>मायबोली मालवणी</strong> हे कोकणातील पहिले आणि एकमेव डिजिटल बातमीपत्र आहे जे मालवणी संस्कृती, भाषा आणि अभिमानाला समर्पित आहे. आमचा उद्देश कोकणातील ग्रामीण भागातील ताज्या घडामोडी, शेती-मासेमारी विषयक समस्या, पर्यटन आणि येथील सांस्कृतिक वारसा जगासमोर आणणे हा आहे.
        </p>
        <p>
          कोकणातील बोलीभाषा असलेल्या <strong>मालवणी</strong> भाषेचे जतन करणे आणि नव्या पिढीला या भाषेची गोडी लावणे हे आमचे मुख्य ध्येय आहे. यासाठी आम्ही आमच्या पोर्टलवर प्रगत AI तंत्रज्ञानाचा वापर करून मराठी/इंग्रजी बातम्यांचे मालवणी भाषेत रूपांतर करण्याचे अभिनव साधन उपलब्ध केले आहे.
        </p>
        <div className="bg-white p-6 rounded-xl border border-line shadow-sm mt-8">
          <h3 className="font-tiro text-[20px] text-maroon mb-3">आमची मुख्य वैशिष्ट्ये:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>तालुकास्तरावरील बातम्या:</strong> मालवण, कणकवली, देवगड, सावंतवाडी सह सर्व तालुक्यांचे थेट वार्तांकन.</li>
            <li><strong>AI भाषांतर सहाय्य:</strong> पत्रकारांसाठी मराठी मजकुराचा मालवणी मसुदा तयार करण्याची आधुनिक सुविधा.</li>
            <li><strong>सांस्कृतिक जतन:</strong> दशावतार, स्थानिक जत्रा, आणि कोकणी खाद्यसंस्कृतीचा विशेष प्रचार.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="font-tiro text-[32px] text-maroon-deep mb-6 text-center border-b pb-4">नियम आणि अटी (Terms & Conditions)</h1>
      <div className="font-mukta text-[16px] leading-[1.8] text-ink space-y-6">
        <p>
          मायबोली मालवणी या संकेतस्थळाचा वापर करताना आपण खालील नियमांचे पालन करणे बंधनकारक आहे:
        </p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            <strong>मजकुराचे हक्क:</strong> या संकेतस्थळावर प्रकाशित होणारा सर्व मजकूर, फोटो आणि व्हिडिओ हे मायबोली मालवणीच्या मालकीचे आहेत. पूर्वपरवानगीशिवाय याचे पुनरुत्पादन किंवा व्यावसायिक वापर करण्यास मनाई आहे.
          </li>
          <li>
            <strong>वाचकांचे मत:</strong> कमेंट्स किंवा चॅटबॉटमध्ये आक्षेपार्ह, वादग्रस्त किंवा असंसदीय भाषेचा वापर केल्यास कायदेशीर कारवाई केली जाऊ शकते.
          </li>
          <li>
            <strong>AI चॅटबॉटचा वापर:</strong> आमचा AI चॅटबॉट केवळ संकेतस्थळावर प्रकाशित बातम्यांच्या आधारे माहिती देतो. कोणत्याही माहितीची अधिकृत खातरजमा करण्यासाठी मुख्य बातमीचा संदर्भ घ्यावा.
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
          मायबोली मालवणी आमच्या वाचकांच्या गोपनीयतेचा आदर करते. आम्ही गोळा करत असलेली माहिती पूर्णपणे सुरक्षित ठेवली जाते:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>वैयक्तिक माहिती:</strong> लॉगिन दरम्यान घेतलेले ईमेल किंवा नाव इतर कोणत्याही तृतीय पक्षासोबत (Third Party) सामायिक केले जात नाहीत.
          </li>
          <li>
            <strong>कुकीज (Cookies):</strong> वापरकर्त्याचा अनुभव सुधारण्यासाठी आणि आवडत्या तालुक्यांच्या बातम्या दाखवण्यासाठी आम्ही कुकीजचा वापर करतो.
          </li>
          <li>
            <strong>बदल:</strong> आमच्या गोपनीयतेच्या धोरणात वेळोवेळी बदल करण्याचे अधिकार आम्ही राखून ठेवतो.
          </li>
        </ul>
      </div>
    </div>
  );
}
