import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingtooltip'
})
export class RatingtooltipPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value+" out of 5.0";
  }

}
