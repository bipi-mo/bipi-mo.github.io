import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { PayFormComponent } from './pay-form/pay-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PaymentService } from './pay-form/pay-form.service';

@NgModule({
  declarations: [AppComponent, PayFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [FormsModule],
  providers: [PaymentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
