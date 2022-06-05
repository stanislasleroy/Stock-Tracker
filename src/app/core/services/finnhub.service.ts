import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Quote,
  SymbolResult,
  SentimentResult,
} from '../../shared/models/finnhub';
import { API_KEY, FINNHUB_BASE_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class FinnhubService {
  constructor(private http: HttpClient) {}

  /**
   * Search for best-matching symbols based on query
   */
  getSymbol(query: string): Observable<SymbolResult> {
    return this.http.get<SymbolResult>(
      `${FINNHUB_BASE_URL}/search?q=${query}&token=${API_KEY}`
    );
  }

  /**
   * Get real-time quote data
   */
  getQuote(symbol: string): Observable<Quote> {
    return this.http.get<Quote>(
      `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
    );
  }

  /**
   * Get insider sentiment data for US companies
   */
  getSentiment(
    symbol: string,
    startDate: string,
    endDate: string
  ): Observable<SentimentResult> {
    return this.http.get<SentimentResult>(
      `${FINNHUB_BASE_URL}/stock/insider-sentiment?symbol=${symbol}&from=${startDate}&to=${endDate}&token=${API_KEY}`
    );
  }
}
