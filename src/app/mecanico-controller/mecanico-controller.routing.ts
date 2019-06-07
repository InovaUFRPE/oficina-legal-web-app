import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecanicoControllerComponent } from './mecanico-controller.component';


const routes: Routes = [
  { path: '', component: MecanicoControllerComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanicoControllerRoutingModule { }
