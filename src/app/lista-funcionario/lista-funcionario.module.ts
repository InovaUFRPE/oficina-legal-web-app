import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatListModule, MatCardModule, MatButtonModule,
  MatTooltipModule, MatSelectModule, MatGridListModule, MatFormFieldModule
} from '@angular/material';
import { ListaFuncionarioComponent } from './lista-funcionario.component';
import { AppComponent } from 'src/app/app.component';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { ListaFuncionarioRoutingModule } from './lista-funcionario.routing';
import { LocalSaveService } from '../shared/local-save.service';
import { ListaFuncionarioGuard } from '../guards/lista-funcionario.guard';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ListaFuncionarioRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListaFuncionarioComponent,
  ],
  providers: [
    MecanicoService,
    AppComponent,
    LocalSaveService,
    ListaFuncionarioGuard
  ]
})
export class ListaFuncionarioModule { }
