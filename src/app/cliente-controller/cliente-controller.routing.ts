import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteControllerComponent } from './cliente-controller.component';


const routes: Routes = [
  { path: '', component: ClienteControllerComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteControllerRoutingModule { }
