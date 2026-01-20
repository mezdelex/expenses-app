import { AuthService } from '../../core/auth/auth.service';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Expense } from '../../core/models/expense.model';
import { ExpensesService } from './expenses.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../core/notifications/notifications.service';
import { nameof } from '../../shared/utils/nameof.util';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
  ],
  providers: [ExpensesService],
  selector: 'app-expenses',
  templateUrl: './expenses.html',
})
export class Expenses {
  private readonly _authService = inject(AuthService);
  private readonly _baseRequest = signal({ page: 0, pageSize: 10 });
  private readonly _expensesService = inject(ExpensesService);
  private readonly _notificationService = inject(NotificationService);

  public readonly CATEGORIES: Category[] = [
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
  public readonly displayedCategoriesColumns: string[] = [
    nameof<Category>((x) => x.id),
    nameof<Category>((x) => x.name),
    nameof<Category>((x) => x.description),
    'actions',
  ];
  public readonly displayedExpensesColumns: string[] = [
    nameof<Expense>((x) => x.id),
    nameof<Expense>((x) => x.name),
    nameof<Expense>((x) => x.description),
    nameof<Expense>((x) => x.value),
    'actions',
  ];
  public readonly expensesResource = this._expensesService.getExpensesByUserEmailResource(
    this._authService.user,
    this._baseRequest,
  );

  public constructor() {
    effect(() => {
      if (this.expensesResource.error())
        this._notificationService.showError(this.expensesResource.error()!.message);
    });
  }

  public deleteExpense(expense: Expense): void {
    this._expensesService.deleteExpense(expense.id).subscribe(() => {
      this.expensesResource.reload();
    });
  }

  public updatePagination($event: PageEvent): void {
    this._baseRequest.set({ page: $event.pageIndex, pageSize: $event.pageSize });
  }
}
