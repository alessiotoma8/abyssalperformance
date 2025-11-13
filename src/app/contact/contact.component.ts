import { Component, Input, OnDestroy } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Product } from '../Common/product.model';
import { CartService } from '../Common/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactUsComponent implements OnDestroy {
  @Input() title: string = 'Contattaci';
  @Input() titleAlignment: string = 'left';
  form: FormGroup;
  selectedProduct: Product;
  submitted = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;

  cartService: CartService;

  constructor(private fb: FormBuilder, cartService: CartService) {
    this.cartService = cartService;
    this.form = this.fb.group({
      Nome: ['', Validators.pattern('.*')],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Product: ['', Validators.pattern('.*')],
      Model: ['', Validators.pattern('.*')],
      Message: ['', Validators.required],
    });
    let productDesc = (
      cartService.selectedProduct?.productName ?? ''
    ).toString();
    let modelDesc = (cartService.seletedModel?.modelName ?? '').toString();

    this.form.get('Product').setValue(productDesc);
    this.form.get('Model').setValue(modelDesc);
  }

  ngOnDestroy() {
    this.cartService.resetAll();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async sendEmail() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    emailjs.init('key');

    const { Nome, Email, Product, Model, Message } = this.form.value;

    let response = await emailjs.send('service_j81rnd5', 'template_fdj9ybo', {
      from_name: Nome,
      productName: Product,
      model: Model,
      message: Message,
      reply_to: Email,
    });

    if (response.status == 200) {
        this.isLoading = false;
        this.showAndHideAlertEmail();
    }else{
      this.isLoading = false;
      this.showAndHideAlertEmailError();
    }
  }

  showAndHideAlertEmailError() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 5000);
  }

  showAndHideAlertEmail() {
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 5000);
  }
}
