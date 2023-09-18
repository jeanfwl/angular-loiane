import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
})
export class FiltroArrayPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (value.length > 0 && args) {
      const filter = args.toLowerCase();
      return value.filter((v: string) => v.toLowerCase().indexOf(filter) != -1);
    }

    return value;
  }
}
