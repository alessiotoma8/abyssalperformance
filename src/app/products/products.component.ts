import { Component } from '@angular/core';
import { Product } from '../Common/product.model';
import { CategoriesService } from '../Common/services/category.service';
import { VehicleType } from '../Common/vehicletype.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [],
})
export class ProductsComponent {
  selectedCategory:VehicleType|null = null;
  selectedBrandName:String|null = null;
  selectedModelName:String|null = null;

  constructor(categoryService : CategoriesService){
    if(categoryService.selectedCategoryFromMenu != null){
      this.selectedCategory = categoryService.selectedCategoryFromMenu
      categoryService.selectedCategoryFromMenu  = null
     }
  
      if(categoryService.selectedBrandFromMenu != null){
        this.selectedBrandName = categoryService.selectedBrandFromMenu
        categoryService.selectedBrandFromMenu  = null
      }
  
      if(categoryService.selectedModelFromMenu != null){
        this.selectedModelName = categoryService.selectedModelFromMenu
        categoryService.selectedModelFromMenu  = null
      }
  }
}
