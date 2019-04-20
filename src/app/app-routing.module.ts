import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule'},
  { path: 'cliente/controlador', loadChildren: './cliente-controller/cliente-controller.module#ClienteControllerModule'},
  { path: 'oficina/controlador', loadChildren: './oficina-controller/oficina-controller.module#OficinaControllerModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
