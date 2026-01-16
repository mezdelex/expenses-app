import { Component } from '@angular/core';
import { Sidenav } from './core/sidenav/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Sidenav],
})
export class App { }
