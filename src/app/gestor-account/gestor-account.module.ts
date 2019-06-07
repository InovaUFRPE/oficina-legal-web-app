import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { GestorAccountComponent } from './gestor-account.component';
import { AppComponent } from 'src/app/app.component';
import { GestorService } from 'src/app/shared/gestor.service';
import { GestorAccountRoutingModule } from './gestor-account.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalSaveService } from '../shared/local-save.service';
import { GestorGuard } from '../guards/gestor.guard';


@NgModule({
  imports: [
    CommonModule,
    GestorAccountRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [
    GestorAccountComponent,
  ],
  providers: [
    GestorService,
    AppComponent,
    LocalSaveService,
    GestorGuard
  ]
})
export class GestorAccountModule { }
