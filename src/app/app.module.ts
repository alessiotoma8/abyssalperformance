import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MenuComponent } from './menu/menu.component';
import { CaroselComponent } from './home/carossel/carosel.component';
import { InfoComponent } from './home/info/info.component';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './social/social.component';
import { CategoriesService } from './Common/services/category.service';
import { ProductsService } from './Common/services/product.service';
import { CartService } from './Common/services/cart.service';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductList } from './products/productlist/product-list.component';
import { FilterProducts } from './products/filter/filter.component';
import { ProductDetail } from './products/productdetail/productdetail.component';
import { AboutUsComponent } from './about/about-us.component';
import { CustomComponent } from './custom/custom.component';
import { ContactUsComponent } from './contact/contact.component';
import { ProductionComponent } from './production/production.component';
import { FinitureService } from './Common/services/finiture.service';
import { ThemeService } from './Common/services/theme.service';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MenuComponent,
    CaroselComponent,
    InfoComponent,
    SocialComponent,
    HomeComponent,
    ProductsComponent,
    FilterProducts,
    ProductList,
    AboutUsComponent,
    ContactUsComponent,
    ProductDetail,
    ProductionComponent,
    CustomComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    CategoriesService,
    ThemeService,
    ProductsService,
    CartService,
    FinitureService,
  ],
})
export class AppModule {}
