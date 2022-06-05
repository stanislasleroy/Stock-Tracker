import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { TrackStockComponent } from './track/track.component';
import { StocksComponent } from './stocks/stocks.component';
import { SharedModule } from '../../shared/shared.module';
import { StockComponent } from './stocks/stock/stock.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [
    HomeComponent,
    TrackStockComponent,
    StocksComponent,
    StockComponent,
  ],
  providers: [DecimalPipe],
})
export class HomeModule {}
