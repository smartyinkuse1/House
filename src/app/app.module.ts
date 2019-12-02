import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatToolbar,
   MatSelectModule, MatProgressSpinnerModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HouseCreateComponent } from './houses/houses-create/houses-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HouseListComponent } from './houses/houses-list/houses-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RequestCreateComponent } from './requests/requests-create/requests-create.component';
import { RequestListComponent } from './requests/requests-list/requests-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HouseCreateComponent,
    HeaderComponent,
    HouseListComponent,
    RequestCreateComponent,
    RequestListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
