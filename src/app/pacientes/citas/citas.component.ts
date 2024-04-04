import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import * as printJS from 'print-js';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as XLSX from 'xlsx';
import { CitasInsertUpdateComponent } from './citas-insert-update/citas-insert-update.component';
import { CitasPackageService } from './citas-package.service';
import { EspecialidadPackageService } from 'src/app/medicos/especialidad/especialidad-package.service';
import { MedicosPackageService } from 'src/app/medicos/medicos/medicos-package.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent {
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['TIPO'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];
  especialidad: any;
  medico: any;
  usuario: any; //paso //2
  idmedico:number;
  permisos: any = [];

  constructor(
    public _service: CitasPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl,
    public _especialidad: EspecialidadPackageService,
    public _medico: MedicosPackageService
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    // this._service.mostrar(this.buscar);
    this._especialidad.mostrar('');
    this._service.mostrarpermiso(localStorage.getItem('rol'), 14);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {
    this.mostrardta(2);
  }

  busqueda() {
    //this._service.mostrar(this.buscar);
    this._service.mostrarfiltro(11, 1, this.buscar);
  }

  //muestra especialidad del select
  mostrar(event: any) {
    this._service.idespecialidad = event.value;
    this._medico.mostraridespe(event.value);
  }

  //muestra la tabla
  mostrardta(event: any) {
    this._service.idmedico = event.value;
    this._service.mostrarfiltro(this._service.idespecialidad,event.value);
  }

  ngOnDestroy(): void {}

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  crear() {
    console.log(this.especialidad);
    if (this.especialidad != undefined && this.medico != undefined) {
      this._service.inicializarForm();
      this._dialog.open(CitasInsertUpdateComponent, {
        width: '40%',
        disableClose: true,
        autoFocus: true,
      });
    } else {
      this._sweet.mensajeSimple(
        'Cita',
        'Por favor seleccione los campos',
        'error'
      );
    }
  }

  eliminar(id: number) {
    this._sweet
      .mensajeConConfirmacion(
        'Eliminar',
        '¿Desea eliminar el registro?',
        'warning'
      )
      .then((result) => {
        console.log(result);
        if (result) {
          this._service.eliminar(id).subscribe((resp) => {
            this._service.mostrar(this.buscar);
            if (!resp.ok) {
              console.log(resp);
              this._sweet.mensajeSimple(
                'No se puede eliminar',
                'CITA',
                'error'
              );
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'CITAS',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'CITA',
                'success'
              );
            }
          });
        }
      });
  }

  impo() {
    let date = new Date();
    let url = '../../../assets/logo.jpg';
    let rawHTML = `
  <div id="otra">
  <img src="${url}" alt="">
  <div class="parraf">
  <h5></h5>
  <h5>Listado de Pacientes</h5>
  <h6>${date.toLocaleString()}</h6>
  </div>
  </div><br>`;

    printJS({
      printable: 'reporte2',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style:
        '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Pacientes',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'PACIENTES',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
