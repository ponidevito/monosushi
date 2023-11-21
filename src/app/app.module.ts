import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import {  DatePipe } from '@angular/common';


import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { CapitalizePipe } from './shared/pipes/capitalize/capitalize.pipe';
import { PhoneComponent } from './shared/modal/phone/phone.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PhoneComponent,
    CheckoutComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    NgProgressModule,
    NgProgressRouterModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    HttpClientModule,
    SharedModule,
    provideDatabase(() => getDatabase()),
    provideRemoteConfig(() => getRemoteConfig()),
   
  ],
  exports: [
    CapitalizePipe,
    HeaderComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
