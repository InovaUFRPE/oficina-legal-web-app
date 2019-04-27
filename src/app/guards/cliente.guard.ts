import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class ClienteGuard implements CanActivate {

   constructor(private authService: LocalSaveService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.authService.getUsuarioLogado();

      // if (user.type === 'Cliente' && Number(user.id) === Number(route.params.id)) {
      //    return true;
      // } else {
      //    this.router.navigate(['/login']);
      //    return false;
      // }
      if (user.usuario.tipo === '01') {
         return true;
      } else {
         this.router.navigate(['/login']);
         return false;
      }
   }

}
