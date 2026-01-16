import { Component, effect, inject, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatCardModule,
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
    email: new FormControl(''),
    password: new FormControl(''),
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
