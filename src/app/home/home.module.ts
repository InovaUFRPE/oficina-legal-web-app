import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeRoutingModule } from './home.routing';
import { MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
