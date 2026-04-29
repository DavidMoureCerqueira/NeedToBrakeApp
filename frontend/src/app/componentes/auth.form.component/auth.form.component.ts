import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthForm } from '../../interfaces/auth/authForm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'auth-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth.form.component.html',
  styleUrl: './auth.form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  isRegisterForm = input.required<boolean>();
  title = input.required<string>();
  formEmitter = output<AuthForm>();
  error = input<string>('');

  private fb = inject(FormBuilder);

  authForm: FormGroup = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9._-]*$'),
      ],
      [],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.email,
        Validators.minLength(8),
        Validators.pattern('^[a-zA-Z0-9._@-]*$'),
      ],
      [],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9._-]*$'),
      ],
    ],
  });

  constructor() {
    effect(() => {
      if (!this.isRegisterForm()) {
        const control = this.authForm.get('username');
        control?.clearValidators();
        control?.clearAsyncValidators();
        control?.updateValueAndValidity();
      }
    });
  }

  isValidField(fieldName: string): boolean | null {
    return !!this.authForm.controls[fieldName].errors && this.authForm.controls[fieldName].touched;
  }
  getFieldError(fieldName: string): string | null {
    if (!this.authForm.controls[fieldName].errors) return null;

    const errors = this.authForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Too short, min ${errors['minlength'].requiredLength} chars`;
        case 'maxlength':
          return `Too long, max ${errors['maxlength'].requiredLength} chars`;
        case 'email':
          return 'Email not valid';
        case 'pattern':
          return 'Special characters are not allowed';
      }
    }

    return null;
  }
  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.formEmitter.emit(this.authForm.value);
  }
}
