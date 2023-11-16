import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import * as printJS from 'print-js';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as XLSX from 'xlsx';
import { PacientesPackageService } from './pacientes-package.service';
import { PacientesInsertUpdateComponent } from './pacientes-insert-update/pacientes-insert-update.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})

export class PacientesComponent {

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

  usuario: any; //paso //2

  permisos: any = [];

  constructor(
    public _service: PacientesPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar(this.buscar);
    this._service.mostrarpermiso(localStorage.getItem('rol'), 14);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {}

  busqueda() {
    this._service.mostrar(this.buscar);
  }

  ngOnDestroy(): void {}

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this._dialog.open(PacientesInsertUpdateComponent);
    this._service.inicializarForm();
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
                'Pacientes',
                'error'
              );
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'PACIENTES',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'PACIENTES',
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
