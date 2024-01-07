import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Vehicle, VehicleType } from '../../Common/vehicle.model';
import { Product } from '../../Common/product.model';
import { ProductsService } from '../../Common/services/product.service';
import { Brand } from '../../Common/brand.model';
import { Model } from '../../Common/model.model';
import { ProductsComponent } from '../products.component';
import { CategoriesService } from '../../Common/services/category.service';
import { Category } from '../../Common/category.model';

@Component({
  selector: 'app-filterproducts',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterProducts {
  @Output() filteredProductListsOutput = new EventEmitter<Product[]>();

  products: Product[] = [];
  categories: Set<Category> = new Set<Category>();
  brands: Set<Brand> = new Set<Brand>();
  models: Set<Model> = new Set<Model>();

  selectedCategory: VehicleType;
  selectedBrandName: String;
  selectedModelName: String;

  filteredBrands: Set<Brand> = new Set<Brand>();
  filteredModels: Set<Model> = new Set<Model>();
  filteredProductLists: Product[] = [];

  searchValue: string = '';
  productsComponent: ProductsComponent;

  constructor(
    private productsService: ProductsService,
    productsComponent: ProductsComponent
  ) {
    this.products = this.productsService.productsData.products;
    this.productsComponent = productsComponent;

    this.products.forEach((product) => {
      let category = product.category as Vehicle;
      //duplicate cause instance are different (different brand)
      let exists = false;
      this.categories.forEach(
        (category1) => (exists = category1.type == category.type)
      );

      if (!exists) {
        this.categories.add(category);
      }

      category.brands.forEach((brand) => {
        this.brands.add(brand);
        brand.models.forEach((model) => {
          this.models.add(model);
        });
      });
    });

    this.filteredProductLists = this.products;
    this.filteredBrands = this.brands;
    this.filteredModels = this.models;

    if (productsComponent.selectedCategory != null) {
      this.selectCategory(productsComponent.selectedCategory);
    }

    if (productsComponent.selectedBrandName != null) {
      this.selectBrand(productsComponent.selectedBrandName);
    }

    if (productsComponent.selectedModelName != null) {
      this.selectModel(productsComponent.selectedModelName);
    }
  }

  ngOnInit(): void {}

  filterTable() {
    const value = this.searchValue.toLowerCase().trim();
    this.filteredProductLists = this.products.filter((product) => {
      const productNameMatches = value
        ? product.productName.toLowerCase().includes(value)
        : true;
      const categoryMatches = this.selectedCategory
        ? product.category.type === this.selectedCategory
        : true;

      const vehicleCategory = product.category as Vehicle;
      var brandMatches: Boolean = true;
      var modelMatches: Boolean = true;
      if (vehicleCategory) {
        brandMatches = this.selectedBrandName
          ? product.category &&
            vehicleCategory.brands.some(
              (brand) => brand.brandName === this.selectedBrandName
            )
          : true;
        modelMatches = this.selectedModelName
          ? product.category &&
            vehicleCategory.brands.some((brand) =>
              brand.models.some(
                (model) => model.modelName === this.selectedModelName
              )
            )
          : true;
      }
      return (
        productNameMatches && categoryMatches && brandMatches && modelMatches
      );
    });

    this.updateFilteredProductLists();
  }

  private updateFilteredProductLists() {
    this.filteredProductListsOutput.emit(this.filteredProductLists);
  }

  selectCategory(categoryName: VehicleType) {
    this.selectedCategory = categoryName;
    this.productsComponent.selectedCategory = this.selectedCategory;
    this.filterByCategory();
  }

  selectBrand(brandName: String) {
    this.selectedBrandName = brandName;
    this.productsComponent.selectedBrandName = this.selectedBrandName;
    this.filterByBrand();
  }

  selectModel(modelName: String) {
    this.selectedModelName = modelName;
    this.productsComponent.selectedModelName = this.selectedModelName;
    this.filterByModel();
  }

  deselectModel() {
    this.selectedModelName = null;
    this.productsComponent.selectedModelName = null;
    this.filteredProductLists = this.products;
    this.filterByCategory();
    this.filterByBrand();
  }

  deselectBrand() {
    this.selectedBrandName = null;
    this.productsComponent.selectedBrandName = null;
    this.filteredProductLists = this.products;
    this.filterByCategory();
    this.filterByModel();
  }

  deselectCategory() {
    this.selectedCategory = null;
    this.productsComponent.selectedCategory = null;
    this.filteredProductLists = this.products;
    this.filterByModel();
    this.filterByBrand();
  }

  private updateFilteredBrands() {
    this.filteredBrands.clear();
    this.filteredProductLists.forEach((product) => {
      const vehicleCategory = product.category as Vehicle;
      if (vehicleCategory) {
        vehicleCategory.brands.forEach((brand) => {
          if (this.selectedModelName) {
            if (
              brand.models.some(
                (model) => model.modelName == this.selectedModelName
              )
            ) {
              this.filteredBrands.add(brand);
            }
          } else {
            this.filteredBrands.add(brand);
          }
        });
      }
    });
  }

  private updateFilteredModels() {
    this.filteredModels.clear();
    const filterModelsByBrand = (brand) => {
      brand.models.forEach((model) => {
        this.filteredModels.add(model);
      });
    };

    const filterProductsByBrand = (product) => {
      const vehicleCategory = product.category as Vehicle;
      if (vehicleCategory) {
        vehicleCategory.brands.forEach((brand) => {
          if (brand.brandName === this.selectedBrandName) {
            filterModelsByBrand(brand);
          }
        });
      }
    };

    this.filteredProductLists.forEach((product) => {
      if (this.selectedBrandName) {
        filterProductsByBrand(product);
      } else {
        const vehicleCategory = product.category as Vehicle;
        if (vehicleCategory) {
          vehicleCategory.brands.forEach((brand) => {
            filterModelsByBrand(brand);
          });
        }
      }
    });
  }

  private filterByCategory() {
    const matchFilter = (element: Product) => {
      const vehicleCategory = element.category as Vehicle;
      return (
        !this.selectedCategory || vehicleCategory.type === this.selectedCategory
      );
    };

    this.filteredProductLists = this.filteredProductLists.filter(matchFilter);
    this.updateFilteredProductLists();
    this.updateFilteredBrands();
    this.updateFilteredModels();
  }

  private filterByBrand() {
    const matchFilter = (element: Product) => {
      const vehicleCategory = element.category as Vehicle;
      return (
        !this.selectedBrandName ||
        vehicleCategory.brands.some(
          (brand) => brand.brandName === this.selectedBrandName
        )
      );
    };

    this.filteredProductLists = this.filteredProductLists.filter(matchFilter);
    this.updateFilteredProductLists();
    this.updateFilteredModels();
  }

  private filterByModel() {
    const matchFilter = (element: Product) => {
      const vehicleCategory = element.category as Vehicle;
      return (
        !this.selectedModelName ||
        vehicleCategory.brands.some((brand) =>
          brand.models.some(
            (model) => model.modelName === this.selectedModelName
          )
        )
      );
    };

    this.filteredProductLists = this.filteredProductLists.filter(matchFilter);
    this.updateFilteredProductLists();
    this.updateFilteredBrands();
  }
}
