import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CitasPackageService {

  private cita = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.cita.asObservable();

  private citafiltro = new BehaviorSubject<any[]>([]);
  public responsef$: Observable<any[]> = this.citafiltro.asObservable();
  
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}cita`;
  idmedico:number;
  idespecialidad:number;
  constructor(private _http:HttpClient,private _globals:GlobalService) { }



  register: FormGroup = new FormGroup({
    ID_CITA: new FormControl(null),
    ID_PACIENTE: new FormControl('', Validators.required),
    ID_ESTADO_CITA: new FormControl('', Validators.required),
    MOTIVO: new FormControl('', Validators.required),
    OBSERVACION: new FormControl('', Validators.required),
    FECHA_CITA: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      ID_CITA:null,
      ID_PACIENTE:null,
      ID_ESTADO_CITA:null,
      MOTIVO:null,
      OBSERVACION:null,
      FECHA_CITA:null
    });
  }

  popForm(data:any){
    this.register.setValue(data);
  }

   mostrar(busqueda: string=""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('cita?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.cita.next(resp)
   }));
    return request$.subscribe();
  }

  
  mostrarfiltro(id:number,espe:number,busqueda: string=""){
    console.log(id,espe);
    this.Cargando$.next(true);
    const request$ = this._globals.obtener(`cita/${espe}/${id}?busqueda=`+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.cita.next(resp)
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

