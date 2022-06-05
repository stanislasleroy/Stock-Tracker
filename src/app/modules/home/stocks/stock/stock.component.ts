import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../../../../shared/models/stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockComponent {
  @Input() stock: Stock;
  @Output() removeStockEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  removeStock(stockName: string) {
    this.removeStockEvent.emit(stockName);
  }

  displaySentiment(stockName: string) {
    this.router.navigateByUrl(`/sentiment/${stockName}`);
  }
}
