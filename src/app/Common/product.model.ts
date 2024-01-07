import { Category } from '../Common/category.model';
import { Vehicle } from '../Common/vehicle.model';

export class Product {
  id: number;
  productName: String;
  imageUrls: URL[];
  description?: String;
  price: number;
  category: Category;
}
