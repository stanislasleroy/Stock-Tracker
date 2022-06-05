export interface Stock {
  symbol: string;
  name: string;
  changeToday: number;
  changePercentToday: number;
  openingPrice: number;
  currentPrice: number;
  highPrice: number;
  sentiment: number;
}
