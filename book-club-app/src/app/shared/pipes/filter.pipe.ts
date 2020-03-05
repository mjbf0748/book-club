import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name:'filter'
})

// Pipe to filter books
export class FilterPipe implements PipeTransform {
  transform(items: Book[], searchTitle: string, searchAuthor: string): Book[] {
    if (!items) return [];
    if (!searchTitle && !searchAuthor) return items;

    searchTitle = searchTitle.toLowerCase();
    searchAuthor = searchAuthor.toLowerCase();

    return items.filter( it => {
      return it.title.toLowerCase().includes(searchTitle) //&& it.author.toLowerCase().includes(searchAuthor);
    });
  }
}
