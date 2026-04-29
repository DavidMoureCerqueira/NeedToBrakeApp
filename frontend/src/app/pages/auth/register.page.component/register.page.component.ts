import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthFormComponent } from '../../../componentes/auth.form.component/auth.form.component';
import { AuthForm } from '../../../interfaces/auth/authForm';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { mapUserToUserDatabase } from '../../../mappers/mapUserToUserDataBase';

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

    this.authService.register(mapUserToUserDatabase(authFormData)).subscribe({
      next: (res) => {
        console.log('User registered', res);

        this.authService.setSession(res.token, res.user);

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.set(err.error.error || err.message || 'Unexpected error');
      },
    });
  }
}
