import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet],
  templateUrl: './sidenav.html',
})
export class Sidenav { }
