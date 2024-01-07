import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
  darkThemeEnabled: boolean;

  get theme(): string {
    return document.documentElement.getAttribute('theme');
  }

  set theme(name: string) {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    document.documentElement.setAttribute('theme', name);
  }
}
