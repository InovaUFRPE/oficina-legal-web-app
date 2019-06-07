import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteAccountComponent } from './cliente-account.component';


const routes: Routes = [
  { path: '', component: ClienteAccountComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteAccountRoutingModule { }
