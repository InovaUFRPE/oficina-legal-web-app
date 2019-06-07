import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { Router } from '@angular/router';
import { LocalSaveService } from './shared/local-save.service';
export interface GenericQueryParams {

  q?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  urlApi = 'http://localhost:5000/api/';
  title = 'web-app';
  style = 'material';
  timeout = 4000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;
  user;
  token: string;

  constructor(private _router: Router, private snotify: SnotifyService, private spinner: NgxSpinnerService,
    private _localSaveService: LocalSaveService) {
      this.token = this._localSaveService.getToken();
    }
  ngOnInit() {
    this.user = this._localSaveService.getUsuarioLogado();
  }

  getConfig(): SnotifyToastConfig {
    this.snotify.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  showLoading(): void {
    this.spinner.show();

  }

  hideLoading(): void {
    this.spinner.hide();
  }

  login(user: any) {
    this.user = user;
    this._localSaveService.setUsuarioLogado(user);
  }
  logoff() {
    this._localSaveService.logOut();
    this.user = null;
    // this._router.navigate(['.']);
    this._router.navigate(['/']);
  }
}
