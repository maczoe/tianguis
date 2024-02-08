import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      const today = new Date();
      const date = new Date(value);

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        // Si la fecha es de hoy, devuelve la hora
        return 'Hoy ' + date.getHours() + ':' + date.getMinutes();
      } else if (
        date.getDate() === today.getDate() - 1 &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        // Si la fecha es de ayer, devuelve 'Ayer'
        return 'Ayer';
      } else {
        // Si la fecha es de hace más de dos días, devuelve la fecha
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear()
        );
      }
    }
    return value;
  }
}
