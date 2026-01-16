import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet],
  templateUrl: './sidenav.html',
})
export class Sidenav {
  public authService = inject(AuthService);
}
