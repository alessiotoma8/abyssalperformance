import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Product } from '../../Common/product.model';


@Component({
  selector: 'app-productlist',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.css'],
})
export class ProductList {
  filteredProductLists: Product[] = [];
  @Input() set list(value: Product[]) {
    this.filteredProductLists = value;
  }
}