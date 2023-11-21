import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsRoutingModule } from '../../pages/actions/actions-routing.module';
import { ActionsComponent } from '../actions/actions.component';
import { ActionsInfoComponent } from '../actions/actions-info/actions-info.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ActionsComponent,
    ActionsInfoComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    SharedModule
  ]
})
export class ActionsModule { }
