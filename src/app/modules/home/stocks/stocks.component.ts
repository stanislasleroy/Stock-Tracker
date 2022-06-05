import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Stock } from '../../../shared/models/stock';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StocksComponent {
  @Input() stocks: Stock[];
  @Output() removeStockEvent = new EventEmitter<string>();

  constructor() {}

  identify(index: number, stock: Stock) {
    return stock.symbol;
  }

  removeStock(stockName: string) {
    this.removeStockEvent.emit(stockName);
  }
}
