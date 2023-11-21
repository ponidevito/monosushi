import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from '../about-us/about-us.component';
import { AboutUsRoutingModule } from '../../pages/about-us/about-us-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule
  ]
})
export class AboutUsModule { }
