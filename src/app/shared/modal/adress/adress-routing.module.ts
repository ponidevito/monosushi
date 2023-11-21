import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdressComponent } from '../adress/adress.component';

const routes: Routes = [
    {
      path: '', component: AdressComponent
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
 export class AdressRoutingModule { }
