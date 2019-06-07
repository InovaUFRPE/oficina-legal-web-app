import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaOficinaComponent } from './lista-oficina.component';
import { ListaOficinaGuard } from '../guards/lista-oficina.guard';


const routes: Routes = [
  { path: '',
  component: ListaOficinaComponent,
   canActivate: [ListaOficinaGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaOficinaRoutingModule { }
