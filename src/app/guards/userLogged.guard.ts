import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class UserLoggedGuard implements CanActivate {

   constructor(private authService: LocalSaveService, private router: Router) { }

   canActivate() {
      if (this.authService.getUsuarioLogado()) {
         return true;
      } else {
         this.router.navigate(['/login']);
         return false;
      }
   }
}
