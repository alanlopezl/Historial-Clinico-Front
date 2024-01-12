import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstadoCitaPackageService {

  private estado = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.estado.asObservable();
  
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}estadocita`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

 
  register: FormGroup = new FormGroup({
    ID_ESTADO_CITA: new FormControl(null),
    NOMBRE: new FormControl('', Validators.required),
  });

  inicializarForm(){
    this.register.setValue({
      ID_ESTADO_CITA:null,
      NOMBRE:''
    })
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(busqueda: string=""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('estadocita?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.estado.next(resp)
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
