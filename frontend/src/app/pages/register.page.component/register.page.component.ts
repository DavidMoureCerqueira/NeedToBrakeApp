import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../componentes/auth.form.component/auth.form.component';
import { AuthForm } from '../../interfaces/authForm';

@Component({
  selector: 'register-page-component',
  imports: [AuthFormComponent],
  templateUrl: './register.page.component.html',
  styleUrl: './register.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  onLogin(authFormData: AuthForm) {
    console.log('Recibido el formulario', authFormData);
  }
}
