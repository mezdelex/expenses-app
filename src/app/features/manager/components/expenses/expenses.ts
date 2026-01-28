import { AddExpenseDialog } from '../add-expense-dialog/add-expense-dialog';
import { AuthService } from '../../../../core/auth/auth.service';
import { Category } from '../../../../core/models/category.model';
import {
  Component,
  ResourceRef,
  WritableSignal,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ErrorsService } from '../../../../core/errors/errors.service';
import { Expense, ExtraExpense } from '../../../../core/models/expense.model';
import { ExpenseFilter } from '../../../../core/models/expense-filter.model';
import { ExpensesService } from '../../services/expenses.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { IntlDatePipe } from '../../../../shared/pipes/intl-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NotificationService } from '../../../../core/notifications/notifications.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { nameof } from '../../../../shared/utils/nameof.util';

@Component({
  imports: [
    IntlDatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [ExpensesService],
  selector: 'app-expenses',
  styleUrl: './expenses.scss',
  templateUrl: './expenses.html',
})
export class Expenses {
  private readonly _authService = inject(AuthService);
  private readonly _dialog = inject(MatDialog);
  private readonly _errorsService = inject(ErrorsService);
  private readonly _expenseFilter: WritableSignal<ExpenseFilter> = signal({ page: 0, pageSize: 5 });
  private readonly _expensesFormBuilder = inject(FormBuilder);
  private readonly _expensesService = inject(ExpensesService);
  private readonly _notificationService = inject(NotificationService);

  public readonly categoriesResource = input<ResourceRef<Category[] | undefined>>();
  public readonly displayedExpensesColumns = [
    nameof<ExtraExpense>((x) => x.id),
    nameof<ExtraExpense>((x) => x.name),
    nameof<ExtraExpense>((x) => x.description),
    nameof<ExtraExpense>((x) => x.date),
    nameof<ExtraExpense>((x) => x.value),
    nameof<ExtraExpense>((x) => x.category),
    'actions',
  ];
  public readonly expenseFilterFormGroup = new FormGroup({
    keyword: new FormControl(null),
    categoryId: new FormControl(null),
  });
  public readonly expensesFormGroups = new Map<ExtraExpense, FormGroup>();
  public readonly expensesResource = this._expensesService.getPaginatedExpensesByUserEmailResource(
    this._authService.user,
    this._expenseFilter,
  );

  public constructor() {
    this.expenseFilterFormGroup.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(
          (previous, current) => JSON.stringify(previous) === JSON.stringify(current),
        ),
      )
      .subscribe((values) => {
        this._expenseFilter.update((x) => ({ ...x, ...values }));
      });

    effect(() => {
      const error = this.expensesResource.error();
      if (error) {
        this._notificationService.showError(error.message);
      }
    });
  }

  public handleCancelEditExpense(expense: ExtraExpense): void {
    expense.isEditing = false;
  }

  public handleDeleteExpense(expense: ExtraExpense): void {
    this._expensesService.deleteExpense(expense.id).subscribe({
      next: () => {
        this.expensesResource.reload();
      },
      error: (err: HttpErrorResponse) => {
        this._errorsService.errorSubject.next(err);
      },
    });
  }

  public handleEditExpense(expense: ExtraExpense): void {
    expense.isEditing = true;
    if (!this.expensesFormGroups.has(expense)) {
      this.expensesFormGroups.set(
        expense,
        this._expensesFormBuilder.group({
          [nameof<ExtraExpense>((x) => x.name)]: [
            expense.name,
            [Validators.required, Validators.maxLength(32)],
          ],
          [nameof<ExtraExpense>((x) => x.description)]: [
            expense.description,
            [Validators.required, Validators.maxLength(256)],
          ],
          [nameof<ExtraExpense>((x) => x.value)]: [expense.value, [Validators.required]],
          [nameof<ExtraExpense>((x) => x.date)]: [
            new Date(expense.date).toLocaleString(),
            [Validators.required],
          ],
          [nameof<ExtraExpense>((x) => x.category)]: [expense.category.id, [Validators.required]],
        }),
      );
    }
  }

  public handleExpensePagination(event: PageEvent): void {
    this._expenseFilter.update((x) => ({ ...x, page: event.pageIndex, pageSize: event.pageSize }));
  }

  public handleNewExpense(): void {
    const dialogRef = this._dialog.open(AddExpenseDialog, {
      data: { categoriesResource: this.categoriesResource() },
    });

    dialogRef.afterClosed().subscribe((): void => {
      this.expensesResource.reload();
    });
  }

  public handlePatchExpense(expense: ExtraExpense): void {
    const formGroup = this.expensesFormGroups.get(expense);
    if (!formGroup || formGroup.invalid) return;

    const patchedExpense: Expense = {
      ...expense,
      ...formGroup.value,
      date: new Date(formGroup.value.date).toISOString(),
      categoryId: formGroup.value.category,
    };

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
