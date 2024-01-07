import { Brand } from '../Common/brand.model';
import { Category } from '../Common/category.model';
import { VehicleType } from '../Common/vehicletype.enum';

export { VehicleType };
export abstract class Vehicle implements Category {
  type: VehicleType;
  brands: Brand[];

  constructor(brands: Brand[], type: VehicleType) {
    this.brands = brands;
    this.type = type;
  }
}
