import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarDisc } from '../../interfaces/car.disc';

@Component({
  selector: 'list-disc',
  imports: [RouterLink],
  templateUrl: './list.disc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDiscComponent {
  listDiscPerCar = input.required<CarDisc[] | []>();
  hasData = computed(() => this.listDiscPerCar().length > 0);

  listProcessed = computed(() => {
    const data = this.listDiscPerCar();
    const consolidedData = data.map((discAsociation) => {
      const pcdBase = discAsociation.disc.pcd ?? '';
      const holes = discAsociation.disc.holes ?? '';

      const pcd =
        pcdBase && holes
          ? `${discAsociation.disc.holes ?? ''}x${discAsociation.disc.pcd ?? ''}`
          : '';
      const pcdObj = {
        pcdConsolided: pcd,
      };
      return { ...discAsociation, disc: { ...discAsociation.disc, ...pcdObj } };
    });
    return consolidedData;
  });
}
