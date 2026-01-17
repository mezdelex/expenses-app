import { AuthService } from './core/auth/auth.service';
import { Component, inject } from '@angular/core';
import { Sidenav } from './core/sidenav/sidenav';

@Component({
  imports: [Sidenav],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private _authService = inject(AuthService);

  public constructor() {
    this._authService.loadUser();
  }
}
