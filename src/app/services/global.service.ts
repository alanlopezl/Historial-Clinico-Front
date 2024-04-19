import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
 
  usuario: string = "";
  arregloSubject = new BehaviorSubject<any[]>([])
  permisos = this.arregloSubject.asObservable()
  rol: number = 0;
  idUsuario: number = 0;
  estado: string = "";
  private baseURL: string = environment.url;

  constructor(private http: HttpClient) { }

  // observable -- esta pendiende de posibles cambios rxjs

  crearBackup(params:any):Observable<any>{
    return this.http.post(`${environment.url+"backup"}`,params).pipe(map((resp:any)=>resp));
  }

  updatepassuser(params:any){
   return this.http.put(`${environment.url+"usuariopassupdate"}`,params).pipe(catchError(err => of(err.error.msg)));
  }

  obtener(url: string): Observable<any> {
    return this.http.get(`${environment.url + url}`).pipe(map((resp: any) => resp.data));
  }

  crear(params: any): Observable<any> {
    return this.http.post(`${environment.url + "bitacora"}`, params).pipe(map((resp: any) => resp));
  }
/*

  crearUserPers(params: any): Observable<any> {
    return this.http.post(`${environment.url + "personauser"}`, params).pipe(catchError(err => of(err)));
  }*/

  

// ...

crearUserPers(params: any): Observable<any> {
  return this.http.post(`${environment.url}personauser`, params).pipe(catchError(err => of(err.error.mensaje)));
}



  mostrarpermisos(): Observable<any> {
    let id = localStorage.getItem('rol');
    return this.http.get(`${environment.url + 'permisossistema/'}${id}`).pipe(map((resp: any) => resp.data));
  }

  mostrarusuario(): Observable<any> {
    let id = localStorage.getItem('user');
    return this.http.get(`${environment.url + 'userid/'}${id}`).pipe(map((resp: any) => resp.data));
  }

  login(params: any) {
    return this.http.post(`${environment.url + 'login'}`, params).pipe(map((resp: any) => resp));
  }

  recuperacionCorreo(params: any) {
    return this.http.post(`${environment.url + 'recuperacioncorreo'}`, params).pipe(map((resp: any) => resp));
  }

  cambiopass(params: any) {
    return this.http.post(`${environment.url + 'cambiopass'}`, params).pipe(map((resp: any) => resp));
  }

  configPreguntas(params: any) {
    return this.http.post(`${environment.url + 'login'}`, params).pipe(map((resp: any) => resp));
  }

  updatePerfil(params:any){
   return this.http.put(`${environment.url+ 'personaperfil'}`,params).pipe(map((resp:any)=>resp));

    
  }

  revalidarTokenCorreo(token: string) {

    const url: string = `${this.baseURL}recuperacion-correo/${token}`;
    return this.http.get( url )
      .pipe(
        tap((resp: any)=> {
          if( resp.ok === true ) {
            this.idUsuario = resp.id_usuario;
          }
        }),
        catchError( err => of(err.error) )
    )
  }

  validarTokenCorreoCliente(token: string, status: number) {

    const url: string = `${this.baseURL}cita/client/${token}`;
    return this.http.put( url, {status} )
  }

}
