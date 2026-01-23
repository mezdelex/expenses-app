import { Category } from '../../../../core/models/category.model';
import { Component, input, ResourceRef } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { nameof } from '../../../../shared/utils/nameof.util';
import { MatTableModule } from '@angular/material/table';

@Component({
  imports: [MatProgressSpinnerModule, MatTableModule],
  selector: 'app-categories',
  styleUrl: './categories.scss',
  templateUrl: './categories.html',
})
export class Categories {
  public readonly categoriesResource = input<ResourceRef<Category[] | undefined>>();
  public readonly displayedCategoriesColumns = [
    nameof<Category>((x) => x.id),
    nameof<Category>((x) => x.name),
    nameof<Category>((x) => x.description),
  ];
}
