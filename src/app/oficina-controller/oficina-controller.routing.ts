import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinaControllerComponent } from './oficina-controller.component';
import { UserLoggedGuard } from '../guards/userLogged.guard';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  { path: '',
  component: OficinaControllerComponent
  , canActivate: [UserLoggedGuard, AdminGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OficinaControllerRoutingModule { }
