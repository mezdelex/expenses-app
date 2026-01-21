import { AddExpenseDialog } from './components/add-expense-dialog/add-expense-dialog';
import { AuthService } from '../../core/auth/auth.service';
import { CategoriesService } from './services/categories.service';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ErrorsService } from '../../core/errors/errors.service';
import { Expense } from '../../core/models/expense.model';
import { ExpensesService } from './services/expenses.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  providers: [CategoriesService, ExpensesService],
  selector: 'app-manager',
  templateUrl: './manager.html',
})
export class Manager {
  private readonly _authService = inject(AuthService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _dialog = inject(MatDialog);
  private readonly _errorsService = inject(ErrorsService);
  private readonly _expensesBaseRequest = signal({ page: 0, pageSize: 5 });
  private readonly _expensesFormBuilder = inject(FormBuilder);
  private readonly _expensesService = inject(ExpensesService);
  private readonly _notificationService = inject(NotificationService);

  public readonly categoriesResource = this._categoriesService.getCategoriesResource();
  public readonly displayedExpensesColumns = [
    nameof<Expense>((x) => x.id),
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
  public readonly expensesResource = this._expensesService.getPaginatedExpensesByUserEmailResource(
    this._authService.user,
    this._expensesBaseRequest,
  );
  public readonly expensesFormGroups = new Map<Expense, FormGroup>();

  public constructor() {
    effect(() => {
      const error = this.expensesResource.error();
      if (error) {
        this._notificationService.showError(error.message);
      }
    });
  }

  public handleCancelEditExpense(expense: Expense): void {
    expense.isEditing = false;
  }

  public handleDeleteExpense(expense: Expense): void {
    this._expensesService.deleteExpense(expense.id).subscribe({
      next: () => {
        this.expensesResource.reload();
      },
      error: (err: HttpErrorResponse) => {
        this._errorsService.errorSubject.next(err);
      },
    });
  }

  public handleEditExpense(expense: Expense): void {
    expense.isEditing = true;
    if (!this.expensesFormGroups.has(expense)) {
      this.expensesFormGroups.set(
        expense,
        this._expensesFormBuilder.group({
          [nameof<Expense>((x) => x.name)]: [
            expense.name,
            [Validators.required, Validators.maxLength(32)],
          ],
          [nameof<Expense>((x) => x.description)]: [
            expense.description,
            [Validators.required, Validators.maxLength(256)],
          ],
          [nameof<Expense>((x) => x.value)]: [expense.value, [Validators.required]],
        }),
      );
    }
  }

  public handleExpensePagination(event: PageEvent): void {
    this._expensesBaseRequest.set({ page: event.pageIndex, pageSize: event.pageSize });
  }

  public handleNewExpense(): void {
    const dialogRef = this._dialog.open(AddExpenseDialog, {
      data: { categoriesResource: this.categoriesResource },
    });

    dialogRef.afterClosed().subscribe((): void => {
      this.expensesResource.reload();
    });
  }

  public handlePatchExpense(expense: Expense): void {
    const formGroup = this.expensesFormGroups.get(expense);
    if (!formGroup || formGroup.invalid) return;

    const patchedExpense: Expense = { ...expense, ...formGroup.value };
    this._expensesService.patchExpense(patchedExpense).subscribe({
      next: (): void => {
        this.expensesResource.reload();
      },
      error: (err: HttpErrorResponse): void => {
        this._errorsService.errorSubject.next(err);
      },
    });
  }
}
