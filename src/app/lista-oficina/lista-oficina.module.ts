import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule,
  MatTooltipModule, MatSelectModule, MatGridListModule} from '@angular/material';
import { OficinaComponent } from './lista-oficina.component';
import { AppComponent } from 'src/app/app.component';
import { OficinaService } from 'src/app/shared/oficina.service';
import { OficinaRoutingModule } from './lista-oficina.routing';
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
    MatGridListModule,
    MatSelectModule,
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
