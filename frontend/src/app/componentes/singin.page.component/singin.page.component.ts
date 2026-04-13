import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFormComponent } from '../auth.form.component/auth.form.component';
import { AuthForm } from '../../interfaces/authForm';

@Component({
  selector: 'singin-page-component',
  imports: [AuthFormComponent],
  templateUrl: './singin.page.component.html',
  styleUrl: './singin.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinginPageComponent {
  onLogin(authFormData: AuthForm) {
    console.log('Recibido el formulario', authFormData);
  }
}
