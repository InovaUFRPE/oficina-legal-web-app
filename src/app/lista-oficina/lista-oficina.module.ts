import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatListModule, MatCardModule, MatButtonModule,
  MatTooltipModule, MatSelectModule, MatGridListModule, MatFormFieldModule} from '@angular/material';
import { ListaOficinaComponent } from './lista-oficina.component';
import { AppComponent } from 'src/app/app.component';
import { OficinaService } from 'src/app/shared/oficina.service';
import { ListaOficinaRoutingModule } from './lista-oficina.routing';
import { LocalSaveService } from '../shared/local-save.service';
import { ListaOficinaGuard } from '../guards/lista-oficina.guard';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ListaOficinaRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListaOficinaComponent,
  ],
  providers: [
    OficinaService,
    AppComponent,
    LocalSaveService,
    ListaOficinaGuard
  ]
})
export class ListaOficinaModule { }
