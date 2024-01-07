import { Component } from '@angular/core';
import { ThemeService } from './Common/services/theme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  darkThemeEnabled: boolean;

  constructor(private themeService: ThemeService) {
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
}
