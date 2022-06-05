import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorTrend]',
})
export class ColorTrendDirective implements OnInit {
  @Input() appColorTrend: number;

  constructor() {}

  @HostBinding('style.color') color: string;

  ngOnInit() {
    if (this.appColorTrend > 0) {
      this.color = 'green';
    } else if (this.appColorTrend < 0) {
      this.color = 'red';
    }
  }
}
