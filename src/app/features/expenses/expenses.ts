import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Expense } from '../../core/models/expense.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { nameof } from '../../shared/utils/nameof.util';

@Component({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatTableModule, MatTabsModule],
  selector: 'app-expenses',
  templateUrl: './expenses.html',
})
export class Expenses {
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
  public EXPENSES: Expense[] = [
    {
      id: 'first expense guid',
      name: 'first name',
      description: 'first description',
      value: 123,
      date: new Date(),
      categoryId: 'categoryId one',
      applicationUserId: 'applicationUserId one',
    },
    {
      id: 'second expense guid',
      name: 'second name',
      description: 'second description',
      value: 123,
      date: new Date(),
      categoryId: 'categoryId two',
      applicationUserId: 'applicationUserId two',
    },
  ];
  public displayedExpensesColumns: (keyof Expense)[] = [
    nameof<Expense>((x) => x.id),
    nameof<Expense>((x) => x.name),
    nameof<Expense>((x) => x.description),
    nameof<Expense>((x) => x.value),
  ];

  public displayedCategoriesColumns: (keyof Category)[] = [
    nameof<Category>((x) => x.id),
    nameof<Category>((x) => x.name),
    nameof<Category>((x) => x.description),
  ];
}
