import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RollsRoutingModule } from './rolls-routing.module';
import { RollsComponent } from './rolls.component';
import { RollsInfoComponent } from './rolls-info/rolls-info.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    RollsComponent,
    RollsInfoComponent
  ],
  imports: [
    CommonModule,
    RollsRoutingModule,
    SharedModule
  ]
})
export class RollsModule { }
