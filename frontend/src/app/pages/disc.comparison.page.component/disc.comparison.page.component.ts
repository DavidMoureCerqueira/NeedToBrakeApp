import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoService } from '../../services/disc.service';
import { DiscClean } from '../../interfaces/disc.clean';
import { JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { FooterComponent } from '../../shared/footer-component/footer-component';

@Component({
  selector: 'app-disc.comparison.component',
  imports: [JsonPipe, HeaderComponent, FooterComponent],

  templateUrl: './disc.comparison.page.component.html',
  styleUrl: './disc.comparison.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscComparisonPageComponent {
  constructor() {}
  desiredDisc = signal<DiscClean | null>(null);
  existingDisc = signal<DiscClean | null>(null);
  private route = inject(ActivatedRoute);
  private service = inject(DiscoService);
  id = signal(Number(this.route.snapshot.paramMap.get('id')));

  ngOnInit() {
    console.log(this.id());
    if (!this.id()) {
      console.error('ID on URL not valid');
      return;
    }
    this.service.getDiscByID(this.id()).subscribe({
      next: (data) => {
        this.desiredDisc.set(data);
        console.log(data);
      },
      error: () => {
        console.log('No ha sido posible recuperar el disco');
      },
    });
    this.existingDisc.set(this.service.retrieveExistingDisc());
  }
}
