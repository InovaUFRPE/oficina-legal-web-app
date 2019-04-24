import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { ClienteControllerComponent } from './cliente-controller.component';
import { AppComponent } from 'src/app/app.component';
import { ClienteService } from 'src/app/shared/cliente.service';
import { ClienteControllerRoutingModule } from './cliente-controller.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalSaveService } from '../shared/local-save.service';


@NgModule({
  imports: [
    CommonModule,
    ClienteControllerRoutingModule,
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
    ClienteControllerComponent,
  ],
  providers: [
    ClienteService,
    AppComponent,
    LocalSaveService
  ]
})
export class ClienteControllerModule { }
