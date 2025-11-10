import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const filteredServers = [];
    for (const server of value) {
      if (server[propName] === filterString) {
        filteredServers.push(server);
      }
    }
    return filteredServers;
  }

}
