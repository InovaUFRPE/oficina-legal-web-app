import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class RelatorioGuard implements CanActivate {

   constructor(private authService: LocalSaveService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.authService.getUsuarioLogado();
      if (user.usuario.tipo === '03' && Number(user.Oficina.id) === Number(route.params.id)) {
         return true;
      } else if (user.usuario.tipo === '03') {
         this.router.navigate([`/oficina/${user.Oficina.id}/relatorios`]);
      } else if (user.usuario.tipo === '04') {
         return true;
      } else {
         this.router.navigate(['/login']);
         return false;
      }
   }
}
