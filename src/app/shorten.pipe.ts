import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number): any {
    console.log(limit);
    if (limit === undefined) {
      return value;
    }
    return value.substr(0, limit) + ' ...';
  }

}
