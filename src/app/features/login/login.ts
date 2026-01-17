import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validEmail } from '../../shared/validators/valid-email.validator';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  private _authService = inject(AuthService);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, validEmail()]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public onSubmit = (): void => {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;

    this._authService.login({ email, password });
  };
}
