import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { SweetAlertService } from '../services/sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class CorreoGuard implements CanActivate, CanLoad {

  constructor(private authService: GlobalService, private router: Router,
    private _sweet: SweetAlertService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Extraer el token de la ruta
    const { token } = route.params;

    // Validar Token
    return this.authService.revalidarTokenCorreo( token )
      .pipe(
        tap( (valido: any) => {

          // Si no es válido, lanzar error y sacar de la pantalla
          if( !valido.ok ) {
            this.router.navigateByUrl('/inicio')
            this._sweet.mensajeSimple(valido.msg,'', 'error');
          }
          
        })
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
