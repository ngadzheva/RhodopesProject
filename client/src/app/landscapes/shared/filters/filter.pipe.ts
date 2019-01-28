import { Pipe, PipeTransform } from '@angular/core';
import { ILandmark } from '../interfaces/landmark.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: ILandmark[], searchText: string): ILandmark[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }

}
