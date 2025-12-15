import React from 'react';

const Visualizer: React.FC = () => {
  return (
    <div className="h-full bg-tdx-panel border border-slate-700 rounded-xl p-6 shadow-xl overflow-y-auto">
      <h2 className="text-2xl font-bold text-tdx-accent mb-6">缠论基础图解 (Chanlun Concepts)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Fractal Visualization */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
          <h3 className="text-lg font-semibold text-white mb-4">分型 (Fractals)</h3>
          <div className="flex justify-around items-end h-40 relative border-b border-slate-600 pb-2">
             {/* Top Fractal */}
             <div className="flex items-end gap-1">
                <div className="flex flex-col items-center">
                    <div className="w-2 h-10 bg-tdx-red opacity-50"></div>
                    <div className="w-0.5 h-4 bg-tdx-red"></div>
                </div>
                <div className="flex flex-col items-center -mb-4">
                    <span className="mb-1 text-xs text-tdx-accent">顶分型</span>
                    <div className="w-0.5 h-4 bg-tdx-red"></div>
                    <div className="w-2 h-16 bg-tdx-red relative shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-0.5 h-4 bg-tdx-red"></div>
                </div>
                <div className="flex flex-col items-center">
                     <div className="w-0.5 h-4 bg-tdx-red"></div>
                     <div className="w-2 h-10 bg-tdx-red opacity-50"></div>
                </div>
             </div>

             {/* Bottom Fractal */}
             <div className="flex items-start gap-1 h-full pt-8">
                <div className="flex flex-col items-center">
                    <div className="w-2 h-10 bg-tdx-green opacity-50"></div>
                    <div className="w-0.5 h-4 bg-tdx-green"></div>
                </div>
                <div className="flex flex-col items-center -mt-4">
                     <div className="w-0.5 h-4 bg-tdx-green"></div>
                     <div className="w-2 h-16 bg-tdx-green relative shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                     <div className="w-0.5 h-4 bg-tdx-green"></div>
                     <span className="mt-1 text-xs text-tdx-accent">底分型</span>
                </div>
                <div className="flex flex-col items-center">
                     <div className="w-0.5 h-4 bg-tdx-green"></div>
                     <div className="w-2 h-10 bg-tdx-green opacity-50"></div>
                </div>
             </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            顶分型：中间K线高点最高，低点最高。<br/>
            底分型：中间K线高点最低，低点最低。<br/>
            (Top Fractal: High-High, Low-High; Bottom Fractal: High-Low, Low-Low)
          </p>
        </div>

        {/* Bi (Stroke) Visualization - ENHANCED */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
           <h3 className="text-lg font-semibold text-white mb-4">笔的构成 (Bi Structure)</h3>
           <div className="w-full h-40 bg-slate-900/50 rounded flex items-center justify-center relative p-4 border border-slate-800">
              <svg viewBox="0 0 300 150" className="w-full h-full">
                  {/* Top Fractal: Bars 1, 2, 3 */}
                  {/* Bar 1: Rising */}
                  <rect x="20" y="60" width="8" height="40" fill="#ef4444" opacity="0.5" />
                  <line x1="24" y1="50" x2="24" y2="100" stroke="#ef4444" strokeWidth="1" />
                  
                  {/* Bar 2: Top (High High) */}
                  <rect x="40" y="30" width="8" height="50" fill="#ef4444" />
                  <line x1="44" y1="20" x2="44" y2="80" stroke="#ef4444" strokeWidth="1" />
                  <text x="44" y="15" fill="#ef4444" fontSize="12" textAnchor="middle">顶 (Top)</text>

                  {/* Bar 3: Falling */}
                  <rect x="60" y="50" width="8" height="40" fill="#10b981" opacity="0.5" />
                  <line x1="64" y1="50" x2="64" y2="90" stroke="#10b981" strokeWidth="1" />

                  {/* Independent Bar (Crucial for Bi) */}
                  <rect x="90" y="70" width="8" height="30" fill="#10b981" opacity="0.3" />
                  <line x1="94" y1="65" x2="94" y2="105" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2"/>
                  <text x="94" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">独立K线 (Indep. Bar)</text>

                  {/* Bottom Fractal: Bars 5, 6, 7 */}
                  {/* Bar 5: Falling into bot */}
                  <rect x="120" y="80" width="8" height="40" fill="#10b981" opacity="0.5" />
                  <line x1="124" y1="80" x2="124" y2="120" stroke="#10b981" strokeWidth="1" />

                  {/* Bar 6: Bottom (Low Low) */}
                  <rect x="140" y="100" width="8" height="40" fill="#10b981" />
                  <line x1="144" y1="90" x2="144" y2="140" stroke="#10b981" strokeWidth="1" />
                  <text x="144" y="152" fill="#10b981" fontSize="12" textAnchor="middle">底 (Bot)</text>

                  {/* Bar 7: Rising */}
                  <rect x="160" y="90" width="8" height="40" fill="#ef4444" opacity="0.5" />
                  <line x1="164" y1="80" x2="164" y2="130" stroke="#ef4444" strokeWidth="1" />

                  {/* The Bi Line */}
                  <line x1="44" y1="20" x2="144" y2="140" stroke="#fbbf24" strokeWidth="3" opacity="0.8" />
                  <circle cx="44" cy="20" r="3" fill="#fbbf24" />
                  <circle cx="144" cy="140" r="3" fill="#fbbf24" />
              </svg>
           </div>
           <p className="mt-4 text-sm text-slate-400">
             严格笔定义：<br/>
             1. 必须连接一个顶分型和一个底分型。<br/>
             2. 顶底分型之间至少包含一根不属于分型的独立K线。<br/>
             (Strict Bi: Connects Top & Bottom Fractals with at least one independent bar in between.)
           </p>
        </div>

         {/* Pivot Visualization */}
         <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600 col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">中枢 (Zhong Shu / Pivot)</h3>
            <svg viewBox="0 0 400 120" className="w-full h-40 bg-slate-900/50 rounded">
                {/* Trend Up */}
                <path d="M 20 100 L 60 40 L 100 80 L 140 50 L 180 90 L 220 30" stroke="#64748b" strokeWidth="1" fill="none" />
                
                {/* Pivot Box 1 - Overlap of first 3 sub-segments */}
                <rect x="60" y="50" width="120" height="30" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="2" strokeDasharray="5,5" />
                <text x="100" y="70" fill="#34d399" fontSize="12">中枢 A (Pivot A)</text>

                {/* Third Buy Point */}
                 <circle cx="220" cy="30" r="4" fill="#fbbf24" />
                 <text x="230" y="30" fill="#fbbf24" fontSize="12">3买 (3rd Buy)</text>
            </svg>
            <p className="mt-4 text-sm text-slate-400">
                中枢：某级别走势类型中，被至少三个连续次级别走势类型所重叠的部分。<br/>
                (Pivot: The overlapping range of at least three consecutive sub-level trends.)
            </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-tdx-accent my-6">进阶形态 (Advanced Patterns)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Segment Destruction (Duan Break) */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
           <h3 className="text-lg font-semibold text-white mb-4">线段破坏 (Segment Destruction)</h3>
           <div className="w-full h-48 bg-slate-900/50 rounded flex items-center justify-center relative p-4 border border-slate-800">
             <svg viewBox="0 0 300 150" className="w-full h-full">
               {/* Original Up Segment */}
               <path d="M 20 130 L 60 40" stroke="#ef4444" strokeWidth="2" />
               <text x="40" y="90" fill="#ef4444" fontSize="10" transform="rotate(-65 40,90)">Up Seg</text>

               {/* Destruction Sequence */}
               {/* 1. Down Stroke */}
               <path d="M 60 40 L 100 90" stroke="#10b981" strokeWidth="2" />
               
               {/* 2. Rebound Stroke (Lower High) */}
               <path d="M 100 90 L 140 60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
               <circle cx="140" cy="60" r="3" fill="#fbbf24" />
               <text x="145" y="55" fill="#fbbf24" fontSize="10">2卖(Lower High)</text>

               {/* 3. Confirming Down Stroke (Breaks Low) */}
               <path d="M 140 60 L 180 120" stroke="#10b981" strokeWidth="2" />
               
               {/* Feature Sequence Rect */}
               <rect x="100" y="60" width="40" height="30" fill="none" stroke="#64748b" strokeDasharray="2,2" />
               <text x="120" y="80" fill="#64748b" fontSize="10" textAnchor="middle">特征序列</text>

               <line x1="20" y1="130" x2="300" y2="130" stroke="#334155" strokeWidth="1" />
             </svg>
           </div>
           <p className="mt-4 text-sm text-slate-400">
             线段被破坏的标志：出现反向线段。特征序列出现顶分型且后续一笔跌破前低。<br/>
             (Segment Break: Confirmed when a counter-segment forms, indicated by a lower high and lower low sequence.)
           </p>
        </div>

        {/* Trend Continuation */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
           <h3 className="text-lg font-semibold text-white mb-4">趋势延伸 (Trend Continuation)</h3>
           <div className="w-full h-48 bg-slate-900/50 rounded flex items-center justify-center relative p-4 border border-slate-800">
              <svg viewBox="0 0 300 150" className="w-full h-full">
                  {/* Trend Path: a + A + b + B + c */}
                  <path d="M 10 120 L 40 80" stroke="#ef4444" strokeWidth="2" /> {/* a */}
                  
                  {/* Pivot A */}
                  <rect x="40" y="60" width="50" height="40" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1" />
                  <text x="65" y="85" fill="#34d399" fontSize="12" textAnchor="middle">A</text>
                  
                  <path d="M 90 80 L 140 50" stroke="#ef4444" strokeWidth="2" /> {/* b */}
                  
                  {/* Pivot B (Higher) */}
                  <rect x="140" y="30" width="50" height="40" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1" />
                  <text x="165" y="55" fill="#34d399" fontSize="12" textAnchor="middle">B</text>

                  <path d="M 190 50 L 240 10" stroke="#ef4444" strokeWidth="2" /> {/* c */}

                  <text x="25" y="110" fill="#94a3b8" fontSize="10">a</text>
                  <text x="115" y="75" fill="#94a3b8" fontSize="10">b</text>
                  <text x="215" y="40" fill="#94a3b8" fontSize="10">c</text>

                  {/* Conditions */}
                  <text x="150" y="130" fill="#white" fontSize="11" textAnchor="middle">标准趋势：包含两个同向不重叠的中枢 (a+A+b+B+c)</text>
              </svg>
           </div>
           <p className="mt-4 text-sm text-slate-400">
             趋势：至少包含两个同级别且方向相同的中枢(A, B)，且B高于A。<br/>
             (Trend: Contains at least two pivots of the same level and direction.)
           </p>
        </div>

        {/* Pivot Expansion (Simulating "Reverse/Complex" Zhong Shu) */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600 col-span-1 md:col-span-2">
           <h3 className="text-lg font-semibold text-white mb-4">中枢扩展 (Pivot Expansion / Level Upgrade)</h3>
           <div className="w-full h-48 bg-slate-900/50 rounded flex items-center justify-center relative p-4 border border-slate-800">
               <svg viewBox="0 0 600 150" className="w-full h-full">
                  {/* Pivot A */}
                  <rect x="50" y="80" width="80" height="40" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1" />
                  <text x="90" y="105" fill="#34d399" fontSize="12" textAnchor="middle">5m Pivot A</text>

                  {/* Movement Up and Pullback overlapping A */}
                  <path d="M 130 80 L 160 40 L 190 90" stroke="#fbbf24" strokeWidth="2" fill="none" />
                  
                  {/* Pivot B (Overlapping A) */}
                  <rect x="190" y="70" width="80" height="40" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1" />
                  <text x="230" y="95" fill="#34d399" fontSize="12" textAnchor="middle">5m Pivot B</text>

                  {/* Large Box encapsulating both */}
                  <rect x="50" y="60" width="220" height="80" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="160" y="50" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="bold">30m Pivot (Expansion)</text>

                  <text x="350" y="80" fill="#94a3b8" fontSize="12">
                     当两个同级别中枢出现重叠(ZG_B &lt; ZD_A or ZD_B &gt; ZG_A?? No, Overlap!)<br/>
                     Or fluctuations expand the range.<br/>
                     Level Upgrades: 5m + 5m -> 30m.
                  </text>
               </svg>
           </div>
           <p className="mt-4 text-sm text-slate-400">
             中枢扩展：围绕中枢的震荡幅度扩大，或两个连续中枢发生重叠，导致中枢级别升级 (例如5分钟升级为30分钟)。<br/>
             (Pivot Expansion: Range expands or pivots overlap, causing the trend level to upgrade, e.g., 5m to 30m.)
           </p>
        </div>
      </div>

      {/* New Section: Historical Trend Simulation */}
      <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-600">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">实战案例演练 (Historical Pattern Simulation)</h3>
          <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-tdx-accent bg-tdx-accent/20"></div>
                  <span className="text-slate-400">中枢 (Pivot)</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-yellow-400"></div>
                  <span className="text-slate-400">笔 (Stroke)</span>
              </div>
          </div>
        </div>
        
        <div className="w-full aspect-[2/1] bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800">
           <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="0" y1="100" x2="800" y2="100" stroke="#1e293b" strokeWidth="1" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#1e293b" strokeWidth="1" />
              <line x1="0" y1="300" x2="800" y2="300" stroke="#1e293b" strokeWidth="1" />
              
              {/* Mock Candlesticks (Simplified as high-low lines) */}
              <path d="M 50 350 L 50 300 M 80 320 L 80 280 M 110 330 L 110 290 M 140 280 L 140 240 M 170 260 L 170 300" stroke="#334155" strokeWidth="2" />
              
              {/* Complex Trend Path (Stroke/Bi) */}
              {/* 
                 Start: 50,320 
                 Up to A: 140,240
                 Down to B: 200,290 
                 Up to C: 280,220
                 Down to D: 350,260  
                 Up to E: 450,150  (Breakout)
                 Down to F: 520,200 (3rd Buy - Above pivot)
                 Up to G: 650,80
                 Down to H: 720,130 (Divergence?)
              */}
              <path 
                d="M 50 320 L 140 240 L 200 290 L 280 220 L 350 260 L 450 150 L 520 200 L 650 80 L 720 130" 
                stroke="#fbbf24" 
                strokeWidth="2" 
                fill="none" 
              />
              
              {/* Pivot Box (B-C-D range) */}
              {/* 
                 B: 200,290 (Low)
                 C: 280,220 (High)
                 D: 350,260 (Low)
                 Prev High A: 140,240
                 
                 Standard Pivot def: Overlap of [A-B], [B-C], [C-D]
                 [A-B] range Y: 240-290
                 [B-C] range Y: 290-220
                 [C-D] range Y: 220-260
                 
                 Overlap: Y 240 to 260 is the core pivot zone.
              */}
              <rect x="140" y="220" width="210" height="70" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1" strokeDasharray="4,4" />
              <text x="150" y="215" fill="#34d399" fontSize="14" className="font-mono">中枢 (Pivot A)</text>

              {/* Annotations */}
              <circle cx="200" cy="290" r="4" fill="#34d399" />
              <text x="200" y="310" fill="#94a3b8" fontSize="12" textAnchor="middle">2买 (2nd Buy)</text>

              <circle cx="520" cy="200" r="4" fill="#ef4444" />
              <text x="520" y="225" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">3买 (3rd Buy)</text>
              <text x="520" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle">Breakout confirmation</text>

              <circle cx="720" cy="130" r="4" fill="#ef4444" />
              <text x="720" y="150" fill="#94a3b8" fontSize="12" textAnchor="middle">1卖 (1st Sell)</text>
              <text x="720" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">Trend Exhaustion</text>

              {/* Volume Bars Simulation at bottom */}
              <rect x="50" y="360" width="10" height="30" fill="#ef4444" opacity="0.5" />
              <rect x="140" y="360" width="10" height="40" fill="#10b981" opacity="0.6" />
              <rect x="450" y="360" width="10" height="50" fill="#10b981" opacity="0.8" />
              <text x="465" y="355" fill="#10b981" fontSize="10">放量突破 (High Vol)</text>
           </svg>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
           <div className="p-3 bg-slate-900/50 rounded border border-slate-700">
              <span className="text-tdx-accent font-bold">1. 中枢构建</span>
              <p className="mt-1 text-xs">价格在区间内反复震荡 (A-B-C-D)，均线纠缠，多空博弈平衡。</p>
           </div>
           <div className="p-3 bg-slate-900/50 rounded border border-slate-700">
              <span className="text-tdx-red font-bold">2. 离开段 & 3买</span>
              <p className="mt-1 text-xs">强势突破中枢 (E)，回踩不进入中枢范围 (F)，确认趋势上涨。</p>
           </div>
           <div className="p-3 bg-slate-900/50 rounded border border-slate-700">
              <span className="text-yellow-400 font-bold">3. 趋势背驰</span>
              <p className="mt-1 text-xs">上涨动能减弱 (G-H)，MACD面积缩小，形成第一卖点。</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;