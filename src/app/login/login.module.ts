import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from '../shared/login.service';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatGridListModule,
  MatDividerModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from '../guards/login.guard';
import { LocalSaveService } from '../shared/local-save.service';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [
    LoginService,
    LocalSaveService,
    LoginGuard
   ],
})
export class LoginModule { }
