import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioGuard } from '../guards/relatorio.guard';


const routes: Routes = [
  { path: '', component: RelatorioComponent,
  canActivate: [RelatorioGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
