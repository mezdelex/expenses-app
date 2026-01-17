import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-expenses',
  templateUrl: './expenses.html',
})
export class Expenses {
  public expensesForm = new FormGroup({
    pending: new FormControl('', []),
  });

  public onSubmit = (): void => {
    const { pending } = this.expensesForm.value;
    if (!pending) return;
  };
}
