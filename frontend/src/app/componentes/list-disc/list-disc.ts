import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarDisc } from '../../interfaces/car-disc';

@Component({
  selector: 'list-disc',
  imports: [RouterLink],
  templateUrl: './list-disc.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDiscComponent {
  listDiscPerCar = input.required<CarDisc[] | []>();
  hasData = computed(() => this.listDiscPerCar().length > 0);
  listProcessed = computed(() => {
    let data = this.listDiscPerCar();
    let consolidedData = data.map((discAsociation) => {
      const pcdBase = discAsociation.disc.pcd ?? '';
      const holes = discAsociation.disc.holes ?? '';
      const pcd =
        pcdBase && holes
          ? `${discAsociation.disc.pcd ?? ''}x${discAsociation.disc.holes ?? ''}`
          : '';
      let pcdObj = {
        pcdConsolided: pcd,
      };
      return { ...discAsociation, disc: { ...discAsociation.disc, ...pcdObj } };
    });
    return consolidedData;
  });
  readonly Order = [
    'RotorDiameter',
    'RotorHeight',
    'PCD',
    'RotorHoles',
    'pcdConsolided',
    'Centerbore',
    'RotorThicknessNew',
    'RotorThicknessMin',
    'RotorStyle',
    'RotorAxle',
  ];
  customOrder = (param1: any, param2: any) => {
    return this.Order.indexOf(param1.key) - this.Order.indexOf(param2.key);
  };
}
