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
  soloMisCitas: any = false;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }



  register: FormGroup = new FormGroup({
    ID_CITA: new FormControl(null),
    ID_PACIENTE: new FormControl('', Validators.required),
    ID_ESTADO_CITA: new FormControl('', Validators.required),
    MOTIVO: new FormControl('', Validators.required),
    FECHA_CITA: new FormControl('', Validators.required)
  });

  inicializarForm(){
    this.register.setValue({
      ID_CITA:null,
      ID_PACIENTE:null,
      ID_ESTADO_CITA:null,
      MOTIVO:null,
      FECHA_CITA:null
    });
  }

  popForm(data:any){
    this.register.setValue({
      ID_CITA:data.ID_CITA,
      ID_PACIENTE:data.ID_PACIENTE,
      ID_ESTADO_CITA:data.ID_ESTADO_CITA,
      MOTIVO:data.MOTIVO,
      FECHA_CITA:data.FECHA_CITA
    });
  }

   mostrar(busqueda: string=""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('cita?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.cita.next(resp)
   }));
    return request$.subscribe();
  }

  mostrarCitasMedico(busqueda: string="", idMedico){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('cita/medico/'+idMedico+'/search/pls?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.cita.next(resp)
   }));
    return request$.subscribe();
  }
  
  mostrarfiltro(id:number,espe:number,busqueda: string=""){
    console.log(id,espe);
    this.Cargando$.next(true);
    const request$ = this._globals.obtener(`cita/all/citas/pacientes?busqueda=`+busqueda).pipe(tap((resp:any)=>{
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

  updateStatusOrder(idStatus: number, idDate: number):Observable<any>{
    return this._http.put(this.url+'/status',{
      id: idDate, estado: idStatus
    });
  }

  eliminar(id:any):Observable<any>{
     return this._http.delete(this.url+'/'+id);
  }
}

