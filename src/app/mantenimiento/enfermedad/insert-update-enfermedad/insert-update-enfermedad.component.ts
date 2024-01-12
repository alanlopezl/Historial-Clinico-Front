import { Component } from '@angular/core';
import { PackageEnfermedadService } from '../package-enfermedad.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { BitacoraPackageService } from 'src/app/seguridad/bitacora/bitacora-package.service';

@Component({
  selector: 'app-insert-update-enfermedad',
  templateUrl: './insert-update-enfermedad.component.html',
  styleUrls: ['./insert-update-enfermedad.component.css']
})
export class InsertUpdateEnfermedadComponent {

  constructor(public _service: PackageEnfermedadService,
    public dialogref: MatDialogRef<InsertUpdateEnfermedadComponent>,
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

      if (!this._service.register.get('ID_ENFERMEDAD')?.value) {
        // crea usuario
        let datos = this._service.register.value;

        let params = {
          nombre: datos.NOMBRE,
        };

        this._service.crear(params).subscribe(resp => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'ENFERMEDAD','warning');
          }else{
            this._sweet.mensajeSimple('Rol creado correctamente', 'Enfermedad', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'ROLES',
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
          id: datos.ID_ENFERMEDAD,
          nombre: datos.NOMBRE,
        };
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple(resp.msg,'ENFERMEDAD','warning');
          }else{
          this._sweet.mensajeSimple('Rol actualizado correctamente', 'Enfermedad', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'ROLES',
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
