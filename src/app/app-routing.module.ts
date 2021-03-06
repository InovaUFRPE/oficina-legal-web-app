import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'cliente/:id', loadChildren: './cliente-account/cliente-account.module#ClienteAccountModule' },
  { path: 'cliente/:id/controlador', loadChildren: './cliente-controller/cliente-controller.module#ClienteControllerModule' },
  { path: 'oficina/controlador', loadChildren: './oficina-controller/oficina-controller.module#OficinaControllerModule' },
  { path: 'gestor/:id', loadChildren: './gestor-account/gestor-account.module#GestorAccountModule' },
  // { path: 'gestor/:id/controlador', loadChildren: './gestor-controller/gestor-controller.module#GestorControllerModule' },
  { path: 'mecanico/:id', loadChildren: './mecanico-account/mecanico-account.module#MecanicoAccountModule' },
  { path: 'oficina/:id', loadChildren: './oficina/oficina.module#OficinaModule' },
  { path: 'lista-oficina', loadChildren: './lista-oficina/lista-oficina.module#ListaOficinaModule' },
  { path: 'oficina/:id/funcionarios', loadChildren: './lista-funcionario/lista-funcionario.module#ListaFuncionarioModule' },
  { path: 'oficina/:id/relatorios', loadChildren: './relatorio/relatorio.module#RelatorioModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
