import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrokerListComponent } from './broker-list/broker-list.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { SettingsComponent } from './settings/settings.component';
import { JopaComponent } from './jopa/jopa.component';

@NgModule({
  declarations: [
    AppComponent,
    BrokerListComponent,
    StockListComponent,
    SettingsComponent,
    JopaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
