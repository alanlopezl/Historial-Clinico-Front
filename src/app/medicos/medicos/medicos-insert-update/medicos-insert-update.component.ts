import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { MedicosPackageService } from '../medicos-package.service';
import { EspecialidadPackageService } from '../../especialidad/especialidad-package.service';

@Component({
  selector: 'app-medicos-insert-update',
  templateUrl: './medicos-insert-update.component.html',
  styleUrls: ['./medicos-insert-update.component.css']
})
export class MedicosInsertUpdateComponent {


  fecha: Date = new Date();
  especialidad:any = [];

  constructor(
    public _service: MedicosPackageService,
    public dialogref: MatDialogRef<MedicosInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService,
    public _especialidad:EspecialidadPackageService
  ) {
    this._especialidad.mostrar('')
  }

  ngOnInit(): void {}

  //limpia modal
  clear() {
    this._service.register.reset();
    this._service.inicializarForm();
  }

  //cerrarmodal
  cerrarmodal() {
    this.dialogref.close();
  }

  get validateOpinion() {
    return this._service.register.controls;
  }

  guardar() {
    if (this._service.register.valid) {
      if (!this._service.register.get('COD_PERSONA')?.value) {
        let datos = this._service.register.value;
        let params = {
          primern: datos.PRIMER_NOMBRE,
          segudon: datos.SEGUNDO_NOMBRE || '',
          primera: datos.PRIMER_APELLIDO,
          segundoa: datos.SEGUNDO_APELLIDO || '',
          dni: datos.DNI || '',
          nacimiento: datos.FEC_NACIMIENTO,
          estado: datos.EST_CIVIL,
          sexo: datos.SEXO,
          tipo:1
        };

        this._service.crear(params).subscribe((resp) => {
          if (!resp.ok) {
            this._sweet.mensajeSimple(resp.msg, 'MEDICO', 'warning');
          } else {
            this._sweet.mensajeSimple(
              'Creado correctamente',
              'MEDICO',
              'success'
            );
            let params = {
              operacion: 'INSERTO',
              fecha: new Date(),
              idusuario: localStorage.getItem('user'),
              tabla: 'MEDICO',
            };
            this._bitacora.crear(params).subscribe();
          }
          this._service.mostrar();
        });
        this.cerrarmodal();
      } else {
        // actualiza ususario
        let datos = this._service.register.value;

        let params = {
          id: datos.COD_PERSONA,
          primern: datos.PRIMER_NOMBRE,
          segudon: datos.SEGUNDO_NOMBRE || '',
          primera: datos.PRIMER_APELLIDO,
          segundoa: datos.SEGUNDO_APELLIDO || '',
          dni: datos.DNI,
          nacimiento: datos.FEC_NACIMIENTO,
          estado: datos.EST_CIVIL,
          sexo: datos.SEXO,
          idtipo:1
        };
       
        this._service.actualizar(params).subscribe((resp: any) => {
          console.log(resp);
          this._sweet.mensajeSimple(
            'Actualizado correctamente',
            'MEDICO',
            'success'
          );
          let params = {
            operacion: 'ACTUALIZO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'Medico',
          };
          this._bitacora.crear(params).subscribe();

          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }

}
