import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class AdminGuard implements CanActivate {

   constructor(private authService: LocalSaveService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.authService.getUsuarioLogado();

      // if (user.type === 'Admin' && Number(user.id) === Number(route.params.id)) {
      //    return true;
      // } else {
      //    this.router.navigate(['/login']);
      //    return false;
      // }
      if (user.usuario.tipo === '04') {
         return true;
      } else {
         this.router.navigate(['/login']);
         return false;
      }
   }
}
