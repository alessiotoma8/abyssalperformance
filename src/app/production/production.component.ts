import { Component } from '@angular/core';
import { Finiture } from '../Common/finiture.model';
import { FinitureService } from '../Common/services/finiture.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css'],
})
export class ProductionComponent {
  finitureList: Finiture[];

  constructor(private finitureService: FinitureService) {
    this.finitureList = finitureService.finitureList;
  }
}
