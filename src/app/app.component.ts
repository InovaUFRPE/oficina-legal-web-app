import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  urlApi = 'http://localhost/api/';
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

  constructor(private _router: Router, private snotify: SnotifyService,  private spinner: NgxSpinnerService) {}

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

}
