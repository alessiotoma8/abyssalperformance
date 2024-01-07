import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CaroselComponent } from './home/carossel/carosel.component';
import { InfoComponent } from './home/info/info.component';
import { HomeComponent } from './home/home.component';
import { CategoriesService } from './Common/services/category.service';
import { ProductsService } from './Common/services/product.service';
import { CartService } from './Common/services/cart.service';
import { AppRoutingModule } from './app-routing.module';
import { FinitureService } from './Common/services/finiture.service';
import { ThemeService } from './Common/services/theme.service';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    CaroselComponent,
    InfoComponent,
    HomeComponent,
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
