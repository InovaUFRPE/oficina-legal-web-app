import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { MecanicoControllerComponent } from './mecanico-controller.component';
import { AppComponent } from 'src/app/app.component';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { MecanicoControllerRoutingModule } from './mecanico-controller.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { OficinaService } from 'src/app/shared/oficina.service';
import { LocalSaveService } from '../shared/local-save.service';

@NgModule({
  imports: [
    CommonModule,
    MecanicoControllerRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    MecanicoControllerComponent,
  ],
  providers: [
    MecanicoService,
    AppComponent,
    OficinaService,
    LocalSaveService
  ]
})
export class MecanicoControllerModule { }
