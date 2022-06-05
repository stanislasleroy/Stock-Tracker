export interface SymbolResult {
  count: number;
  result: Symbol[];
}

export interface Symbol {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
}

export interface SentimentResult {
  data: Sentiment[];
}

export interface Sentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}
