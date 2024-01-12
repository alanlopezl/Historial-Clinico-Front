import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { CitasPackageService } from '../citas-package.service';
import { PacientesPackageService } from '../../pacientes/pacientes-package.service';
import { MedicosPackageService } from 'src/app/medicos/medicos/medicos-package.service';
import { EstadoCitaPackageService } from 'src/app/mantenimiento/estado-cita/estado-cita-package.service';


@Component({
  selector: 'app-citas-insert-update',
  templateUrl: './citas-insert-update.component.html',
  styleUrls: ['./citas-insert-update.component.css']
})
export class CitasInsertUpdateComponent {
  constructor(public _service: CitasPackageService,
    public dialogref: MatDialogRef<CitasInsertUpdateComponent>,
    private _sweet: SweetAlertService,
    private _bitacora: GlobalService,
    public _paciente:PacientesPackageService,
    public _medico:MedicosPackageService,
    public _estado:EstadoCitaPackageService
  ) { }

  ngOnInit(): void {
    this._paciente.mostrar();
    this._medico.mostrar();
    this._estado.mostrar();

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

      if (!this._service.register.get('ID_CITA')?.value) {
        // crea usuario
        let datos = this._service.register.value;
       
        let params = {
          medico: this._service.idmedico,
          paciente: datos.ID_PACIENTE,
          estado: datos.ID_ESTADO_CITA,
          motivo: datos.MOTIVO,
          observacion: datos.OBSERVACION ,
          fecha: datos.FECHA_CITA,
          especialidad:this._service.idespecialidad
        };


        this._service.crear(params).subscribe(resp => {
          console.log(resp);
          if(!resp.ok){
            this._sweet.mensajeSimple(`${resp.data}`,'CITA','warning');
          }else{
            this._sweet.mensajeSimple('Creado correctamente', 'CITA', 'success');
            let params = {
              operacion:'INSERTO',
              fecha: new Date(),
              idusuario:localStorage.getItem('user'),
              tabla:'CITA',
            }
            this._bitacora.crear(params).subscribe();
            this._service.mostrarfiltro(this._service.idmedico,this._service.idespecialidad)

          }
        });
        this.cerrarmodal();
      } else {
   
        let datos = this._service.register.value;

        let params = {
          medico: this._service.idmedico,
          paciente: datos.ID_PACIENTE,
          estado: datos.ID_ESTADO_CITA,
          motivo: datos.MOTIVO,
          observacion: datos.OBSERVACION ,
          fecha: datos.FECHA_CITA,
          especialidad:this._service.idespecialidad,
          id:datos.ID_CITA
        };
        
        this._service.actualizar(params).subscribe((resp: any) => {
          if(!resp.ok){
            this._sweet.mensajeSimple('Ocurrio un error','CITA','warning');
          }else{
          this._sweet.mensajeSimple('Actualizado correctamente', 'CITA', 'success');
          let params = {
            operacion:'ACTUALIZO',
            fecha: new Date(),
            idusuario:localStorage.getItem('user'),
            tabla:'CITA',
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
