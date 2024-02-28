import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class PacientesPackageService {

  private pacientes = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.pacientes.asObservable();
  
  // Info del paciente
  public selectedIdPaciente: number = 0;
  public selectedNamePaciente: string = "";
  
  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(false);
  public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();

  private url = `${environment.url}pacientes`;

  constructor(private _http:HttpClient,private _globals:GlobalService) { }

  register: FormGroup = new FormGroup({
    COD_PERSONA: new FormControl(null),
    PRIMER_NOMBRE: new FormControl('', Validators.required),
    SEGUNDO_NOMBRE: new FormControl(''),
    PRIMER_APELLIDO: new FormControl('', Validators.required),
    SEGUNDO_APELLIDO: new FormControl(''),
    DNI: new FormControl('', Validators.required),
    FEC_NACIMIENTO: new FormControl('', Validators.required),
    SEXO: new FormControl('', Validators.required),
    EDAD: new FormControl('', Validators.required),
    EMAIL: new FormControl('', Validators.required),
    CIVIL: new FormControl('', Validators.required),
    OCUPACION: new FormControl('', Validators.required),
    TEL: new FormControl('', Validators.required),
    CONTACTO_EMERGENCIA: new FormControl('', Validators.required),
    EMERGENCIA_TEL: new FormControl('', Validators.required),
    DIRECCION: new FormControl('', Validators.required),
    OBS: new FormControl(''),
  });

  inicializarForm(){
    this.register.setValue({
      COD_PERSONA:null,
      PRIMER_NOMBRE:'',
      SEGUNDO_NOMBRE:'',
      PRIMER_APELLIDO:'',
      SEGUNDO_APELLIDO:'',
      DNI:'',
      FEC_NACIMIENTO:'',
      SEXO:'',
      EDAD: '',
      EMAIL: '',
      CIVIL: '',
      OCUPACION: '',
      TEL: '',
      CONTACTO_EMERGENCIA: '',
      EMERGENCIA_TEL: '',
      OBS: '',
      DIRECCION: ''
    })
  }

  popForm(data:any){
    this.register.patchValue({
      COD_PERSONA:data.COD_PERSONA,
      PRIMER_NOMBRE:data.PRIMER_NOMBRE,
      SEGUNDO_NOMBRE:data.SEGUNDO_NOMBRE,
      PRIMER_APELLIDO:data.PRIMER_APELLIDO,
      SEGUNDO_APELLIDO:data.SEGUNDO_APELLIDO,
      DNI:data.DNI,
      FEC_NACIMIENTO:data.FEC_NACIMIENTO,
      SEXO:data.SEXO,
      EDAD: data.EDAD,
      EMAIL: data.EMAIL,
      CIVIL: data.EST_CIVIL,
      OCUPACION: data.OCUPACION,
      TEL: data.TELEFONO,
      CONTACTO_EMERGENCIA: data.CONTACTO_EMERGENCIA,
      EMERGENCIA_TEL: data.CONTACTO_EMER_TEL,
      OBS: data.OBSERVACIONES,
      DIRECCION: data.DIRECCION
     } )

     console.log(this.register.value);
   // this.register.setValue(data);
  }/*
  popForm(data:any){
    this.register.setValue(data);
    
  }*/

   mostrar(busqueda: string=""){
    this.Cargando$.next(true);
    const request$ = this._globals.obtener('pacientes?busqueda='+busqueda).pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.pacientes.next(resp)
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
