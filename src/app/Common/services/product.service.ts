import { Injectable } from '@angular/core';
import { Product } from '../../Common/product.model';

import products from '../../../assets/products.json';
import { VehicleType } from '../../Common/vehicletype.enum';

@Injectable()
export class ProductsService {
  productsData: any;

  constructor() {
    this.productsData = products;
    this.generateDynamicIds();
  }

  generateDynamicIds() {
    let idCounter = 1;

    this.productsData.products.forEach((product) => {
      product.id = idCounter++;
    });
  }
}
