import { Pipe, PipeTransform } from '@angular/core';
import { NumberWithSymbolPipe } from './number-with-symbol.pipe';

@Pipe({
  name: 'percentageWithSymbol',
})
export class PercentageWithSymbolePipe implements PipeTransform {
  constructor(private numberWithSymbol: NumberWithSymbolPipe) {}

  transform(value: number): string {
    return this.numberWithSymbol.transform(value, '1.1-1') + '%';
  }
}
