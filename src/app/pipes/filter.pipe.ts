import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: any): any[] {
    if(!items) return [];
    if(!searchText) return items;
    return searchText 
        ? items.filter(item => item.description.toLowerCase().indexOf(searchText) !== -1)
        : items;
   }
}