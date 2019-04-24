import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestorControllerComponent } from './gestor-controller.component';


const routes: Routes = [
  { path: '', component: GestorControllerComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorControllerRoutingModule { }
