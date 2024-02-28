import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PacientesPackageService } from '../pacientes-package.service';

@Component({
  selector: 'app-pacientes-insert-update',
  templateUrl: './pacientes-insert-update.component.html',
  styleUrls: ['./pacientes-insert-update.component.css']
})
export class PacientesInsertUpdateComponent {
  fecha: Date = new Date();

  constructor(
    public _service: PacientesPackageService,
    public dialogref: MatDialogRef<PacientesInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: BitacoraPackageService
  ) {

    
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
          tipo:2,
          edad: datos.EDAD,
          email: datos.EMAIL,
          civil: datos.CIVIL,
          ocupacion: datos.OCUPACION,
          tel: datos.TEL,
          cont_emer: datos.CONTACTO_EMERGENCIA,
          emer_tel: datos.EMERGENCIA_TEL,
          obs: datos.OBS,
          dir: datos.DIRECCION
        };

        this._service.crear(params).subscribe((resp) => {
          if (!resp.ok) {
            this._sweet.mensajeSimple(resp.msg, 'MEDICO', 'warning');
          } else {
            this._sweet.mensajeSimple(
              'Creado correctamente',
              'PACIENTE',
              'success'
            );
            let params = {
              operacion: 'INSERTO',
              fecha: new Date(),
              idusuario: localStorage.getItem('user'),
              tabla: 'PACIENTE',
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
          idtipo:2
        };
       
        this._service.actualizar(params).subscribe((resp: any) => {
          console.log(resp);
          this._sweet.mensajeSimple(
            'Actualizado correctamente',
            'PACIENTE',
            'success'
          );
          let params = {
            operacion: 'ACTUALIZO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'PACIENTE',
          };
          this._bitacora.crear(params).subscribe();

          this._service.mostrar();
          this.cerrarmodal();
        });
      }
    }
  }
  }

