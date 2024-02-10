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
