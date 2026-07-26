import { useState, useRef, useEffect } from 'react';
import { Newspaper, Send, Bot, X, MessageCircle } from 'lucide-react';
import { chatMessages } from '../../constants/data.jsx';

const quickQuestions = ['आजच्या ब्रेकिंग न्यूज दाखवा', 'पर्यटन बातम्या', 'माझ्या तालुक्याची बातमी'];

export default function ChatbotFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
        source = "सिंधुदुर्ग किल्ल्यावर पर्यटकांची गर्दी";
      } else if (lowerText.includes('पर्यटन') || lowerText.includes('फिरणे')) {
        botText = "कोकण पर्यटन विकासासाठी शासनाने नवीन निधी मंजूर केला असून वेंगुर्ला किनाऱ्यावर नवीन वॉटर-स्पोर्ट्स केंद्र सुरू करण्यात आले आहे.";
        source = "वेंगुर्ला वॉटर-स्पोर्ट्स केंद्र";
      } else if (lowerText.includes('मालवण') || lowerText.includes('मासे')) {
        botText = "मालवण तालुक्यातून मोठी बातमी: बंदरात नवीन मासळी लिलाव केंद्र सुरू झाले आहे, त्यामुळे स्थानिक कोळी बांधवांना त्यांच्या माशांना चांगला भाव मिळण्यास मदत होणार आहे.";
        source = "मालवण मासळी लिलाव केंद्र";
      } else if (lowerText.includes('निवडणूक') || lowerText.includes('राजकारण') || lowerText.includes('नेता')) {
        botText = "जिल्ह्यातील ग्रामपंचायत निवडणुकांची घोषणा झाली असून उमेदवारी अर्ज भरण्यास सुरुवात झाली आहे. सर्व राजकीय पक्ष तयारीत व्यस्त आहेत.";
        source = "ग्रामपंचायत निवडणूक घोषणा";
      }

      setMessages((prev) => [...prev, { role: 'bot', text: botText, source }]);
    }, 800);
  };

  return (
    <>
      {/* FAB Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 font-poppins font-semibold text-[13.5px] px-5 py-3.5 rounded-[30px] flex items-center gap-2.5 cursor-pointer z-40 hover:scale-105 transition-transform"
          style={{
            background: 'var(--navy)',
            color: '#fbe8c9',
            boxShadow: '0 8px 24px rgba(14,42,71,.35)',
            border: '2px solid var(--gold)',
          }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
          >
            <MessageCircle size={14} />
          </span>
          मायबोली AI ला विचारा
        </div>
      )}

      {/* Chat Window Popup */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden bg-white rounded-[16px] animate-fade-in"
          style={{ width: '380px', height: '600px', maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)', boxShadow: '0 12px 40px rgba(14,42,71,.2)', border: '1px solid var(--line)' }}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between relative" style={{ background: 'linear-gradient(120deg, var(--navy) 0%, var(--teal) 100%)' }}>
            {/* Subtle background decoration */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 relative z-10">
               <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy shadow-sm border border-white/20">
                  <Bot size={20} />
               </div>
               <div>
                  <h3 className="font-tiro text-[20px] text-white leading-tight">मायबोली AI</h3>
                  <div className="font-poppins text-[10px] text-[#c9d6e2]">तुमच्या भागातल्या बातम्यांबद्दल विचारा</div>
               </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#Faf9f6]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div
                  className="w-[28px] h-[28px] rounded-full flex-shrink-0 flex items-center justify-center font-poppins font-bold text-[11px]"
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
                    className="px-3.5 py-2.5 rounded-[12px] font-mukta text-[14.5px] leading-relaxed shadow-sm"
                    style={
                      msg.role === 'bot'
                        ? { background: 'white', color: 'var(--ink)', borderBottomLeftRadius: 4, border: '1px solid var(--line)' }
                        : { background: 'var(--maroon)', color: '#fbe8c9', borderBottomRightRadius: 4 }
                    }
                  >
                    {msg.text}
                  </div>
                  {msg.source && (
                    <div
                      className="inline-flex items-center gap-1 bg-white border border-gold text-maroon-deep font-poppins text-[10px] font-semibold px-2 py-1 rounded-[10px] mt-2 shadow-sm"
                    >
                      <Newspaper size={12} /> {msg.source}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="bg-white px-3 py-2 border-t border-line overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
            {quickQuestions.map((q) => (
              <span
                key={q}
                onClick={() => {
                  setInput(q);
                }}
                className="inline-block font-poppins text-[11px] text-teal px-3 py-1.5 rounded-full cursor-pointer mr-2 hover:bg-teal hover:text-white transition-colors border border-teal"
              >
                {q}
              </span>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-line flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="तुमचा प्रश्न लिहा…"
              className="flex-1 font-mukta text-[14px] px-4 py-2.5 rounded-full outline-none bg-[#F6F1E6] border border-transparent focus:border-teal transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
            >
              <Send size={16} className="-ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
