import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthFormComponent } from '../../componentes/auth.form.component/auth.form.component';
import { AuthForm } from '../../interfaces/auth/authForm';
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

        this.authService.setSession(res.token, res.user);

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.set(err.error?.detail || err.message || 'Unexpected error');
        console.error('Error in comunication', err);
      },
    });
  }
}
