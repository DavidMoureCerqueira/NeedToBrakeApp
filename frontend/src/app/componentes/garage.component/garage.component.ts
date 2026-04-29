import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'garage-component',
  imports: [],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent {}
