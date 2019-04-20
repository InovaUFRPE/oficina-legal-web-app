import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinaControllerComponent } from './oficina-controller.component';


const routes: Routes = [
  { path: '', component: OficinaControllerComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinaControllerRoutingModule { }
