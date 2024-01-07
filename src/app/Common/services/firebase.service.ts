import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as firebase from 'firebase/app'
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

@Injectable({
  providedIn: 'root',
})
export class FirebaseAnalyticsService {
    analytics:Analytics;
  constructor(private router: Router) {
    this.analytics = getAnalytics();
  }

  initializeAnalytics() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pagePath = event.urlAfterRedirects;
        
        logEvent(this.analytics, 'page_view', {
            page_path: pagePath,
            page_title: pagePath
        });
      }
    });
  }
}