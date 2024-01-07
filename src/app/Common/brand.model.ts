import { Model } from '../Common/model.model';

export class Brand {
  brandName: String;
  models: Model[];

  constructor(marcaName: String, models: [Model]) {
    this.brandName = marcaName;
    this.models = models;
  }
}
