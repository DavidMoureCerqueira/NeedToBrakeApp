import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoService } from '../../services/disc.service';
import { Disc } from '../../interfaces/disc/disc';
import { CardDiscComponent } from '../../componentes/card.disc.component/card.disc.component';
import { DiscApiService } from '../../services/disc.api.service';

@Component({
  selector: 'app-disc.comparison.component',
  imports: [CardDiscComponent],
  templateUrl: './disc.comparison.page.component.html',
  styleUrl: './disc.comparison.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscComparisonPageComponent {
  constructor() {}
  desiredDisc = signal<Disc | null>(null);
  existingDisc = signal<Disc | null>(null);
  private route = inject(ActivatedRoute);
  private discService = inject(DiscoService);
  private discApiService = inject(DiscApiService);
  id = signal(Number(this.route.snapshot.paramMap.get('id')));

  ngOnInit() {
    console.log(this.id());
    if (!this.id()) {
      console.error('ID on URL not valid');
      return;
    }
    this.discApiService.getDiscByID(this.id()).subscribe({
      next: (data) => {
        this.desiredDisc.set(data);
        console.log(data);
      },
      error: () => {
        console.log('No ha sido posible recuperar el disco');
      },
    });
    this.existingDisc.set(this.discService.getExistingDisc());
  }
}
