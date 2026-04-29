import { Component, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './shared/header-component/header-component';
import { FooterComponent } from './shared/footer-component/footer-component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LoaderComponent } from './componentes/loader.component/loader.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NeedToBrakeApp');
  private readonly router = inject(Router);
  isNavigating = toSignal(
    this.router.events.pipe(
      map(
        (event) =>
          !(event instanceof NavigationEnd) &&
          !(event instanceof NavigationSkipped) &&
          !(event instanceof NavigationError) &&
          !(event instanceof NavigationCancel),
      ),
    ),
  );
}
