import { API_CONFIG } from '../../../core/config/api.config';
import { Category } from '../../../core/models/category.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { inject, Injectable, resource, ResourceRef } from '@angular/core';

@Injectable()
export class CategoriesService {
  private readonly _apiConfig = inject(API_CONFIG);
  private readonly _httpClient = inject(HttpClient);

  public getCategoriesListResource(): ResourceRef<Category[] | undefined> {
    return resource({
      loader: () =>
        firstValueFrom(
          this._httpClient.post<Category[]>(
            `${this._apiConfig.baseUrl}${this._apiConfig.categoriesListEndpoint}`,
            {},
          ),
        ),
    });
  }
}
