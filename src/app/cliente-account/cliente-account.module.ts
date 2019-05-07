import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { ClienteAccountComponent } from './cliente-account.component';
import { AppComponent } from 'src/app/app.component';
import { ClienteService } from 'src/app/shared/cliente.service';
import { ClienteAccountRoutingModule } from './cliente-account.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalSaveService } from '../shared/local-save.service';


@NgModule({
  imports: [
    CommonModule,
    ClienteAccountRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [
    ClienteAccountComponent,
  ],
  providers: [
    ClienteService,
    AppComponent,
    LocalSaveService
  ]
})
export class ClienteAccountModule { }
