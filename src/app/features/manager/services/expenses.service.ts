import { API_CONFIG } from '../../../core/config/api.config';
import { BaseRequest } from '../../../core/models/base-request.model';
import { Expense, ExtraExpense, PostExpense } from '../../../core/models/expense.model';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { User } from '../../../core/models/user.model';
import { firstValueFrom, Observable } from 'rxjs';
import { inject, Injectable, resource, ResourceRef, Signal } from '@angular/core';

@Injectable()
export class ExpensesService {
  private readonly _apiConfig = inject(API_CONFIG);
  private readonly _httpClient = inject(HttpClient);

  public getPaginatedExpensesByUserEmailResource(
    user: Signal<User | null>,
    baseRequest: Signal<BaseRequest>,
  ): ResourceRef<PaginatedResponse<ExtraExpense> | undefined> {
    return resource({
      params: () => ({ user: user(), baseRequest: baseRequest() }),
      loader: ({ params }) =>
        firstValueFrom(
          this._httpClient.post<PaginatedResponse<ExtraExpense>>(
            `${this._apiConfig.baseUrl}${this._apiConfig.expensesPaginatedEndpoint}`,
            {
              email: params.user?.email,
              page: params.baseRequest.page,
              pageSize: params.baseRequest.pageSize,
            },
          ),
        ),
    });
  }

  public deleteExpense(id: string): Observable<void> {
    return this._httpClient.delete<void>(
      `${this._apiConfig.baseUrl}${this._apiConfig.expensesDeleteEndpoint}${id}`,
    );
  }

  public patchExpense(expense: Expense): Observable<void> {
    return this._httpClient.patch<void>(
      `${this._apiConfig.baseUrl}${this._apiConfig.expensesPatchEndpoint}`,
      expense,
    );
  }

  public postExpense(expense: PostExpense): Observable<void> {
    return this._httpClient.post<void>(
      `${this._apiConfig.baseUrl}${this._apiConfig.expensesPostEndpoint}`,
      expense,
    );
  }
}
