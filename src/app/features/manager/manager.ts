import { Categories } from './components/categories/categories';
import { CategoriesService } from './services/categories.service';
import { Component, inject } from '@angular/core';
import { Expenses } from './components/expenses/expenses';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  imports: [Categories, Expenses, MatTabsModule],
  providers: [CategoriesService],
  selector: 'app-manager',
  styleUrl: './manager.scss',
  templateUrl: './manager.html',
})
export class Manager {
  private readonly _categoriesService = inject(CategoriesService);

  public readonly categoriesResource = this._categoriesService.getCategoriesResource();
}
