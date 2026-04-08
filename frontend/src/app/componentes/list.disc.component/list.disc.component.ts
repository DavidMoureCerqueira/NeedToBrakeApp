import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarDisc } from '../../interfaces/car.disc';
import { Version } from '../../interfaces/version';
import { DiscClean } from '../../interfaces/disc.clean';
import { Disc } from '../../interfaces/disc';
@Component({
  selector: 'list-disc',
  imports: [RouterLink],

  templateUrl: './list.disc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDiscComponent {
  listDiscPerCar = input.required<CarDisc[] | []>();
  hasData = computed(() => this.listDiscPerCar().length > 0);
  isLoading = input<boolean>(false);
  isError = input<boolean>(false);
  listProcessed = computed(() => {
    const data = this.listDiscPerCar();
    const consolidedData = data.map((discAsociation) => {
      const pcdConsolidated = this.formatPCD(discAsociation.disc);

      const versionConsolidated = this.formatVersion(discAsociation.car.version);

      return {
        ...discAsociation,
        car: {
          ...discAsociation.car,
          version: { ...discAsociation.car.version, versionConsolidated },
        },
        disc: { ...discAsociation.disc, pcdConsolidated },
      };
    });
    return consolidedData;
  });
  private formatVersion(version: Version): string {
    const year = version.year ? `(${version.year})` : '';
    return [version.name, version.engine, version.bhp, year]
      .filter((value) => value !== null && value !== undefined && value !== '')
      .join('-');
  }
  private formatPCD(disc: Disc): string {
    if (disc.holes && disc.pcd) {
      return `${disc.holes}x${disc.pcd}`;
    }
    return (disc.holes || disc.pcd || '').toString();
  }
}
