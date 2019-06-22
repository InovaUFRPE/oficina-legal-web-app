import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecanicoAccountComponent } from './mecanico-account.component';
import { MecanicoGuard } from '../guards/mecanico.guard';


const routes: Routes = [
  { path: '',
  component: MecanicoAccountComponent,
   canActivate: [ MecanicoGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanicoAccountRoutingModule { }
