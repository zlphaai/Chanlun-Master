import React, { useState, useEffect } from 'react';
import { FormulaConfig } from '../types';
import { Icons } from './Icon';

const BASE_HEADER = `{通达信缠论公式}`;

const FormulaGenerator: React.FC = () => {
  const [config, setConfig] = useState<FormulaConfig>({
    mode: 'MAIN_CHART',
    kLineInclusion: true,
    showBi: true,
    showDuan: false,
    showZhongShu: false,
    showBSPoints: false,
    colorScheme: 'modern',
    scanSignal: 'FRACTAL_BOT'
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (config.mode === 'MAIN_CHART') {
      generateMainChartCode();
    } else {
      generateScannerCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const generateMainChartCode = () => {
    // Fix: Wrap description in curly braces to prevent syntax error
    let code = `${BASE_HEADER}
{类型: 主图 (Main Chart)}
{警告: 本公式使用未来函数 (PEAK/TROUGH) 以实现准确的画线功能，仅供复盘分析，实盘请谨慎。}

{参数设置}
BI_K:=3;   {笔力度: 3%}
DUAN_K:=10; {线段力度: 10%}

{基本均线}
MA5:MA(CLOSE,5),COLORWHITE;
MA10:MA(CLOSE,10),COLORYELLOW;
`;

    if (config.kLineInclusion) {
      code += `
{K线绘制}
DRAWKLINE(HIGH,OPEN,LOW,CLOSE);
`;
    }

    if (config.showBi) {
      code += `
{笔 (Bi) - 基于ZigZag的高低点连接}
{使用 PEAK/TROUGH 函数定位转折点}
BI_TOP := PEAK(1, BI_K, 1);
BI_BOT := TROUGH(2, BI_K, 1);

{画笔连线}
DRAWLINE(PEAKBARS(1, BI_K, 1)=0, HIGH, TROUGHBARS(2, BI_K, 1)=0, LOW, 0), ${config.colorScheme === 'modern' ? 'COLORFF00FF' : 'COLORYELLOW'};
DRAWLINE(TROUGHBARS(2, BI_K, 1)=0, LOW, PEAKBARS(1, BI_K, 1)=0, HIGH, 0), ${config.colorScheme === 'modern' ? 'COLORFF00FF' : 'COLORYELLOW'};
`;
    }

    if (config.showDuan) {
      code += `
{线段 (Duan) - 更大级别的ZigZag}
DUAN_TOP := PEAK(1, DUAN_K, 1);
DUAN_BOT := TROUGH(2, DUAN_K, 1);

{画线段}
DRAWLINE(PEAKBARS(1, DUAN_K, 1)=0, HIGH, TROUGHBARS(2, DUAN_K, 1)=0, LOW, 0), COLORRED, LINETHICK2;
DRAWLINE(TROUGHBARS(2, DUAN_K, 1)=0, LOW, PEAKBARS(1, DUAN_K, 1)=0, HIGH, 0), COLORRED, LINETHICK2;
`;
    }

    if (config.showZhongShu) {
      code += `
{中枢 (Pivot) - 基于最近三笔的重叠区}
{逻辑：最近的前高、前低、前前高、前前低}
T1:=PEAK(1, BI_K, 1);
B1:=TROUGH(2, BI_K, 1);
T2:=PEAK(1, BI_K, 2);
B2:=TROUGH(2, BI_K, 2);

{计算重叠区间 (ZG=中枢高, ZD=中枢低)}
{简单中枢: 取最近两个高点的较小值，和最近两个低点的较大值}
ZG:=MIN(T1, T2);
ZD:=MAX(B1, B2);

{画中枢矩形 (当有重叠且在转折点附近绘制)}
STICKLINE(ZG > ZD AND (PEAKBARS(1,BI_K,1)=0 OR TROUGHBARS(2,BI_K,1)=0), ZG, ZD, 10, 0), COLORBROWN;
`;
    }

    if (config.showBSPoints) {
      code += `
{买卖点 (Buy/Sell) - 结合形态与MACD}
DIFF:=EMA(CLOSE,12) - EMA(CLOSE,26);
DEA:=EMA(DIFF,9);
MACD:=2*(DIFF-DEA);

{1买 (1B): 底背驰 + 新低}
{MACD红柱缩短或底背离}
B1_COND:=TROUGHBARS(2, BI_K, 1)=0 AND MACD > REF(MACD, 1) AND LOW < REF(LOW, 20);
DRAWTEXT(B1_COND, LOW*0.98, '1B'), COLORRED;
DRAWICON(B1_COND, LOW*0.98, 1);

{2买 (2B): 次级别回踩不破前低}
{逻辑: 当前是底, 且高于上一个底 (Current Low > Prev Low)}
B2_VAL:=TROUGH(2, BI_K, 1);
B3_VAL:=TROUGH(2, BI_K, 2);
B2_COND:=TROUGHBARS(2, BI_K, 1)=0 AND B2_VAL > B3_VAL;
DRAWTEXT(B2_COND, LOW*0.98, '2B'), COLORMAGENTA;
DRAWICON(B2_COND, LOW*0.98, 1);

{1卖 (1S): 顶背驰 + 新高}
S1_COND:=PEAKBARS(1, BI_K, 1)=0 AND MACD < REF(MACD, 1) AND HIGH > REF(HIGH, 20);
DRAWTEXT(S1_COND, HIGH*1.02, '1S'), COLORGREEN;
DRAWICON(S1_COND, HIGH*1.02, 2);

{2卖 (2S): 反弹不过前高}
{逻辑: 当前是顶, 且低于上一个顶 (Current High < Prev High)}
T2_VAL:=PEAK(1, BI_K, 1);
T3_VAL:=PEAK(1, BI_K, 2);
S2_COND:=PEAKBARS(1, BI_K, 1)=0 AND T2_VAL < T3_VAL;
DRAWTEXT(S2_COND, HIGH*1.02, '2S'), COLORLIBLUE;
DRAWICON(S2_COND, HIGH*1.02, 2);
`;
    }

    setGeneratedCode(code);
  };

  const generateScannerCode = () => {
    // Fix: Wrap description in curly braces
    let code = `${BASE_HEADER}
{类型: 选股 (Stock Scanner)}
{注意：选股公式输出为布尔值，XG=1表示选中}
{选股公式避免使用未来函数(PEAK/ZIG)，采用严格分型逻辑}

{分型定义}
TOP_FX:=HIGH>REF(HIGH,1) AND HIGH>REFX(HIGH,1);
BOT_FX:=LOW<REF(LOW,1) AND LOW<REFX(LOW,1);
`;
    
    if (config.scanSignal === 'FRACTAL_BOT') {
      code += `
{选股策略：强底分型}
{条件：出现底分型，且当前收盘价站上5日均线}
XG: BOT_FX AND CLOSE > MA(CLOSE, 5);
`;
    } else if (config.scanSignal === 'MACD_DIVERGENCE') {
      code += `
{选股策略：底背驰 (MACD Divergence)}
DIFF:=EMA(CLOSE,12) - EMA(CLOSE,26);
DEA:=EMA(DIFF,9);
MACD:=2*(DIFF-DEA);

{价格创新低: 20日新低}
LOW_NEW:=LOW < REF(LLV(LOW, 20), 1);
{MACD未创新低}
MACD_STRONG:=MACD > REF(LLV(MACD, 20), 1);

XG: LOW_NEW AND MACD_STRONG AND BOT_FX;
`;
    } else if (config.scanSignal === 'BUY_2') {
      code += `
{选股策略：二买近似 (2nd Buy Point)}
{逻辑：最近一次底分型的低点 > 前一次底分型的低点}
{寻找前一个底分型的位置}
LAST_BOT_BARS:=BARSLAST(BOT_FX);
LAST_BOT_LOW:=REF(LOW, LAST_BOT_BARS);

{寻找再前一个底分型}
PREV_BOT_BARS:=REF(BARSLAST(BOT_FX), LAST_BOT_BARS + 1) + LAST_BOT_BARS + 1;
PREV_BOT_LOW:=REF(LOW, PREV_BOT_BARS);

{条件: 当前是底分型 + 低点抬高 + 站上均线}
XG: BOT_FX AND LOW > PREV_BOT_LOW AND CLOSE > MA(CLOSE, 5);
`;
    } else if (config.scanSignal === 'BUY_3') {
      code += `
{选股策略：三买近似 (3rd Buy Point)}
{逻辑：突破长期均线后回踩不破}
MA60:=MA(CLOSE, 60);
{在60日线上方}
ABOVE_MA:=LOW > MA60;
{均线多头排列}
MA_UP:=MA(CLOSE,10) > MA(CLOSE,30) AND MA(CLOSE,30) > MA60;

XG: BOT_FX AND ABOVE_MA AND MA_UP;
`;
    } else if (config.scanSignal === 'TREND_REVERSAL') {
      code += `
{选股策略：趋势转折}
MA60:=MA(CLOSE, 60);
DOWN_TREND:=MA60 < REF(MA60, 1) AND CLOSE < MA60; 

{MACD金叉}
DIFF:=EMA(CLOSE,12) - EMA(CLOSE,26);
DEA:=EMA(DIFF,9);
MACD_GOLD:=CROSS(DIFF, DEA);

{放量}
VOL_UP:=VOL > MA(VOL, 20) * 1.5;

XG: DOWN_TREND AND BOT_FX AND MACD_GOLD AND VOL_UP;
`;
    } else if (config.scanSignal === 'PIVOT_BREAKOUT') {
      code += `
{选股策略：中枢突破}
N:=20; 
HH:=HHV(HIGH, N);
LL:=LLV(LOW, N);
AMPLITUDE:=(HH-LL)/LL * 100;

CONSOLIDATION:=AMPLITUDE < 15;
BREAKOUT:=CLOSE > REF(HH, 1) AND CLOSE > OPEN;
VOL_UP:=VOL > MA(VOL, 5) * 2;

XG: CONSOLIDATION AND BREAKOUT AND VOL_UP;
`;
    } else if (config.scanSignal === 'DUAN_BOT') {
      code += `
{选股策略：线段底 (大级别底)}
MA60:=MA(CLOSE, 60);
SEG_DOWN:=MA60 < REF(MA60, 1) AND CLOSE < MA60;

DIFF:=EMA(CLOSE,12) - EMA(CLOSE,26);
MACD_LOW:=DIFF > REF(LLV(DIFF, 30), 1); 
PRICE_LOW:=LOW < REF(LLV(LOW, 30), 1);

XG: SEG_DOWN AND BOT_FX AND PRICE_LOW AND MACD_LOW;
`;
    } else if (config.scanSignal === 'ZS_NEW') {
      code += `
{选股策略：新生中枢 (均线粘合)}
MA5:=MA(C,5);
MA10:=MA(C,10);
MA20:=MA(C,20);
MAX_MA:=MAX(MA5, MAX(MA10, MA20));
MIN_MA:=MIN(MA5, MIN(MA10, MA20));
TANGLED:=(MAX_MA - MIN_MA) / MIN_MA * 100 < 3; 

N:=10;
HH:=HHV(HIGH, N);
LL:=LLV(LOW, N);
RANGE_PCT:=(HH-LL)/LL * 100;
IS_BOX:=RANGE_PCT < 8; 

VOL_SHRINK:=VOL < MA(VOL, 20);

XG: TANGLED AND IS_BOX AND VOL_SHRINK;
`;
    }

    setGeneratedCode(code);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Configuration Panel */}
      <div className="bg-tdx-panel border border-slate-700 rounded-xl p-6 shadow-xl flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-tdx-accent">
          <Icons.Settings size={24} />
          <h2 className="text-xl font-bold">配置参数 (Settings)</h2>
        </div>

        {/* Mode Switcher */}
        <div className="flex p-1 bg-slate-900 rounded-lg mb-8 border border-slate-700">
            <button
                onClick={() => setConfig({...config, mode: 'MAIN_CHART'})}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    config.mode === 'MAIN_CHART' 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
            >
                <div className="flex items-center justify-center gap-2">
                    <Icons.Activity size={16} />
                    主图指标 (Main Chart)
                </div>
            </button>
            <button
                onClick={() => setConfig({...config, mode: 'STOCK_SCANNER'})}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    config.mode === 'STOCK_SCANNER' 
                    ? 'bg-tdx-accent text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
            >
                <div className="flex items-center justify-center gap-2">
                    <Icons.Filter size={16} />
                    选股公式 (Scanner)
                </div>
            </button>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            
          {/* Main Chart Settings */}
          {config.mode === 'MAIN_CHART' && (
              <>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">基础定义 (Basics)</h3>
                    
                    <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition">
                    <span className="text-slate-200">K线 (K-Line)</span>
                    <input 
                        type="checkbox" 
                        checked={config.kLineInclusion}
                        onChange={(e) => setConfig({...config, kLineInclusion: e.target.checked})}
                        className="w-5 h-5 accent-tdx-accent rounded focus:ring-tdx-accent" 
                    />
                    </label>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">可视化 (Visualization)</h3>
                    
                    <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition">
                    <div className="flex items-center gap-2">
                        <Icons.TrendingUp size={18} className="text-yellow-400" />
                        <span className="text-slate-200">显示笔 (Show Bi)</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={config.showBi}
                        onChange={(e) => setConfig({...config, showBi: e.target.checked})}
                        className="w-5 h-5 accent-tdx-accent rounded" 
                    />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition">
                    <div className="flex items-center gap-2">
                        <Icons.Activity size={18} className="text-red-400" />
                        <span className="text-slate-200">显示线段 (Show Duan)</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={config.showDuan}
                        onChange={(e) => setConfig({...config, showDuan: e.target.checked})}
                        className="w-5 h-5 accent-tdx-accent rounded" 
                    />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-blue-400"></div>
                        <span className="text-slate-200">显示中枢 (Show Center/Pivot)</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={config.showZhongShu}
                        onChange={(e) => setConfig({...config, showZhongShu: e.target.checked})}
                        className="w-5 h-5 accent-tdx-accent rounded" 
                    />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition">
                    <div className="flex items-center gap-2">
                        <Icons.Target size={18} className="text-tdx-accent" />
                        <span className="text-slate-200">显示买卖点 (Show Buy/Sell Points)</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={config.showBSPoints}
                        onChange={(e) => setConfig({...config, showBSPoints: e.target.checked})}
                        className="w-5 h-5 accent-tdx-accent rounded" 
                    />
                    </label>
                </div>
                
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">配色方案 (Theme)</h3>
                    <div className="flex gap-4">
                        <button 
                        onClick={() => setConfig({...config, colorScheme: 'classic'})}
                        className={`flex-1 py-2 rounded-lg border ${config.colorScheme === 'classic' ? 'border-tdx-accent bg-tdx-accent/10 text-white' : 'border-slate-600 text-slate-400'}`}
                        >
                        经典 (Classic)
                        </button>
                        <button 
                        onClick={() => setConfig({...config, colorScheme: 'modern'})}
                        className={`flex-1 py-2 rounded-lg border ${config.colorScheme === 'modern' ? 'border-tdx-accent bg-tdx-accent/10 text-white' : 'border-slate-600 text-slate-400'}`}
                        >
                        现代 (Modern)
                        </button>
                    </div>
                </div>
              </>
          )}

          {/* Scanner Settings */}
          {config.mode === 'STOCK_SCANNER' && (
              <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">选股策略 (Strategy)</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'FRACTAL_BOT' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'FRACTAL_BOT'}
                              onChange={() => setConfig({...config, scanSignal: 'FRACTAL_BOT'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'FRACTAL_BOT' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'FRACTAL_BOT' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div>
                              <div className="text-slate-200 font-medium">强底分型 (Strong Bot Fractal)</div>
                              <div className="text-xs text-slate-500">底分型确立 + 站上5日线</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'MACD_DIVERGENCE' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'MACD_DIVERGENCE'}
                              onChange={() => setConfig({...config, scanSignal: 'MACD_DIVERGENCE'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'MACD_DIVERGENCE' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'MACD_DIVERGENCE' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div>
                              <div className="text-slate-200 font-medium">底背驰 (MACD Divergence)</div>
                              <div className="text-xs text-slate-500">价格新低但MACD动能未新低</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'BUY_2' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'BUY_2'}
                              onChange={() => setConfig({...config, scanSignal: 'BUY_2'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'BUY_2' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'BUY_2' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div>
                              <div className="text-slate-200 font-medium">二买近似 (2nd Buy Point)</div>
                              <div className="text-xs text-slate-500">次级别回踩不破前低</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'BUY_3' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'BUY_3'}
                              onChange={() => setConfig({...config, scanSignal: 'BUY_3'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'BUY_3' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'BUY_3' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div>
                              <div className="text-slate-200 font-medium">三买近似 (3rd Buy Point)</div>
                              <div className="text-xs text-slate-500">突破中枢后的回踩确认</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'DUAN_BOT' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'DUAN_BOT'}
                              onChange={() => setConfig({...config, scanSignal: 'DUAN_BOT'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'DUAN_BOT' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'DUAN_BOT' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-slate-200 font-medium">线段底 (Seg Bottom)</div>
                                <Icons.GitMerge size={14} className="text-purple-400" />
                              </div>
                              <div className="text-xs text-slate-500">大级别下跌末端背驰</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'ZS_NEW' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'ZS_NEW'}
                              onChange={() => setConfig({...config, scanSignal: 'ZS_NEW'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'ZS_NEW' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'ZS_NEW' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-slate-200 font-medium">新生中枢 (New Pivot)</div>
                                <Icons.BoxSelect size={14} className="text-orange-400" />
                              </div>
                              <div className="text-xs text-slate-500">缩量区间震荡 + 均线纠缠</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'TREND_REVERSAL' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'TREND_REVERSAL'}
                              onChange={() => setConfig({...config, scanSignal: 'TREND_REVERSAL'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'TREND_REVERSAL' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'TREND_REVERSAL' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-slate-200 font-medium">趋势转折 (Reversal)</div>
                                <Icons.Zap size={14} className="text-yellow-400" />
                              </div>
                              <div className="text-xs text-slate-500">下跌力竭 + 分型 + 量能确认</div>
                          </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${config.scanSignal === 'PIVOT_BREAKOUT' ? 'border-tdx-accent bg-tdx-accent/10' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'}`}>
                          <input 
                              type="radio" 
                              name="scanSignal"
                              checked={config.scanSignal === 'PIVOT_BREAKOUT'}
                              onChange={() => setConfig({...config, scanSignal: 'PIVOT_BREAKOUT'})}
                              className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${config.scanSignal === 'PIVOT_BREAKOUT' ? 'border-tdx-accent' : 'border-slate-500'}`}>
                              {config.scanSignal === 'PIVOT_BREAKOUT' && <div className="w-2.5 h-2.5 bg-tdx-accent rounded-full"></div>}
                          </div>
                          <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-slate-200 font-medium">中枢突破 (Pivot Break)</div>
                                <Icons.Layers size={14} className="text-blue-400" />
                              </div>
                              <div className="text-xs text-slate-500">窄幅震荡后放量突破</div>
                          </div>
                      </label>
                  </div>
              </div>
          )}

        </div>
      </div>

      {/* Code Display Panel */}
      <div className="bg-black/50 border border-slate-700 rounded-xl p-6 shadow-xl flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-tdx-accent">
            <Icons.Terminal size={24} />
            <h2 className="text-xl font-bold">
                {config.mode === 'MAIN_CHART' ? '主图公式代码' : '选股公式代码'}
            </h2>
          </div>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition ${copied ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}
          >
            {copied ? <Icons.Check size={16} /> : <Icons.Copy size={16} />}
            {copied ? '已复制 (Copied)' : '复制 (Copy)'}
          </button>
        </div>
        
        <div className="flex-1 relative font-mono text-sm bg-[#0a0f18] p-4 rounded-lg overflow-hidden border border-slate-800">
           <textarea 
             readOnly
             value={generatedCode}
             className="w-full h-full bg-transparent text-emerald-300 resize-none focus:outline-none"
             spellCheck={false}
           />
        </div>
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
             <div className="flex gap-2">
                <Icons.Settings className="text-yellow-500 shrink-0" size={16} />
                <p className="text-xs text-yellow-200/80">
                {config.mode === 'MAIN_CHART' 
                  ? '提示：主图公式使用了PEAK/TROUGH未来函数优化画线，请在通达信"公式管理器" -> "主图" 中新建。' 
                  : '提示：选股公式不含未来函数，请在通达信"公式管理器" -> "条件选股公式" 中新建，输出必须为 XG: ... 格式。'}
                <br/>
                Disclaimer: Chanlun logic is recursive; TDX scripts are approximations.
                </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaGenerator;