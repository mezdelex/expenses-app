import { BaseRequest } from './base-request.model';

export interface ExpenseFilter extends BaseRequest {
  keyword?: string | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  categoryId?: string | null;
}
