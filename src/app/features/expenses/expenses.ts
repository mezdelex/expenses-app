import { AuthService } from '../../core/auth/auth.service';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Expense } from '../../core/models/expense.model';
import { ExpensesService } from './expenses.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../core/notifications/notifications.service';
import { nameof } from '../../shared/utils/nameof.util';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  providers: [ExpensesService],
  selector: 'app-expenses',
  templateUrl: './expenses.html',
})
export class Expenses {
  private readonly _authService = inject(AuthService);
  private readonly _baseRequest = signal({ page: 0, pageSize: 5 });
  private readonly _expensesService = inject(ExpensesService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _notificationService = inject(NotificationService);

  public readonly CATEGORIES: Category[] = [
    { id: '1', name: 'Food', description: 'Food expenses' },
    { id: '2', name: 'Transport', description: 'Transport expenses' },
  ];
  public readonly displayedExpensesColumns = [
    nameof<Expense>((x) => x.name),
    nameof<Expense>((x) => x.description),
    nameof<Expense>((x) => x.value),
    'actions',
  ];
  public readonly displayedCategoriesColumns = [
    nameof<Category>((x) => x.id),
    nameof<Category>((x) => x.name),
    nameof<Category>((x) => x.description),
  ];
  public readonly expensesResource = this._expensesService.getExpensesByUserEmailResource(
    this._authService.user,
    this._baseRequest,
  );
  public readonly formGroups = new Map<Expense, FormGroup>();

  public constructor() {
    effect(() => {
      const error = this.expensesResource.error();
      if (error) {
        this._notificationService.showError(error.message);
      }
    });
  }

  public cancelEditExpense(expense: Expense): void {
    expense.isEditing = false;
  }

  public deleteExpense(expense: Expense): void {
    this._expensesService.deleteExpense(expense.id).subscribe(() => {
      this.expensesResource.reload();
    });
  }

  public editExpense(expense: Expense): void {
    expense.isEditing = true;
    if (!this.formGroups.has(expense)) {
      this.formGroups.set(
        expense,
        this._formBuilder.group({
          [nameof<Expense>((x) => x.name)]: [expense.name],
          [nameof<Expense>((x) => x.description)]: [expense.description],
          [nameof<Expense>((x) => x.value)]: [expense.value],
        }),
      );
    }
  }

  public saveExpense(expense: Expense): void {
    const formGroup = this.formGroups.get(expense);
    if (!formGroup || formGroup.invalid) return;

    const updatedExpense: Expense = {
      ...expense,
      ...formGroup.value,
    };
    console.log(updatedExpense);

    // TODO: persist and reload

    expense.isEditing = false;
  }

  public updatePagination(event: PageEvent): void {
    this._baseRequest.set({ page: event.pageIndex, pageSize: event.pageSize });
  }
}
