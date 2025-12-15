import React, { useState } from 'react';
import FormulaGenerator from './components/FormulaGenerator';
import ChatInterface from './components/ChatInterface';
import Visualizer from './components/Visualizer';
import { Icons } from './components/Icon';
import { Tab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GENERATOR);

  return (
    <div className="min-h-screen bg-tdx-bg text-tdx-text font-sans selection:bg-tdx-accent selection:text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-tdx-accent to-emerald-600 p-2 rounded-lg text-slate-900 shadow-lg shadow-emerald-500/20">
              <Icons.Activity size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Chanlun Master <span className="text-tdx-accent">TDX</span>
              </h1>
              <p className="text-xs text-slate-500">通达信缠论公式生成器</p>
            </div>
          </div>
          
          <nav className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
            <button
              onClick={() => setActiveTab(Tab.GENERATOR)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.GENERATOR
                  ? 'bg-tdx-accent text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icons.Terminal size={16} />
              公式生成 (Generator)
            </button>
            <button
              onClick={() => setActiveTab(Tab.CHAT)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.CHAT
                  ? 'bg-tdx-accent text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icons.Cpu size={16} />
              AI 助手 (AI Help)
            </button>
            <button
              onClick={() => setActiveTab(Tab.LEARN)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === Tab.LEARN
                  ? 'bg-tdx-accent text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icons.BookOpen size={16} />
              图解 (Learn)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === Tab.GENERATOR && <FormulaGenerator />}
        {activeTab === Tab.CHAT && <ChatInterface />}
        {activeTab === Tab.LEARN && <Visualizer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
        <p>© 2024 Chanlun Master TDX. Powered by React & Gemini AI.</p>
        <p className="mt-2 text-xs opacity-50">
          Disclaimer: Generated formulas are for educational and technical analysis purposes only. Not financial advice.
        </p>
      </footer>
    </div>
  );
}