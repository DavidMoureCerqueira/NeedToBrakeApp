import { Pipe, type PipeTransform } from '@angular/core';
import { Disc } from './../interfaces/disc/disc';

@Pipe({
  name: 'formatPCD',
  standalone: true,
})
export class FormatPCDPipe implements PipeTransform {
  transform(disc: Disc): string {
    if (disc.holes && disc.pcd) {
      return `${disc.holes}x${disc.pcd}`;
    }
    return (disc.holes || disc.pcd || '').toString();
  }
}
