import { Pipe, type PipeTransform } from '@angular/core';
import { CarClean } from '../interfaces/cars/car';

@Pipe({
  name: 'formatCar',
  standalone: true,
})
export class FormatCarPipe implements PipeTransform {
  transform(car: CarClean): string {
    if (!car.version) return '';
    const fields = [
      car.brand.name ? car.brand.name : null,
      car.model.name ? car.model.name : null,
      car.version.name ? car.version.name : null,
      car.version.engine ? car.version.engine : null,
      car.version.bhp ? `${car.version.bhp}hp` : null,
      car.version.year ? car.version.year : null,
    ];

    return fields.filter((field) => field !== null).join(' ');
  }
}
