import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: LocalSaveService, private router: Router) { }

  canActivate() {
    const user = this.authService.getUsuarioLogado();

    if (user) {
      this.router.navigate([`/home`]);
    } else {
      return true;
    }

  }
}
