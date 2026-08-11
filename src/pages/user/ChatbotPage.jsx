import { useState, useRef, useEffect } from 'react';
import { Bot, Send, ArrowLeft, Newspaper, Loader2 } from 'lucide-react';
import { generateBotResponse } from '../../utils/chatbot.js';
import { fetchPosts } from '../../api/posts.js';

const quickQuestions = [
  'आजच्या ब्रेकिंग न्यूज दाखवा',
  'आज कोणती बातमी अपडेट झाली?',
  'पर्यटन बातम्या',
  'माझ्या तालुक्याची बातमी'
];

export default function ChatbotPage({ onGoBack }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'नमस्कार! मी मायबोली मालवणी AI असिस्टंट आहे. तुम्ही आजच्या ताज्या बातम्या, बातम्यांची तारीख/वेळ, किंवा कोणत्याही विषयाबद्दल थेट प्रश्न विचारू शकता.',
    }
  ]);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchPosts({ limit: 50, admin: true })
      .then((res) => {
        setPosts(res?.posts || (Array.isArray(res) ? res : []));
      })
      .catch(() => {});
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="max-w-[800px] mx-auto px-4 py-6">
      <div 
        className="flex flex-col overflow-hidden bg-white rounded-2xl border border-line"
        style={{ height: '640px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between relative bg-navy">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy font-bold">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-tiro text-[20px] text-white leading-tight">मायबोली AI असिस्टंट</h3>
              <div className="font-poppins text-[10.5px] text-[#c9d6e2]">डेटाबेसमधील ताज्या बातम्या, तारीख व वेळेसह थेट माहिती</div>
            </div>
          </div>
          {onGoBack && (
            <button 
              onClick={onGoBack}
              className="px-3 py-1.5 rounded-lg text-white hover:bg-white/10 text-[13px] font-semibold border border-white/20 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} /> मागे जा
            </button>
          )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#Faf9f6]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              <div
                className="w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center font-poppins font-bold text-[11px] shadow-sm"
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
                  className="px-4 py-3 rounded-[14px] font-mukta text-[15px] leading-relaxed shadow-sm whitespace-pre-line"
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
                    className="inline-flex items-center gap-1.5 bg-white border border-gold text-maroon-deep font-poppins text-[10.5px] font-semibold px-2.5 py-1 rounded-[10px] mt-2 shadow-sm"
                  >
                    <Newspaper size={13} className="text-teal" /> <span>{msg.source}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 self-start items-center text-grey font-poppins text-xs px-3 py-2 bg-white rounded-lg border border-line">
              <Loader2 size={16} className="animate-spin text-teal" /> माहिती शोधली जात आहे...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="bg-white px-3 py-2 border-t border-line overflow-x-auto whitespace-nowrap flex gap-2" style={{ scrollbarWidth: 'none' }}>
          {quickQuestions.map((q) => (
            <span
              key={q}
              onClick={() => sendMessage(q)}
              className="inline-block font-poppins text-[11.5px] text-teal px-3 py-1.5 rounded-full cursor-pointer hover:bg-teal hover:text-white transition-colors border border-teal flex-shrink-0"
            >
              {q}
            </span>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-line flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="आजची तारीख, बातमीची वेळ किंवा प्रश्न इथे विचारा…"
            className="flex-1 font-mukta text-[14.5px] px-4 py-2.5 rounded-full outline-none bg-[#F6F1E6] border border-transparent focus:border-teal transition-colors"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{ background: 'var(--maroon)', color: '#fbe8c9' }}
          >
            <Send size={16} className="-ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
