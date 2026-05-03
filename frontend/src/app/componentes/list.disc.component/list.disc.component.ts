import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarDisc } from '../../interfaces/disc/car.disc';
import { FormatVersionPipe } from '../../pipes/format.version.pipe';
import { FormatPCDPipe } from '../../pipes/format.pcd.pipe';
import { FormatMMPipe } from '../../pipes/format.mm.pipe';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'list-disc',
  imports: [RouterLink, FormatVersionPipe, FormatPCDPipe, FormatMMPipe, TitleCasePipe],
  templateUrl: './list.disc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDiscComponent {
  listDiscPerCar = input.required<CarDisc[]>();
  hasData = computed(() => this.listDiscPerCar().length > 0);
}
