import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {concatMap, map, shareReplay, switchMap} from 'rxjs/operators';
import {FinnhubService} from '../../core/services/finnhub.service';
import {StockService} from '../../core/services/stock.service';
import {Sentiment, Symbol} from '../../shared/models/finnhub';

@Component({
  selector: 'app-sentiments',
  templateUrl: './sentiments.component.html',
  styleUrls: ['./sentiments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentimentsComponent implements OnInit {
  sentiments$: Observable<Sentiment[]>;
  symbol$: Observable<Symbol>;
  finnhubService: any;

  constructor(
    private router: Router,

    private activeRoute: ActivatedRoute,
    private stockService: StockService,
    private finnhub: FinnhubService
  ) {}

  ngOnInit() {
    let symbolName$ = this.activeRoute.params.pipe(
      map((params: Params) => params['symbol']),
      shareReplay(1)
    );

    this.symbol$ = symbolName$.pipe(
      concatMap((symbolName: string) => {
        return combineLatest([
          of(symbolName),
          this.finnhub.getSymbol(symbolName),
        ]);
      }),
      map(([symbolName, symbolResult]) => {
        return symbolResult.result.find(
          (symbol: Symbol) => symbol.symbol === symbolName
        );
      })
    );

    this.sentiments$ = symbolName$.pipe(
      switchMap((symbolName: string) =>
        this.stockService.getSentimentForSymbolLast3Months(symbolName)
      )
    );
  }

  backToHome(): void {
    this.router.navigateByUrl('home');
  }
}
