import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentimentsComponent } from './sentiments.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

export const sentimentsRouteList: Routes = [
  {
    path: '',
    component: SentimentsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sentimentsRouteList),
    SharedModule,
  ],
  declarations: [SentimentsComponent, SentimentComponent],
  exports: [SentimentsComponent, SentimentComponent],
})
export class SentimentsModule {}
