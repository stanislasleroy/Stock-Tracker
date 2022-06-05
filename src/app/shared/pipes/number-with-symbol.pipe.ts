import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithSymbol',
})
export class NumberWithSymbolPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, format: string = '1.0-0', locale = 'en'): string {
    let symbol = value > 0 ? '+' : '';
    return symbol + this.decimalPipe.transform(value, format, locale);
  }
}
