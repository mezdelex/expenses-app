import { Component, effect, inject, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validEmail } from '../../shared/directives/valid-email.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
})
export class Login {
  private _authService = inject(AuthService);
  private _injector = inject(Injector);
  private _router = inject(Router);
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, validEmail()]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public constructor() {
    effect(
      () => {
        if (this._authService.isLoggedIn()) {
          this._router.navigate(['/expenses']);
        }
      },
      { injector: this._injector },
    );
  }

  public onSubmit = () => {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;

    this._authService.login({ email, password });
  };
}
