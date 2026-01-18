import { Category } from './category.model';
import { User } from './user.model';

export interface Expense {
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
