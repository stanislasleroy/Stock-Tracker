import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
})
export class MonthNamePipe implements PipeTransform {
  transform(value: any): any {
    let date = new Date();
    date.setMonth(value - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }
}
