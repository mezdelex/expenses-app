import { AuthService } from '../../core/auth/auth.service';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Expense } from '../../core/models/expense.model';
import { ExpensesService } from './expenses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../core/notifications/notifications.service';
import { PaginatedResponse } from '../../core/models/paginated-response.model';
import { nameof } from '../../shared/utils/nameof.util';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
  ],
  providers: [ExpensesService],
  selector: 'app-expenses',
  templateUrl: './expenses.html',
})
export class Expenses {
  private _authService = inject(AuthService);
  private _expensesService = inject(ExpensesService);
  private _notificationService = inject(NotificationService);

  public CATEGORIES: Category[] = [
    {
      id: 'first category guid',
      name: 'first name',
      description: 'first description',
    },
    {
      id: 'second category guid',
      name: 'second name',
      description: 'second description',
    },
  ];
  public displayedCategoriesColumns: string[] = [
    nameof<Category>((x) => x.id),
    nameof<Category>((x) => x.name),
    nameof<Category>((x) => x.description),
    'actions',
  ];
  public displayedExpensesColumns: string[] = [
    nameof<Expense>((x) => x.id),
    nameof<Expense>((x) => x.name),
    nameof<Expense>((x) => x.description),
    nameof<Expense>((x) => x.value),
    'actions',
  ];
  public expenses = signal<Expense[]>([]);

  public constructor() {
    if (this._authService.user()) {
      this.loadExpenses();
    }
  }

  public deleteExpense = (expense: Expense) => {
    this._expensesService.deleteExpense(expense.id).subscribe({
      next: () => this.loadExpenses(),
      error: (err: HttpErrorResponse) =>
        this._notificationService.showError(err.error?.message || err.message),
    });
  };

  public loadExpenses = () => {
    this._expensesService.getExpensesByUserEmail(this._authService.user()!.email).subscribe({
      next: (paginatedResponse: PaginatedResponse<Expense>) => {
        this.expenses.set(paginatedResponse.items);
      },
      error: (err: HttpErrorResponse) =>
        this._notificationService.showError(err.error?.message || err.message),
    });
  };
}
