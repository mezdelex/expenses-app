import { Category } from './category.model';
import { Editable } from './editable.model';
import { User } from './user.model';

export interface PostExpense {
  name: string;
  description: string;
  value: number;
  categoryId: string;
}

export interface Expense extends Editable, PostExpense {
  id: string;
  date: Date;
  applicationUserId: string;
}

export interface ExtraExpense extends Expense {
  applicationUser: User;
  category: Category;
}
