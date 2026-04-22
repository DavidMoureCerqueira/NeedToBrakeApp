import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  imageLogoPath: string = 'images/logo.sf.png';
  authService = inject(AuthService);
  layoutService = inject(LayoutService);

  logOut() {
    this.authService.logout();
  }
}
