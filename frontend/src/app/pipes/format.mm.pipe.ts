import { Pipe, type PipeTransform } from '@angular/core';
import { Disc } from '../interfaces/disc/disc';

@Pipe({
  name: 'mm',
  standalone: true,
})
export class FormatMMPipe implements PipeTransform {
  transform(value: string | Number): string {
    if (value !== null && value !== undefined && value !== '' && value !== 0) {
      return `${value} mm`;
    }
    return 'Not provided';
  }
}
