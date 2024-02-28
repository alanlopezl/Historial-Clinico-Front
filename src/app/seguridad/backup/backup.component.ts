import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import {GlobalService} from '../../services/global.service';
import {tap} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackageService } from './package.service';
import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import { Router } from '@angular/router';
import { acceso } from 'src/app/helper/acceso';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  usuario:any;
  nombreRespaldo: string = "";
  archivo: File | undefined;
  restaurando: boolean = false;
  generando: boolean = false;

  register:any
  private back = new BehaviorSubject<any[]>([]);
  public response$: Observable<any[]> = this.back.asObservable();

  private Cargando$ = new BehaviorSubject<boolean>(true);
  //public responseCargando$: Observable<boolean> = this.Cargando$.asObservable();
  ingreso!: Subscription;
  salida!: Subscription;

  permisoIngreso: boolean = false;
  
  permisos: any = [];
   private cargando = new BehaviorSubject<boolean>(false);
   public responseCargando$: Observable<boolean> = this.cargando.asObservable();

  constructor(private _service:GlobalService,
    private _sweet: SweetAlertService,
    private backupService: PackageService,
    private _bitacora: GlobalService,
    private router: Router) { 
      this.backupService.mostrarpermiso(localStorage.getItem('rol'), 23);
      this.backupService.responsepermiso$.subscribe((r) => {
        this.permisos = r[0];
        this.permisoIngreso = acceso(this.router, this.permisos.CONSULTAR)
      });
    }

  ngOnInit(): void {
    this.mostrar();
    this.register = new FormGroup({
      NOMBRE: new FormControl(null)
    });
  }

  ngAfterContentInit(): void {
    if( this.permisoIngreso ) {

      // Crear body del ingreso
      const body = {

        idUsuario: this._bitacora.idUsuario,
        idObjeto: 23,
        accion: 'Ingreso',
        descripcion: 'Se ingresó a la pantalla de backup'

      }

      this.ingreso = this._bitacora.crear(body).subscribe();

    }
  }

  ngOnDestroy(): void {
    if( this.permisoIngreso ) {

      // Crear body del ingreso
      const body = {

        idUsuario: this._bitacora.idUsuario,
        idObjeto: 23,
        accion: 'Salida',
        descripcion: 'Se salió de la pantalla de backup'

      }

      this.salida = this._bitacora.crear(body).subscribe();

      if(this.salida) {

        this.salida.unsubscribe();
      }
      if(this.ingreso) {

        this.ingreso.unsubscribe();
      }

    }
  }

  mostrar(){
    this.Cargando$.next(true);
    const request$ = this._service.obtener('bacselect').pipe(tap((resp:any)=>{
    this.Cargando$.next(false);
     this.back.next(resp)
   }));
    return request$.subscribe();
  }

  crear(){
    this._sweet.mensajeConConfirmacion('Copia de seguridad', '¿Desea crear una copia de seguridad?', 'info').
    then((result) => {
      if (result) {
        let params = {
          nombre:'hola'
        }
    
      this.Cargando$.next(true);
      this._service.crearBackup(params).subscribe(resp=>{
        this.Cargando$.next(false);
        if(resp.ok){
          this._sweet.mensajeSimple('copia de seguridad realizado correctamente', 'Copia de seguridad', 'success');
        }else{
          this._sweet.mensajeSimple('Ocurrio un error','Backup','warning');
        }
      });
      }
    })

   
}

// restaurar(){
//   this._sweet.mensajeConConfirmacion('Restauracion del sistema', '¿Desea restaurar el sistema?', 'info').
//     then((result) => {
//       if (result) {
//         let params = {
//           nombre: this.register.value.NOMBRE
//         }
    
//       // this.Cargando$.next(true);
//       // this._service.crearBackup(params).subscribe(resp=>{
//       //   this.Cargando$.next(false);
//       //   if(resp.ok){
//       //     this._sweet.mensajeSimple('copia de seguridad realizado correctamente', 'Copia de seguridad', 'success');
//       //   }else{
//       //     this._sweet.mensajeSimple('Ocurrio un error','Backup','warning');
//       //   }
//       // });
//       }
//     })
// }

getBackup() {
    dayjs.extend(localizedFormat)
    if (!this.generando) {
      this.generando = true;

      this.backupService.getBackup()
      
      .subscribe(
    (resp) => {
      if (resp instanceof Blob) {
        let blob: Blob = resp;
        let a = document.createElement('a');
        a.download = 'backup-' + dayjs(new Date()).format('D-M-YYYY h:mm A') + '.sql';
        console.log(blob);
        a.href = window.URL.createObjectURL(blob);
        a.click();
        this.generando = false;
      } else {
        console.error('La respuesta no es un Blob válido.');
        this.generando = false;
      }
    },
    (error) => {
      console.error('Error al obtener el respaldo:', error);
      this.generando = false;
    }
  );

  /*
      this.backupService.getBackup()
        .subscribe(
          resp => {        
            let blob: Blob = resp.body as Blob;
            let a = document.createElement('a');
            a.download = 'backup-' + dayjs(new Date()).format('D-M-YYYY h:mm A') + '.sql';
            console.log(blob);
            a.href = window.URL.createObjectURL(blob);
            a.click();
            this.generando = false;
          }
        );*/
    }
  }
  

capturarFile(event: any) {

  const extencion: string = event.target.files[0].name.split(".")
  
  // Validar extención
  if( extencion[extencion.length-1] !== "sql" ) {
    this._sweet.mensajeSimple('Extención inválida','Backup','warning');
    return
  } else {

    const respaldo = event.target.files[0]
    this.nombreRespaldo = respaldo.name
    this.archivo = event.target.files[0]

  }

  
}

restaurar() {

  if(!this.restaurando) {
    this.restaurando = true;
    this.backupService.postBackup(this.archivo!)
    ?.subscribe((resp: any) => {
      this.restaurando = false
      if(resp.ok === true) {
        this._sweet.mensajeSimple(resp.msg,'Backup','success');
        
        this.archivo = undefined;
        this.nombreRespaldo = "";

      } else {
        this._sweet.mensajeSimple((resp.msg || 'Error'),'Backup','warning');
      }
    })
  }
  
}

}
