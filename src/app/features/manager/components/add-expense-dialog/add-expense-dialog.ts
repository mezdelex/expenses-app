import { Category } from '../../../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Component, inject, ResourceRef } from '@angular/core';
import { ErrorsService } from '../../../../core/errors/errors.service';
import { ExpensesService } from '../../services/expenses.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [ExpensesService],
  selector: 'app-add-expense-dialog',
  styleUrl: './add-expense-dialog.scss',
  templateUrl: './add-expense-dialog.html',
})
export class AddExpenseDialog {
  private readonly _dialogRef = inject(MatDialogRef<AddExpenseDialog>);
  private readonly _errorsService = inject(ErrorsService);
  private readonly _expensesService = inject(ExpensesService);

  public readonly addExpenseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    value: new FormControl(0, [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });
  public readonly data = inject<{
    categoriesResource: ResourceRef<Category[] | undefined>;
  }>(MAT_DIALOG_DATA);

  public handleCancel(): void {
    this._dialogRef.close();
  }

  public handleSubmit() {
    const { name, description, value, categoryId } = this.addExpenseForm.value;
    if (!name || !description || !value || !categoryId) return;

    this._expensesService.postExpense({ name, description, value, categoryId }).subscribe({
      next: (): void => {
        this._dialogRef.close();
      },
      error: (err: HttpErrorResponse): void => {
        this._errorsService.errorSubject.next(err);
      },
    });
  }

  public preserveOrder(): number {
    return 0;
  }
}
