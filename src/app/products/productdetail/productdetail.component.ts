import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Common/services/product.service';
import { Product } from '../../Common/product.model';
import { CartService } from '../../Common/services/cart.service';
import { FinitureService } from '../../Common/services/finiture.service';
import { Finiture } from '../../Common/finiture.model';
import { Model } from '../../Common/model.model';
import { Vehicle } from '../../Common/vehicle.model';
import { Brand } from '../../Common/brand.model';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductDetail implements OnInit, OnDestroy {
  id: number|undefined;
  private sub: any;
  product!: Product;
  isOpenGloss: Boolean = false;
  isOpenMatt: Boolean = false;
  isOpenRaw: Boolean = false;

  finitureList: Finiture[];
  selectedFiniture: Finiture|null = null;
  modelsAviableList: Model[] = [];
  selectedModel: Model|null = null;
  enabledCart: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private finitureService: FinitureService
  ) {
    this.finitureList = finitureService.finitureList;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.product = this.productsService.productsData.products.find(
      (product:Product) => product.id == this.id
    );

    let vehicleCat = this.product?.category as Vehicle;
    vehicleCat.brands.forEach((brand: Brand) =>
      brand.models.forEach((model) => this.modelsAviableList.push(model))
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addToCart() {
    if(this.selectFiniture != null &&  this.selectedModel != null){
    this.cartService.addToCart(
      this.product,
      this.selectedFiniture!,
      this.selectedModel!
    );
    }
  }

  selectFiniture(finiture: Finiture) {
    if (this.selectedFiniture === finiture) {
      this.selectedFiniture = null;
    } else {
      this.selectedFiniture = finiture;
    }
  }

  isSelectedFiniture(finiture: Finiture) {
    return this.selectedFiniture === finiture;
  }

  selectModel(model: Model) {
    this.selectedModel = model;
  }

  deselectModel() {
    this.selectedModel = null;
  }

  changeImage(index: number): void {
    // Set the index of the clicked thumbnail as the active image in the carousel
    const carouselId = `#carouselExampleIndicators_${this.product.id}`;
    const carouselElement = document.querySelector(carouselId) as HTMLElement;

    // Activate the clicked thumbnail in the carousel
    if (carouselElement) {
      carouselElement
        .querySelector('.carousel-inner')
        ?.children[index].classList.add('active');
    }
  }

  getEnabledCart(): Boolean {
    return this.selectedFiniture &&
      (this.selectedModel || this.modelsAviableList.length == 0)
      ? true
      : false;
  }
}
