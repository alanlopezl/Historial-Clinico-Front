import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { EspecialidadPackageService } from '../especialidad-package.service';
import { BitacoraPackageService } from 'src/app/seguridad/bitacora/bitacora-package.service';


@Component({
  selector: 'app-especialidad-insert-update',
  templateUrl: './especialidad-insert-update.component.html',
  styleUrls: ['./especialidad-insert-update.component.css']
})
export class EspecialidadInsertUpdateComponent {
  constructor(public _service: EspecialidadPackageService,
    public dialogref: MatDialogRef<EspecialidadInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService
  ) { }

  ngOnInit(): void {
  }

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    this.dialogref.close();
  }

  get validateOpinion(){
    return this._service.register.controls;
  }
  
  
  guardar() {


    if (this._service.register.valid) {

      if (!this._service.register.get('ID_ESPECIALIDAD')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          nombre: datos.NOMBRE,
          descripcion:datos.DESCRIPCION
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'ESPECIALIDAD','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'Especialidad', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'ESPECIALIDAD',
            }
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar();
        });
        this.cerrarmodal();
      } else {
        // actualiza ususario
        let datos = this._service.register.value;

        let params = {
          id: datos.ID_ESPECIALIDAD,
          nombre: datos.NOMBRE,
          descripcion:datos.DESCRIPCION
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'ESPECIALIDAD','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'Especialidad', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'ESPECIALIDAD',
          }
          this._bitacora.crear(params).subscribe();
        }
          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
}
