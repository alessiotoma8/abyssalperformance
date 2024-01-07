import { Category } from '../Common/category.model';
import { Vehicle } from '../Common/vehicle.model';

export class Product {
  id: number;
  productName: String;
  imageUrls: URL[];
  description?: String;
  price: number;
  category: Category;

  constructor(
    id: number,
    productName: String,
    imageUrls: URL[],
    price: number,
    category: Category,
    description?: String
  ){
    this.id = id;
    this.productName =productName;
    this.imageUrls = imageUrls;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
