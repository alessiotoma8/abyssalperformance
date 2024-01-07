import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { TestComponent } from "./test/test.component";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        TestComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}