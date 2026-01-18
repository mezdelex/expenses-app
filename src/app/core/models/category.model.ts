import { Expense } from './expense.model';

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ExtraCategory extends Category {
  expenses: Expense[];
}
