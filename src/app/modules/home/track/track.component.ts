import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-track-stock',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackStockComponent implements OnInit {
  @Output() trackStockEvent = new EventEmitter<string>();

  trackStockForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.trackStockForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  trackStock() {
    this.trackStockEvent.emit(this.trackStockForm.value.name);
  }
}
