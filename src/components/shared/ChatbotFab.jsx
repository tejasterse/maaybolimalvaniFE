import { useState, useRef, useEffect } from 'react';
import { Newspaper, Send, Bot, X, MessageCircle, Loader2 } from 'lucide-react';
import { generateBotResponse } from '../../utils/chatbot.js';
import { fetchPosts } from '../../api/posts.js';

const quickQuestions = [
  'आजच्या ताज्या बातम्या व तारीख',
  'ताजी फडफडीत बातमी',
  'पर्यटन बातम्या',
  'माझ्या तालुक्याची बातमी'
];

export default function ChatbotFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'नमस्कार! मी मायबोली मालवणी AI असिस्टंट आहे. तुम्ही आजच्या ताज्या बातम्या, तारीख, वेळ किंवा कोणत्याही विषयाबद्दल थेट प्रश्न विचारू शकता.',
    }
  ]);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen && posts.length === 0) {
      fetchPosts({ limit: 50, admin: true })
        .then((res) => {
          setPosts(res?.posts || (Array.isArray(res) ? res : []));
        })
        .catch(() => {});
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend || !textToSend.trim()) return;

    const userText = textToSend.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const response = await generateBotResponse(userText, posts);
      setMessages((prev) => [...prev, { role: 'bot', text: response.text, source: response.source }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'माहिती शोधताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 font-poppins font-semibold text-[13.5px] px-5 py-3.5 rounded-[30px] flex items-center gap-2.5 cursor-pointer z-40 hover:scale-105 transition-transform shadow-lg"
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
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden bg-white rounded-[16px] animate-fade-in shadow-2xl"
          style={{ width: '390px', height: '600px', maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 32px)', border: '1px solid var(--line)' }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 flex items-center justify-between relative" style={{ background: 'linear-gradient(120deg, var(--navy) 0%, var(--teal) 100%)' }}>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-navy shadow-sm border border-white/20">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-tiro text-[18px] text-white leading-tight">मायबोली AI</h3>
                <div className="font-poppins text-[9.5px] text-[#c9d6e2]">आजची तारीख व ताज्या बातम्यांची माहिती</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3.5 flex flex-col gap-3.5 bg-[#Faf9f6]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[88%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div
                  className="w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center font-poppins font-bold text-[10.5px] shadow-sm"
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
                    className="px-3.5 py-2.5 rounded-[12px] font-mukta text-[14px] leading-relaxed shadow-sm whitespace-pre-line"
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
                      className="inline-flex items-center gap-1.5 bg-white border border-gold text-maroon-deep font-poppins text-[10px] font-semibold px-2 py-0.5 rounded-[8px] mt-1.5 shadow-sm"
                    >
                      <Newspaper size={11} className="text-teal" /> <span>{msg.source}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 self-start items-center text-grey font-poppins text-xs px-3 py-2 bg-white rounded-lg border border-line">
                <Loader2 size={14} className="animate-spin text-teal" /> माहिती शोधत आहे...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="bg-white px-2.5 py-2 border-t border-line overflow-x-auto whitespace-nowrap flex gap-1.5" style={{ scrollbarWidth: 'none' }}>
            {quickQuestions.map((q) => (
              <span
                key={q}
                onClick={() => sendMessage(q)}
                className="inline-block font-poppins text-[10.5px] text-teal px-2.5 py-1 rounded-full cursor-pointer hover:bg-teal hover:text-white transition-colors border border-teal flex-shrink-0"
              >
                {q}
              </span>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-line flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="प्रश्न लिहा (तारीख, वेळ, बातमी)…"
              className="flex-1 font-mukta text-[13.5px] px-3.5 py-2 rounded-full outline-none bg-[#F6F1E6] border border-transparent focus:border-teal transition-colors"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
            >
              <Send size={15} className="-ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
