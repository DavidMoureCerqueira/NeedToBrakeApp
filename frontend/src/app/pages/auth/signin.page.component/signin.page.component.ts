import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthFormComponent } from '../../../componentes/auth.form.component/auth.form.component';
import { AuthForm } from '../../../interfaces/auth/authForm';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'singin-page-component',
  imports: [AuthFormComponent],
  templateUrl: './signin.page.component.html',
  styleUrl: './signin.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  error = signal<string>('');
  onLogin(authFormData: AuthForm) {
    console.log('Recibido el formulario', authFormData);
    this.authService.signin(authFormData).subscribe({
      next: (res) => {
        console.log('User singed-in', res);

        this.authService.setSession(res.token, res.user);
        const id = this.authService.currentUserId;
        this.router.navigate(['/profile', id]);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error.error || err.message || 'Unexpected error');
      },
    });
  }
}
