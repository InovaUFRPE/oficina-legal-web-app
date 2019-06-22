import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { OficinaControllerComponent } from './oficina-controller.component';
import { AppComponent } from 'src/app/app.component';
import { OficinaService } from 'src/app/shared/oficina.service';
import { OficinaControllerRoutingModule } from './oficina-controller.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalSaveService } from '../shared/local-save.service';
import { UserLoggedGuard } from '../guards/userLogged.guard';
import { AdminGuard } from '../guards/admin.guard';


@NgModule({
  imports: [
    CommonModule,
    OficinaControllerRoutingModule,
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
    OficinaControllerComponent,
  ],
  providers: [
    OficinaService,
    AppComponent,
    LocalSaveService,
    UserLoggedGuard,
    AdminGuard
  ]
})
export class OficinaControllerModule { }
