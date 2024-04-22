import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstadoDienteService {

  private estados = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.estados.asObservable();
  
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}estados`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    ID_TRATAMIENTO: new FormControl(null),
    NOMBRE: new FormControl('', Validators.required),
    PRECIO: new FormControl('', Validators.required),
  });

  inicializarForm(){
    this.register.setValue({
      ID_TRATAMIENTO:null,
      NOMBRE: '',
      PRECIO: ''
    });
  }

  popForm(data:any){
    console.log(data);
    this.register.setValue(data);
  }

   mostrar(busqueda: string=""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('estados?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.estados.next(resp)
   }));
    return request$.subscribe();
  }

  mostrarpermiso(rol:any,objeto){
    const request$ = this._globals.obtener(`permisossistemaid/${rol}/${objeto}`).pipe(tap((resp:any)=>{
     this.permiso.next(resp)
   }));
    return request$.subscribe();
  }

  crear(params:any):Observable<any>{
    return this._http.post(this.url,params).pipe(map((resp:any)=>resp));
  }

  actualizar(params:any):Observable<any>{
    return this._http.put(this.url,params).pipe(map((resp:any)=>resp));
  }

  eliminar(id:any):Observable<any>{
     return this._http.delete(this.url+'/'+id);
  }
}
