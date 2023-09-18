import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
})
export class CamelCasePipe implements PipeTransform {
  transform(value: string): string {
    const result: Array<string> = [];
    const words = value.split(' ');

    for (let word of words) {
      if (words.indexOf(word) === 0) {
        result.push(word.toLowerCase());
      } else {
        result.push(this.capitalize(word));
      }
    }

    return result.join(' ');
  }

  capitalize(word: string) {
    return word[0].toUpperCase() + word.substring(1);
  }
}
