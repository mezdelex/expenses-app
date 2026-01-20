import { Category } from './category.model';
import { Editable } from './editable.model';
import { User } from './user.model';

export interface Expense extends Editable {
  id: string;
  name: string;
  description: string;
  value: number;
  date: Date;
  categoryId: string;
  applicationUserId: string;
}

export interface ExtraExpense extends Expense {
  applicationUser: User;
  category: Category;
}
