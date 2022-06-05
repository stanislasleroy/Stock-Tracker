import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-trend',
  templateUrl: './stock-trend.component.html',
  styleUrls: ['./stock-trend.component.css'],
})
export class StockTrendComponent {
  @Input() change: number;

  constructor() {}
}
