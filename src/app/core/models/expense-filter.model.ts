import { BaseRequest } from './base-request.model';

export interface ExpenseFilter extends BaseRequest {
  categoryId?: string | null;
  keyword?: string | null;
  maxDate?: Date | null;
  minDate?: Date | null;
}
