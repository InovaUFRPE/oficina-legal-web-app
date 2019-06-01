import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinaComponent } from './oficina.component';
import { OficinaGuard } from '../guards/oficina.guard';


const routes: Routes = [
  { path: '',
  component: OficinaComponent,
   canActivate: [OficinaGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinaRoutingModule { }
