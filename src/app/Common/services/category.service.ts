import { Injectable } from '@angular/core';
import { VehicleType } from '../../Common/vehicletype.enum';

import categories from '../../../assets/categories.json';

@Injectable()
export class CategoriesService {
  categoriesData: any;
  selectedModelFromMenu: String | undefined;
  selectedBrandFromMenu: String | undefined;
  selectedCategoryFromMenu: VehicleType | undefined;

  constructor() {
    this.categoriesData = categories;
  }
}
