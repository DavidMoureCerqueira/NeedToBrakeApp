import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'register-page-component',
  imports: [ReactiveFormsModule],
  templateUrl: './register.page.component.html',
  styleUrl: './register.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4),
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

  isValidField(fieldName: string): boolean | null {
    return (
      !!this.registerForm.controls[fieldName].errors &&
      this.registerForm.controls[fieldName].touched
    );
  }
  getFieldError(fieldName: string): string | null {
    if (!this.registerForm.controls[fieldName].errors) return null;

    const errors = this.registerForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Too short, min ${errors['minlength'].requiredLength} chars`;
        case 'maxlength':
          return `Too long, max ${errors['minlength'].requiredLength} chars`;
        case 'email':
          return 'Email not valid';
        case 'pattern':
          return 'Special characters are not allowed';
      }
    }

    return null;
  }
  onSave() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    console.log('Dentro');
    console.log(this.registerForm.value);
  }
}
