import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { LocalSaveService } from './shared/local-save.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    SnotifyModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    LocalSaveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
