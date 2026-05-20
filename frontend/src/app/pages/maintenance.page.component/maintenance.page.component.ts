import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'maintenance-page-component',
  imports: [RouterLink],
  templateUrl: './maintenance.page.component.html',
  styleUrl: './maintenance.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenancePageComponent {}
