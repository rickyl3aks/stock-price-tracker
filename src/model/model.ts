export interface StockMarket {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: [
    {
      v: number;
      vw: number;
      o: number;
      c: number;
      h: number;
      l: number;
      t: number;
      n: number;
    }
  ];
  status: string;
  request_id: string;
  count: number;
}

export interface StockResults {
  v?: string;
  vw: string;
  o: string;
  c: string;
  h: string;
  l: string;
  n?: string;
}

export interface dailyResults {
  afterHours: number;
  close: number;
  from: string;
  high: number;
  low: number;
  open: number;
  preMarket: number;
  status: string;
  symbol: string;
  volume: number;
}

export interface DailyStock {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  afterHours: string;
  preMarket: string;
}

export const stockSymbolLegend = ["Apple", "Amazon.com, Inc", "British Airways plc", "British Sky Broadcasting Group, plc", "Google"];

export const stockSymbol = ["AAPL", "AMZN", "BAB", "BSY", "GOOG"];

export const stocks = [
  {
    AAPL: "Apple",
    AMZN: "Amazon.com, Inc",
    BAB: "British Airways plc",
    BSY: "British Sky Broadcasting Group, plc",
    GOOG: "Google",
  },
];

export const stocksLegend = [
  {
    AAPL: "Apple",
    AMZN: "Amazon.com, Inc",
    BAB: "British Airways plc",
    BSY: "British Sky Broadcasting Group, plc",
    GOOG: "Google",
  },
];
