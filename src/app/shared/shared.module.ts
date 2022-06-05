import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { PercentageWithSymbolePipe } from './pipes/percentage-with-symbol.pipe';
import { StockTrendComponent } from './components/stock-trend/stock-trend.component';
import { ColorTrendDirective } from './directives/color-trend.directive';
import { NumberWithSymbolPipe } from './pipes/number-with-symbol.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MonthNamePipe,
    PercentageWithSymbolePipe,
    NumberWithSymbolPipe,
    StockTrendComponent,
    ColorTrendDirective,
  ],
  exports: [
    MonthNamePipe,
    PercentageWithSymbolePipe,
    NumberWithSymbolPipe,
    StockTrendComponent,
    ColorTrendDirective,
  ],
  providers: [NumberWithSymbolPipe],
})
export class SharedModule {}
