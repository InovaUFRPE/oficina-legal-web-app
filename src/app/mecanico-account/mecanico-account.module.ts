import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { MecanicoAccountComponent } from './mecanico-account.component';
import { AppComponent } from 'src/app/app.component';
import { MecanicoService } from 'src/app/shared/mecanico.service';
import { MecanicoAccountRoutingModule } from './mecanico-account.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalSaveService } from '../shared/local-save.service';
import { MecanicoGuard } from '../guards/mecanico.guard';


@NgModule({
  imports: [
    CommonModule,
    MecanicoAccountRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [
    MecanicoAccountComponent,
  ],
  providers: [
    MecanicoService,
    AppComponent,
    LocalSaveService,
    MecanicoGuard
  ]
})
export class MecanicoAccountModule { }
