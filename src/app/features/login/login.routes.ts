import { Routes } from '@angular/router';
import { Login } from './login';
import { alreadyLoggedInGuard } from '../../core/auth/auth.guard';

export const LOGIN_ROUTES: Routes = [
  {
    canActivate: [alreadyLoggedInGuard],
    component: Login,
    path: '',
  },
];
