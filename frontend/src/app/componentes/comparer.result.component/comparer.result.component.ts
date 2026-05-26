import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Disc } from '../../interfaces/disc/disc';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-comparer-result-component',
  imports: [TitleCasePipe, LowerCasePipe],
  templateUrl: './comparer.result.component.html',
  styleUrl: './comparer.result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparerResultComponent {
  existingDisc = input.required<Disc>();
  desiredDisc = input.required<Disc>();

  IsShowable(key: string): boolean {
    const existingField = this.existingDisc()[key];
    const desiredField = this.desiredDisc()[key];
    if (
      typeof existingField !== 'number' ||
      (typeof desiredField !== 'number' && typeof existingField !== 'string') ||
      typeof desiredField !== 'string'
    ) {
      return false;
    }
    return true;
  }

  differenceQuantity(key: string) {
    // Diameter, bolt, pcd,centerbore,thickness, height
    const existingField = this.existingDisc()[key];
    const desiredField = this.desiredDisc()[key];

    if (typeof existingField !== 'number' || typeof desiredField !== 'number') return null;

    const diff = desiredField - existingField;

    const fitClass = diff === 0 ? 'text-success' : 'text-error';
    const symbol = diff > 0 ? '+' : '';
    const fit = diff === 0 ? 'Direct Fit' : 'Modification';
    return { value: diff, class: fitClass, symbol, fit };
  }
}
