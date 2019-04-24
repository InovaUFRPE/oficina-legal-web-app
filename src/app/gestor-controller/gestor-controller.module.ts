import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { GestorControllerComponent } from './gestor-controller.component';
import { AppComponent } from 'src/app/app.component';
import { GestorService } from 'src/app/shared/gestor.service';
import { GestorControllerRoutingModule } from './gestor-controller.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { OficinaService } from 'src/app/shared/oficina.service';
import { LocalSaveService } from '../shared/local-save.service';

@NgModule({
  imports: [
    CommonModule,
    GestorControllerRoutingModule,
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
    GestorControllerComponent,
  ],
  providers: [
    GestorService,
    AppComponent,
    OficinaService,
    LocalSaveService
  ]
})
export class GestorControllerModule { }
