import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthFormComponent } from '../../componentes/auth.form.component/auth.form.component';
import { AuthForm } from '../../interfaces/authForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { mapUserToUserDataBase } from '../../mappers/mapUserToUserDataBase';

@Component({
  selector: 'register-page-component',
  imports: [AuthFormComponent],
  templateUrl: './register.page.component.html',
  styleUrl: './register.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  error = signal<string>('');
  onLogin(authFormData: AuthForm) {
    console.log('Recibido el formulario', authFormData);

    this.authService.register(mapUserToUserDataBase(authFormData)).subscribe({
      next: (res) => {
        console.log('User registered', res);

        this.authService.setSession(res.token, res.user);

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.set(err.error?.detail || err.message || 'Unexpected error');
        console.error('Error comunication', err);
      },
    });
  }
}
