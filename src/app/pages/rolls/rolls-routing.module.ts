import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RollsComponent } from './rolls.component';
import { RollsInfoComponent } from './rolls-info/rolls-info.component';

const routes: Routes = [
  {
    path: '',
    component: RollsComponent,
  },
    {
      path: ':id',
      component: RollsInfoComponent,
    },
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class RollsRoutingModule {}