import { Component, OnInit } from '@angular/core';
import { LocalSaveService } from '../shared/local-save.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  constructor(private localSaveService: LocalSaveService, private app: AppComponent) { }

  ngOnInit() {
    this.app.hideLoading();
    this.user = this.app.user;
  }

}
