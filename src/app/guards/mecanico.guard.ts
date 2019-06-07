import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class MecanicoGuard implements CanActivate {

   constructor(private authService: LocalSaveService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.authService.getUsuarioLogado();

      if (user.usuario.tipo === '02' && Number(user.id) === Number(route.params.id) ||
         user.usuario.tipo === '03' || user.usuario.tipo === '04') {
         return true;
      } else {
         this.router.navigate(['/login']);
         return false;
      }
   }

}
