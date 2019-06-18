import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatListModule, MatCardModule, MatButtonModule,
  MatTooltipModule, MatSelectModule, MatGridListModule, MatFormFieldModule
} from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { ListaFuncionarioRoutingModule } from './lista-funcionario.routing';
import { LocalSaveService } from '../shared/local-save.service';
import { ListaFuncionarioGuard } from '../guards/lista-funcionario.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { OficinaService } from '../shared/oficina.service';
import { ListaFuncionarioComponent } from './lista-funcionario.component';


@NgModule({
  declarations: [
    ListaFuncionarioComponent,
  ],
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
  providers: [
    MecanicoService,
    OficinaService,
    AppComponent,
    LocalSaveService,
    ListaFuncionarioGuard
  ]
})
export class ListaFuncionarioModule { }
