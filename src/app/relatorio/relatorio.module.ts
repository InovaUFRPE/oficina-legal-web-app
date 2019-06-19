import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { RelatorioComponent } from './relatorio.component';
import { AppComponent } from 'src/app/app.component';
import { GestorService } from 'src/app/shared/gestor.service';
import { RelatorioRoutingModule } from './relatorio.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { OficinaService } from 'src/app/shared/oficina.service';
import { LocalSaveService } from '../shared/local-save.service';
import { RelatorioService } from '../shared/relatorio.service';
import { RelatorioGuard } from '../guards/relatorio.guard';

@NgModule({
  imports: [
    CommonModule,
    RelatorioRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
  ],
  declarations: [
    RelatorioComponent,
  ],
  providers: [
    RelatorioService,
    AppComponent,
    OficinaService,
    LocalSaveService,
    RelatorioGuard
  ]
})
export class RelatorioModule { }
