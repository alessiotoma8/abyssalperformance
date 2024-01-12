import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about/about-us.component';
import { ContactUsComponent } from './contact/contact.component';
import { ProductDetail } from './products/productdetail/productdetail.component';
import { FilterProducts } from './products/filter/filter.component';
import { ProductionComponent } from './production/production.component';
import { CustomComponent } from './custom/custom.component';

const routes: Routes = [
  {path: 'aboutus', component: AboutUsComponent,  data: { title: 'About Us' } },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products' },
    children: [
      { path: '', component: FilterProducts },
      { path: ':id', component: ProductDetail },
    ],
  },
  { path: 'contact', component: ContactUsComponent,data: { title: 'Contact' }, },
  { path: '', component: HomeComponent,data: { title: 'Home' }, },
  { path: 'production', component: ProductionComponent,data: { title: 'Production' }, },
  { path: 'custom', component: CustomComponent, data: { title: 'Custom' }, },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
