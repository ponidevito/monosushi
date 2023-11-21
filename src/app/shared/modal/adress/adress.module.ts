import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdressComponent } from '../adress/adress.component';
import { AdressRoutingModule } from '../adress/adress-routing.module'
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [
    AdressComponent
  ],
  imports: [
    CommonModule,
    AdressRoutingModule,
    SharedModule
  ]
})
export class  AdressModule { }

