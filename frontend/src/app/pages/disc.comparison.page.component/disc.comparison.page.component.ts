import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoService } from '../../services/disc.service';

@Component({
  selector: 'app-disc.comparison.component',
  imports: [],

  template: `<p>disc.comparison.component works!</p>`,
  styleUrl: './disc.comparison.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscComparisonPageComponent {
  constructor() {}
  private route = inject(ActivatedRoute);
  private service = inject(DiscoService);
  id = signal(this.route.snapshot.paramMap.get('id'));
  ngOnInit() {
    console.log(this.id());
  }
}
