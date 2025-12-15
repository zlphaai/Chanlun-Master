import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';
import { generateTdxAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: '你好！我是您的缠论编程助手。我可以帮您解释缠论概念，或者编写特定的通达信公式片段。\n\n例如，您可以问我："如何编写一个底分型选股公式？" 或 "什么是线段破坏？"',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const prompt = `User query regarding Tongdaixin (TDX) and Chanlun: ${userMsg.content}`;
    const responseText = await generateTdxAdvice(prompt);

    const modelMsg: ChatMessage = {
      role: 'model',
      content: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-tdx-panel border border-slate-700 rounded-xl overflow-hidden shadow-xl">
      <div className="flex items-center gap-2 p-4 border-b border-slate-700 bg-slate-900/50">
        <Icons.Cpu className="text-tdx-accent" />
        <h2 className="text-lg font-bold text-slate-200">AI 编程助手 (AI Assistant)</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-tdx-accent text-slate-900 font-medium rounded-tr-none' 
                  : 'bg-slate-700/50 text-slate-200 rounded-tl-none border border-slate-600'
              }`}
            >
              {msg.role === 'model' ? (
                // Simple parsing to bold specific code blocks if they exist in plain text
                msg.content.split('```').map((part, i) => {
                  if (i % 2 === 1) {
                    return (
                      <div key={i} className="my-2 bg-black/50 p-3 rounded-md font-mono text-sm text-green-400 overflow-x-auto border border-slate-700">
                        {part}
                      </div>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="bg-slate-700/50 p-4 rounded-2xl rounded-tl-none border border-slate-600 flex items-center gap-2">
                <div className="w-2 h-2 bg-tdx-accent rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-tdx-accent rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-tdx-accent rounded-full animate-bounce delay-150"></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-800/50 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入问题，例如：'如何用通达信写一个二买选股公式？'"
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-tdx-accent focus:ring-1 focus:ring-tdx-accent transition"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-tdx-accent text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <Icons.MessageSquare size={20} />
            发送
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;