/// <reference types="@angular/localize" />


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

let ngRef: any;
platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (ngRef) {
    ngRef.destroy();
  }
  ngRef = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
