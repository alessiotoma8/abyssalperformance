import { Injectable } from '@angular/core';
import { Finiture } from '../../Common/finiture.model';
import { Model } from '../../Common/model.model';
import { Product } from '../../Common/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  selectedProduct: Product = null;
  selectedFiniture: Finiture = null;
  seletedModel: Model = null;

  addToCart(
    product: Product,
    selectedFiniture: Finiture,
    selectedModel: Model
  ) {
    this.selectedProduct = product;
    this.selectedFiniture = selectedFiniture;
    this.seletedModel = selectedModel;
  }

  resetAll() {
    this.selectedProduct = null;
    this.selectedFiniture = null;
    this.seletedModel = null;
  }
}
