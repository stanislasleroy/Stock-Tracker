import {ChangeDetectionStrategy, Component, Input,} from '@angular/core';
import {Sentiment} from '../../../shared/models/finnhub';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentimentComponent {
  @Input() sentiment: Sentiment;

  constructor() {
  }
}
