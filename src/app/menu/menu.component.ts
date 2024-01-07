import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Brand } from '../Common/brand.model';
import { Category } from '../Common/category.model';
import { CategoriesService } from '../Common/services/category.service';
import { Vehicle, VehicleType } from '../Common/vehicle.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  categories: Category[];
  vehicleCategories: Vehicle[] = [];

  selectedVehiclesType: VehicleType[] = [];
  selectedBrandNames: String[] = [];
  selectedModel: String = "";

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.categoriesData.categories;
  }
  ngOnInit(): void {}
  isOpenProduct = false;

  openNav() {
    document.getElementById('mySidepanel')!.style.width = 'auto';
    document.getElementById('mySidepanel')!.style.paddingRight = '40px';
  }
  closeNav() {
    document.getElementById('mySidepanel')!.style.width = '0px';
    document.getElementById('mySidepanel')!.style.paddingRight = '0px';
    this.closeAllOpenItems();
  }

  openProduct() {
    this.isOpenProduct = !this.isOpenProduct;
    if (!this.isOpenProduct) {
      this.closeAllOpenItems();
    }
  }

  closeAllOpenItems() {
    this.isOpenProduct = false;
    this.selectedVehiclesType = [];
    this.selectedBrandNames = [];
  }

  openAccessory() {
    this.categoriesService.selectedCategoryFromMenu = VehicleType.Accessory;
  }

  openCategory(type: VehicleType) {
    const index = this.selectedVehiclesType.indexOf(type);
    if (index === -1) {
      this.selectedVehiclesType.push(type);
    } else {
      this.selectedVehiclesType.splice(index, 1);
      //remove all the brands associate with this type
      let vehicleCat = this.categories.find(
        (item) => item.type == type
      ) as Vehicle;
      vehicleCat.brands.forEach((brand: Brand) => {
        const index = this.selectedBrandNames.indexOf(brand.brandName);
        if (index !== -1) {
          this.selectedBrandNames.splice(index, 1);
        }
      });
    }
  }

  isOpenCategory(vehicleType: VehicleType): Boolean {
    return this.selectedVehiclesType.includes(vehicleType);
  }

  openBrand(brandName: String) {
    const index = this.selectedBrandNames.indexOf(brandName);
    if (index === -1) {
      this.selectedBrandNames.push(brandName);
    } else {
      this.selectedBrandNames.splice(index, 1);
    }
  }

  isOpenBrand(brandName: String): Boolean {
    return this.selectedBrandNames.includes(brandName);
  }

  openModel(modelName: String) {
    let brand: Brand | undefined;
    this.categories.some((category) => {
      let vehicleCat = category as Vehicle;
      brand = vehicleCat.brands.find((brand) => {
        const model = brand.models.find(
          (model) => model.modelName === modelName
        );
        return model !== undefined;
      });
      return brand !== undefined;
    });

    let category: Category| undefined;
    this.categories.some((cat) => {
      category = cat;
      let vehicleCat = cat as Vehicle;
      brand = vehicleCat.brands.find((b) => {
        const model = b.models.find((model) => model.modelName === modelName);
        return model !== undefined;
      });
      return brand !== undefined;
    });

    if(category !== undefined){
      this.categoriesService.selectedCategoryFromMenu = category.type;
    }
    if (brand !== undefined) {
      this.categoriesService.selectedBrandFromMenu = brand.brandName;
    }
    this.categoriesService.selectedModelFromMenu = modelName;
  }

  isVehicle(cat: Category): Boolean {
    return (cat as Vehicle) !== undefined;
  }
  asVehicleCat(cat: Category): Vehicle {
    return cat as Vehicle;
  }
}
