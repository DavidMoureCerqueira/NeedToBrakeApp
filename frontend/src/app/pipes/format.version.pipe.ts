import { Pipe, type PipeTransform } from '@angular/core';
import { Version } from '../interfaces/cars/version';

@Pipe({
  name: 'formatVersion',
  standalone: true,
})
export class FormatVersionPipe implements PipeTransform {
  transform(version: Version): string {
    if (!version) return '';
    const fields = [
      version.name ? version.name : null,
      version.engine ? version.engine : null,
      version.bhp ? `${version.bhp}hp` : null,
      version.year ? version.year : null,
    ];

    return fields.filter((field) => field !== null).join(' ');
  }
}
