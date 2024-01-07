import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.css'],
})
export class CaroselComponent implements AfterViewInit {
  @ViewChild('carouselWithIndicators') carouselElement: ElementRef<HTMLElement>;

  carouselRef: Carousel;
  activeIndex: number = 0;

  ngAfterViewInit() {
    this.carouselRef = new Carousel(this.carouselElement.nativeElement, {
      interval: 3000,
    });
    this.stopSlide();
    //this.startSlide()
  }

  startSlide() {
    this.carouselRef.cycle();
  }

  stopSlide() {
    this.carouselRef.pause();
  }
}
