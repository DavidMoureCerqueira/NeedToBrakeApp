import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forbidden-page-component',
  imports: [],
  templateUrl: './forbidden.page.component.html',
  styleUrl: './forbidden.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenPageComponent {}
