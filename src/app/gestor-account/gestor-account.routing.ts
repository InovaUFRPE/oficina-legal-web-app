import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestorAccountComponent } from './gestor-account.component';
import { GestorGuard } from '../guards/gestor.guard';


const routes: Routes = [
  { path: '',
  component: GestorAccountComponent,
   canActivate: [ GestorGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorAccountRoutingModule { }
