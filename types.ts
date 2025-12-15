export type FormulaMode = 'MAIN_CHART' | 'STOCK_SCANNER';

export interface FormulaConfig {
  mode: FormulaMode;
  // Common Settings
  kLineInclusion: boolean; // 是否处理K线包含关系
  
  // Main Chart Settings
  showBi: boolean;         // 显示笔
  showDuan: boolean;       // 显示段
  showZhongShu: boolean;   // 显示中枢
  showBSPoints: boolean;   // 显示买卖点
  colorScheme: 'classic' | 'modern';

  // Scanner Settings
  scanSignal: 'FRACTAL_BOT' | 'BUY_2' | 'BUY_3' | 'MACD_DIVERGENCE' | 'TREND_REVERSAL' | 'PIVOT_BREAKOUT' | 'DUAN_BOT' | 'ZS_NEW';
}

export enum Tab {
  GENERATOR = 'GENERATOR',
  CHAT = 'CHAT',
  LEARN = 'LEARN'
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}