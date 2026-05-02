import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  imageLogoPath: string = 'images/logo.sf.webp';

  private router = inject(Router);
  authService = inject(AuthService);
  private url = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url),
  );
  currentUrl = toSignal(this.url, { initialValue: this.router.url });
  isProfile = computed(() => this.currentUrl().includes('profile'));
  logOut() {
    this.authService.logout();
  }
  goToMyProfile() {
    const id = this.authService.currentUserId;
    id ? this.router.navigate(['/profile', id]) : this.router.navigate(['sign-in']);
  }
}
