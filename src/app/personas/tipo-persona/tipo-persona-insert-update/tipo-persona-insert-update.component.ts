import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraPackageService } from 'src/app/seguridad/bitacora/bitacora-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { TipoPersonaPackageService } from '../tipo-persona-package.service';

@Component({
  selector: 'app-tipo-persona-insert-update',
  templateUrl: './tipo-persona-insert-update.component.html',
  styleUrls: ['./tipo-persona-insert-update.component.css']
})
export class TipoPersonaInsertUpdateComponent {

  constructor(public _service: TipoPersonaPackageService,
    public dialogref: MatDialogRef<TipoPersonaInsertUpdateComponent>,
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

      if (!this._service.register.get('ID_TIPO_PERSONA')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          tipo: datos.TIPO,
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'TIPO PERSONA','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'Tipo persona', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'TIPO PERSONA',
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
          id: datos.ID_TIPO_PERSONA,
          tipo: datos.TIPO,
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'TIPO PERSONA','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'Tipo persona', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'TIPO PERSONA',
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
