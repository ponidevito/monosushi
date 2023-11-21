import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from '../../pages/cabinet/cabinet.component';
import { CabinetUserComponent } from '../../pages/cabinet/cabinet-user/cabinet-user.component';
import { OrdersHistoryComponent } from '../../pages/cabinet/orders-history/orders-history.component';
import { HeaderRoutingModule } from '../header/header-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ChangePasswordComponent } from '../../pages/cabinet/change-password/change-password.component';



@NgModule({
  declarations: [
    CabinetComponent,
    CabinetUserComponent,
    OrdersHistoryComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    SharedModule
  ]
})
export class HeaderModule { }
