import { AuthService } from '../auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet],
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
})
export class Sidenav {
  public readonly authService = inject(AuthService);
  public readonly opened = signal(false);

  public handleDrawer(): void {
    this.opened.update((x) => !x);
  }

  public handleLogout(): void {
    this.authService.logout();
    this.handleDrawer();
  }
}
