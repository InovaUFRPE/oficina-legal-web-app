import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalSaveService } from '../shared/local-save.service';

@Injectable()
export class OficinaGuard implements CanActivate {

   constructor(private authService: LocalSaveService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.authService.getUsuarioLogado();
      console.log(user);
      // if (user.usuario.tipo === '03' && Number(user.id) === Number(route.params.id) ||
      //    user.usuario.tipo === '04') {
      //    return true;
      // } else {
      //    this.router.navigate(['/login']);
      //    return false;
      // }
      if (user.usuario.tipo === '03' && Number(user.Oficina.id) === Number(route.params.id)) {
         return true;
      } else if (user.usuario.tipo === '03') {
         this.router.navigate([`/oficina/${user.Oficina.id}`]);
      } else if (user.usuario.tipo === '04') {
         return true;
      } else {
         this.router.navigate(['/login']);
         return false;
      }
      // console.log(Number(user));
      // console.log(Number(route.params.id));
      // console.log(user.usuario.tipo === '03' && Number(user.Oficina.id) === Number(route.params.id));
      // console.log(user.usuario.tipo === '03');
      // console.log(user.usuario.tipo === '04');
   }
}
