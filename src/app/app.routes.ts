import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.routes').then((r) => r.LOGIN_ROUTES),
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./features/expenses/expenses.routes').then((r) => r.EXPENSES_ROUTES),
  },
];
