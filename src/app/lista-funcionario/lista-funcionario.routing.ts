import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaFuncionarioGuard } from '../guards/lista-funcionario.guard';
import { ListaFuncionarioComponent } from './lista-funcionario.component';


const routes: Routes = [
  {
    path: '',
    component: ListaFuncionarioComponent,
    canActivate: [ListaFuncionarioGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaFuncionarioRoutingModule { }
