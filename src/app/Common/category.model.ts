import { Vehicle } from '../Common/vehicle.model';
import { VehicleType } from '../Common/vehicle.model';
import { Brand } from '../Common/brand.model';

export abstract class Category {
  type: VehicleType;
  isVehicle?(): this is Vehicle;
}

export class Auto extends Vehicle {
  constructor(brands: Brand[]) {
    super(brands, VehicleType.Auto);
  }
}

export class Moto extends Vehicle {
  constructor(brands: Brand[]) {
    super(brands, VehicleType.Moto);
  }
}

export class Accessory implements Category {
  type: VehicleType;
}
