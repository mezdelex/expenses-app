import { API_CONFIG } from '../../core/config/api.config';
import { Expense } from '../../core/models/expense.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { PaginatedResponse } from '../../core/models/paginated-response.model';

@Injectable()
export class ExpensesService {
  private _apiConfig = inject(API_CONFIG);
  private _httpClient = inject(HttpClient);

  public getExpensesByUserEmail = (email: string): Observable<PaginatedResponse<Expense>> =>
    // TODO: include pagination
    this._httpClient.post<PaginatedResponse<Expense>>(
      `${this._apiConfig.baseUrl}${this._apiConfig.expensesAllEndpoint}`,
      { email },
    );

  public deleteExpense = (id: string): Observable<void> =>
    this._httpClient.delete<void>(
      `${this._apiConfig.baseUrl}${this._apiConfig.expensesDeleteEndpoint}${id}`,
    );
}
