import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthFormComponent } from '../../componentes/auth.form.component/auth.form.component';
import { AuthForm } from '../../interfaces/authForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'singin-page-component',
  imports: [AuthFormComponent],
  templateUrl: './singin.page.component.html',
  styleUrl: './singin.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  error = signal<string>('');
  onLogin(authFormData: AuthForm) {
    console.log('Recibido el formulario', authFormData);
    this.authService.signin(authFormData).subscribe({
      next: (res) => {
        console.log('User singed-in', res);
        if (res.success && res.data) {
          this.authService.setToken(res.data.token);
          this.authService.currentUser.set(res.data.user.email);
          this.router.navigate(['/']);
        } else {
          console.log('Error!');
        }
      },
      error: (err) => {
        this.error.set(err.error?.detail);
        console.error('Error in comunication', err);
      },
    });
  }
}
