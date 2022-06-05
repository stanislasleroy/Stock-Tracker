import {Injectable} from '@angular/core';
import {combineLatest, forkJoin, from, Observable, of,} from 'rxjs';
import {concatMap, distinct, filter, map, mergeAll, mergeMap, tap, toArray} from 'rxjs/operators';
import {STOCK_KEY} from '../../shared/constants';
import {Sentiment, SentimentResult, Symbol, SymbolResult,} from '../../shared/models/finnhub';
import {Stock} from '../../shared/models/stock';
import {FinnhubService} from './finnhub.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private finnhubService: FinnhubService) {
  }

  /**
   * Get symbols from local storage
   */
  getSymbolsFromLocalStorage(): string[] {
    return JSON.parse(localStorage.getItem(STOCK_KEY)) ?? new Array();
  }

  /**
   * Add symbol to local storage
   */
  addSymbolToLocalStorage(stock: string): void {
    let stocks = this.getSymbolsFromLocalStorage();

    if (!this.getSymbolsFromLocalStorage().includes(stock)) {
      localStorage.setItem(STOCK_KEY, JSON.stringify([...stocks, stock]));
    }
  }

  /**
   * Remove symbol from local storage
   */
  removeSymbolFromLocalStorage(stock: string): void {
    let stocksToKeep = this.getSymbolsFromLocalStorage().filter(
      (s: string) => s !== stock
    );
    localStorage.setItem(STOCK_KEY, JSON.stringify(stocksToKeep));
  }

  /**
   * Get stock data
   *
   * Fetch symbol list in local storage,
   * then fetch stock data and quote
   */
  getStocks(): Observable<Stock[]> {
    return from(this.getSymbolsFromLocalStorage()).pipe(
      distinct(),
      mergeMap((storedSymbol: string) =>
        forkJoin({
          stock: this.finnhubService.getSymbol(storedSymbol),
          quote: this.finnhubService.getQuote(storedSymbol),
        })
      ),
      map(({stock, quote}) => {
        const s = {
          name: stock.result[0].description,
          symbol: stock.result[0].displaySymbol,
          changeToday: quote.d,
          changePercentToday: quote.dp,
          currentPrice: quote.c,
          highPrice: quote.h,
          openingPrice: quote.o,
        } as Stock;
        return s;
      }),
      toArray()
    );
  }

  /**
   * Track a given stock
   *
   * Check first if the symbol exists on Finnhub, then get quote.
   * At last, add the symbol to local storage
   */
  trackStock(symbol: string): Observable<Stock> {
    return this.finnhubService.getSymbol(symbol).pipe(
      map((r: SymbolResult) => r.result),
      mergeAll(),
      filter((s: Symbol) => s.symbol === symbol),
      concatMap((s) => {
        return combineLatest([of(s), this.finnhubService.getQuote(s.symbol)]);
      }),
      map(([symbol, quote]) => {
        const s = {
          name: symbol.description,
          symbol: symbol.displaySymbol,
          changeToday: quote.d,
          changePercentToday: quote.dp,
          currentPrice: quote.c,
          highPrice: quote.h,
          openingPrice: quote.o,
        } as Stock;
        return s;
      }),
      tap(() => this.addSymbolToLocalStorage(symbol))
    );
  }

  /**
   * Get insider sentiment data for US companies for the last 3 months
   *
   * !!! The API doesn't seem to correctly manage dates between 2 years, e.g.: [2021-12-01 ; 2022-05-01] returns []
   * Need to deal with that?
   */
  getSentimentForSymbolLast3Months(symbol: string): Observable<Sentiment[]> {
    let endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 2);
    startDate.setDate(1);

    let startDateCriterion = startDate.toISOString().split('T')[0];
    let endDateCriterion = endDate.toISOString().split('T')[0];

    return this.finnhubService
      .getSentiment(symbol, startDateCriterion, endDateCriterion)
      .pipe(map((r: SentimentResult) => r.data));
  }
}
