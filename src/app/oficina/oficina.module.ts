import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule } from '@angular/material';
import { OficinaComponent } from './oficina.component';
import { AppComponent } from 'src/app/app.component';
import { OficinaService } from 'src/app/shared/oficina.service';
import { OficinaRoutingModule } from './oficina.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalSaveService } from '../shared/local-save.service';
import { OficinaGuard } from '../guards/oficina.guard';


@NgModule({
  imports: [
    CommonModule,
    OficinaRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [
    OficinaComponent,
  ],
  providers: [
    OficinaService,
    AppComponent,
    LocalSaveService,
    OficinaGuard
  ]
})
export class OficinaModule { }
