import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden-page-component',
  imports: [RouterLink],
  templateUrl: './forbidden.page.component.html',
  styleUrl: './forbidden.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenPageComponent {}
