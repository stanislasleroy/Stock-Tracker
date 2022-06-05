import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Stock} from '../../shared/models/stock';
import {StockService} from '../../core/services/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  stocks$: BehaviorSubject<Stock[]> = new BehaviorSubject<Stock[]>(new Array());

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.stockService
      .getStocks()
      .subscribe((stocks: Stock[]) => this.stocks$.next(stocks));
  }

  trackStock(symbol: string) {
    let localStocks = this.stockService.getSymbolsFromLocalStorage();

    if (!localStocks.includes(symbol)) {
      this.stockService
        .trackStock(symbol)
        .subscribe((stock: Stock) =>
          this.stocks$.next([...this.stocks$.getValue(), stock])
        );
    }
  }

  removeStock(symbol: string) {
    this.stockService.removeSymbolFromLocalStorage(symbol);
    this.stocks$.next([
      ...this.stocks$.getValue().filter((s) => s.symbol !== symbol),
    ]);
  }
}
