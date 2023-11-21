import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AdminActionsComponent } from '../admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from '../admin/admin-category/admin-category.component';
import { AdminGoodsComponent } from '../admin/admin-goods/admin-goods.component';
import { AdminOrderComponent } from '../admin/admin-order/admin-order.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
        { path: 'actions', component: AdminActionsComponent },
        { path: 'category', component: AdminCategoryComponent },
        { path: 'goods', component: AdminGoodsComponent },
        { path: 'order', component: AdminOrderComponent },
        { path: '', pathMatch: 'full', redirectTo: 'category' }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
