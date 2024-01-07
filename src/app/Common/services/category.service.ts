import { Injectable } from '@angular/core';
import { VehicleType } from '../../Common/vehicletype.enum';

import categories from '../../../assets/categories.json';

@Injectable()
export class CategoriesService {
  categoriesData: any;
  selectedModelFromMenu: String|null = null;
  selectedBrandFromMenu: String|null = null;
  selectedCategoryFromMenu: VehicleType|null = null;

  constructor() {
    this.categoriesData = categories;
  }
}
