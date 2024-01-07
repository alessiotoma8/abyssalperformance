import { Injectable } from '@angular/core';
import { Finiture } from '../../Common/finiture.model';

@Injectable()
export class FinitureService {
  finitureList: Finiture[];

  constructor() {
    this.finitureList = [
      new Finiture(
        'Gloss',
        "Esalta l'eleganza e la modernità con la finitura lucida in fibra di carbonio. La superficie riflettente aggiunge un tocco di lusso e raffinatezza al materiale, creando un effetto visivo accattivante e distintivo",
        'https://www.thevehiclewrappingcentre.com/wp-content/uploads/High-Gloss-Twill-Weave-Carbon-1024x686.jpg'
      ),
      new Finiture(
        'Matt',
        "Conferisci un tocco di sobrietà e modernità con la finitura opaca in fibra di carbonio. La superficie matt offre un'eleganza discreta e contemporanea al materiale tecnologico, creando un aspetto sofisticato e distintivo",
        'https://cdn11.bigcommerce.com/s-on9x1zhiap/images/stencil/1280x1280/products/117/389/gloss_finish__20465.1697219917.jpg?c=1'
      ),
      new Finiture(
        'Raw',
        "Rivela l'autenticità e la robustezza della fibra di carbonio con la finitura grezza. La superficie dona al materiale tecnologico un carattere unico, creando un aspetto rustico e autentico che celebra la bellezza della texture naturale",
        'https://videohive.img.customer.envatousercontent.com/files/e1f731f8-4444-4404-89c9-466aa50c1acb/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=7f3fd6057d34e58f13f531004050bd7f'
      ),
    ];
  }
}
