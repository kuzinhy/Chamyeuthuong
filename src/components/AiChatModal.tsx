import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Heart,
  MessageCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { LumiMascot } from './LumiMascot';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "LUMI ơi, tớ đang bị áp lực bài vở quá...",
  "Làm sao để an ủi một người bạn đang buồn?",
  "Cho tớ một lời khuyên tử tế cho ngày hôm nay nhé!",
  "Tớ vừa thực hiện một hành động nhỏ giúp bạn và cảm thấy rất vui!"
];

export const AiChatModal: React.FC<AiChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Chào bạn! Tớ là LUMI – người bạn nhỏ luôn sẵn sàng lắng nghe mọi tâm sự, áp lực bài vở hay những niềm vui nho nhỏ của bạn. Hôm nay bạn thế nào?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsActive, setIsTtsActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Text-to-Speech function using Web Speech API
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Clean markdown stars
    const cleanText = text.replace(/\*/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.1;

    // Find Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.onstart = () => setIsTtsActive(true);
    utterance.onend = () => setIsTtsActive(false);
    utterance.onerror = () => setIsTtsActive(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsTtsActive(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi kết nối AI');
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      // Optionally speak LUMI reply
      speakText(data.reply);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'LUMI đang gặp chút trục trặc kết nối, nhưng LUMI vẫn luôn lắng nghe bạn. Bạn thử nhắn lại giúp LUMI nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl h-[85vh] max-h-[680px] bg-white/95 rounded-3xl shadow-2xl border border-cyan-100 flex flex-col overflow-hidden text-slate-800"
        >
          
          {/* Header */}
          <div className="p-4 sm:px-6 bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                <LumiMascot size="xs" interactive={false} state="joy" hideInternalBubble />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg tracking-wide text-white">
                    Trợ Lý AI Trắc Ẩn LUMI
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-cyan-400/30 text-cyan-100 border border-cyan-300/40">
                    Gemini 3.8
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cyan-100 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Đang lắng nghe tâm sự của bạn...</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {isTtsActive && (
                <button
                  onClick={handleStopSpeech}
                  title="Dừng đọc"
                  className="p-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                >
                  <VolumeX className="w-4 h-4 animate-bounce" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Safety Helpline Banner */}
          <div className="px-4 py-1.5 bg-cyan-50 border-b border-cyan-100 flex items-center justify-between text-[11px] text-cyan-900">
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0 fill-rose-500" />
              <span>Góc lắng nghe không phán xét • Hỗ trợ tâm lý học đường</span>
            </div>
            <a 
              href="tel:111" 
              className="font-bold text-cyan-800 hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-cyan-700" />
              <span>Tổng đài 111 (24/7)</span>
            </a>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-sky-50/40 to-white">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4 text-cyan-700" />
                  </div>
                )}

                <div className={`max-w-[82%] rounded-2xl p-3.5 shadow-xs text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none font-medium'
                    : 'bg-white border border-cyan-100 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  
                  <div className={`flex items-center justify-between mt-2 pt-1 border-t text-[10px] ${
                    msg.role === 'user' ? 'border-cyan-500/40 text-cyan-100' : 'border-slate-100 text-slate-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => speakText(msg.content)}
                        className="p-1 hover:text-cyan-700 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Đọc thành tiếng"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    <User className="w-4 h-4 text-cyan-300" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-cyan-700 animate-spin" />
                </div>
                <div className="p-3 bg-white border border-cyan-100 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="italic font-medium text-cyan-800">LUMI đang suy ngẫm lời nhắn...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-cyan-600" />
              <span>Gợi ý:</span>
            </span>
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white border border-cyan-200 text-slate-700 text-[11px] hover:border-cyan-500 hover:text-cyan-700 transition-colors shrink-0 cursor-pointer shadow-2xs disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhắn tâm sự cùng LUMI..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-white border border-slate-200 transition-all"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Gửi</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
