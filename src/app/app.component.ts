import { Component, AfterViewInit } from '@angular/core';
import { ThemeService } from './Common/services/theme.service';
import { FirebaseAnalyticsService } from '../app/Common/services/firebase.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  darkThemeEnabled: boolean;

  constructor(private firebaseAnalyticsService: FirebaseAnalyticsService,private themeService: ThemeService) {
    this.firebaseAnalyticsService.initializeAnalytics();
    this.darkThemeEnabled = themeService.darkThemeEnabled;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      this.themeService.theme = 'dark';
    } else {
      this.themeService.theme = "";
    }
  }

  ngAfterViewInit(): void {
    
  }
}
