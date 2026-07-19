import { useState } from 'react';
import { chatMessages } from '../../constants/data.jsx';

const quickQuestions = ['आजच्या ब्रेकिंग न्यूज दाखवा', 'पर्यटन बातम्या', 'माझ्या तालुक्याची बातमी'];

export default function ChatbotPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let botText = "तुमच्या विचारलेल्या प्रश्नाबद्दल सध्या कोणतीही ताजी बातमी उपलब्ध नाही. कृपया वेगळा किंवा अधिक विशिष्ट प्रश्न विचारून पहा.";
      let source = null;

      const lowerText = userText.toLowerCase();
      if (lowerText.includes('ब्रेकिंग') || lowerText.includes('ताज्या') || lowerText.includes('आजच्या')) {
        botText = "आजची ब्रेकिंग न्यूज: सिंधुदुर्ग किल्ल्यावर पर्यटकांची ३,००० हून अधिक विक्रमी गर्दी झाली आहे. सुट्टीच्या दिवसामुळे पर्यटकांचा ओघ वाढला आहे.";
        source = "📰 सिंधुदुर्ग किल्ल्यावर पर्यटकांची गर्दी";
      } else if (lowerText.includes('पर्यटन') || lowerText.includes('फिरणे')) {
        botText = "कोकण पर्यटन विकासासाठी शासनाने नवीन निधी मंजूर केला असून वेंगुर्ला किनाऱ्यावर नवीन वॉटर-स्पोर्ट्स केंद्र सुरू करण्यात आले आहे.";
        source = "🏖️ वेंगुर्ला वॉटर-स्पोर्ट्स केंद्र";
      } else if (lowerText.includes('मालवण') || lowerText.includes('मासे')) {
        botText = "मालवण तालुक्यातून मोठी बातमी: बंदरात नवीन मासळी लिलाव केंद्र सुरू झाले आहे, त्यामुळे स्थानिक कोळी बांधवांना त्यांच्या माशांना चांगला भाव मिळण्यास मदत होणार आहे.";
        source = "🐟 मालवण मासळी लिलाव केंद्र";
      } else if (lowerText.includes('निवडणूक') || lowerText.includes('राजकारण') || lowerText.includes('नेता')) {
        botText = "जिल्ह्यातील ग्रामपंचायत निवडणुकांची घोषणा झाली असून उमेदवारी अर्ज भरण्यास सुरुवात झाली आहे. सर्व राजकीय पक्ष तयारीत व्यस्त आहेत.";
        source = "🏛️ ग्रामपंचायत निवडणूक घोषणा";
      }

      setMessages((prev) => [...prev, { role: 'bot', text: botText, source }]);
    }, 800);
  };

  return (
    <div className="max-w-[760px] mx-auto px-6 py-6 pb-10">
      {/* Head */}
      <div className="text-center mb-5">
        <div
          className="inline-flex items-center gap-2 font-poppins text-[12px] font-semibold text-gold-light px-[18px] py-2 rounded-[20px] mb-3.5"
          style={{ background: 'var(--navy)' }}
        >
          ✓ मायबोली AI
        </div>
        <h1 className="font-tiro text-[26px] text-maroon-deep">
          तुमच्या भागातल्या बातम्यांबद्दल विचारा
        </h1>
        <p className="font-poppins text-[12.5px] text-grey mt-2 max-w-[480px] mx-auto leading-relaxed">
          हा AI फक्त मायबोली मालवणीवर प्रकाशित झालेल्या बातम्यांवर आधारित उत्तर देतो — त्यामुळे उत्तर नेहमी संबंधित बातमीच्या लिंकसह येईल.
        </p>
      </div>

      {/* Chat Window */}
      <div
        className="bg-white rounded-[14px] flex flex-col overflow-hidden border border-line"
        style={{ height: 520, boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 max-w-[80%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              <div
                className="w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center font-poppins font-bold text-[12px]"
                style={
                  msg.role === 'bot'
                    ? { background: 'var(--navy)', color: 'var(--gold-light)' }
                    : { background: 'var(--teal)', color: '#fff' }
                }
              >
                {msg.role === 'bot' ? 'AI' : 'तू'}
              </div>
              <div>
                <div
                  className="px-4 py-3 rounded-[14px] font-mukta text-[15px] leading-[1.7]"
                  style={
                    msg.role === 'bot'
                      ? { background: '#F6F1E6', color: 'var(--ink)', borderBottomLeftRadius: 4 }
                      : { background: 'var(--maroon)', color: '#fbe8c9', borderBottomRightRadius: 4 }
                  }
                >
                  {msg.text}
                </div>
                {msg.source && (
                  <div
                    className="inline-flex items-center gap-1.5 bg-white border-[1.5px] border-gold text-maroon-deep font-poppins text-[11px] font-semibold px-3 py-1.5 rounded-[14px] mt-2.5"
                  >
                    {msg.source}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="flex gap-2 flex-wrap px-5 pb-3">
          {quickQuestions.map((q) => (
            <span
              key={q}
              onClick={() => setInput(q)}
              className="font-poppins text-[12px] text-teal px-3.5 py-2 rounded-[16px] cursor-pointer"
              style={{ background: '#F6F1E6' }}
            >
              {q}
            </span>
          ))}
        </div>

        {/* Input */}
        <div
          className="flex gap-2.5 items-center px-4 py-3.5"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="इथे तुमचा प्रश्न मालवणी किंवा मराठीत लिहा…"
            className="flex-1 font-mukta text-[15px] px-2.5 py-2.5 rounded-[10px] outline-none"
            style={{ background: '#F6F1E6', border: 'none' }}
          />
          <button
            onClick={sendMessage}
            className="w-[42px] h-[42px] rounded-full flex-shrink-0 flex items-center justify-center text-[16px]"
            style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
          >
            ➤
          </button>
        </div>
      </div>

      <div className="text-center font-poppins text-[11px] text-grey mt-3.5 leading-relaxed">
        AI उत्तर फक्त प्रकाशित बातम्यांवर आधारित असते — काही सापडलं नाही तर बॉट तसं स्पष्ट सांगेल, अंदाज बांधणार नाही.
      </div>
    </div>
  );
}
