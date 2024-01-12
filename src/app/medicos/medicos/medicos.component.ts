import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import * as printJS from 'print-js';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as XLSX from 'xlsx';
import { MedicosPackageService } from './medicos-package.service';
import { Router } from 'express';
import { MedicosInsertUpdateComponent } from './medicos-insert-update/medicos-insert-update.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent {

  
  pageSize: number = 25;
  pageSizeOptions: number[] = [25,50,100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['PRIMER_NOMBRE','DNI','SEXO'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any;//paso //2
  i: number = 0;
  permisos:any = [];

  busqueda(){
    this._service.mostrar(this.buscar);
  }

  constructor(
    public _service: MedicosPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
    ) {
      paginator.itemsPerPageLabel = 'Cantidad por página'; 
    this._service.mostrar();
    this._service.mostrarpermiso(localStorage.getItem('rol'),9);
    this._service.responsepermiso$.subscribe(r=>{
     this.permisos = r[0];
    })
}

  cambioPagina(e: PageEvent) {
    this.d = e.pageIndex * e.pageSize;
    this.h = this.d + e.pageSize;
  }

  crear() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this._dialog.open(MedicosInsertUpdateComponent);
    this._service.inicializarForm()

  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    this._dialog.open(MedicosInsertUpdateComponent);
    this._service.popForm(item);

  }

  eliminar(id: number) {

    this._sweet.mensajeConConfirmacion('Eliminar', '¿Desea eliminar el registro?', 'warning').
      then((result) => {
        if (result) {
          this._service.eliminar(id).subscribe(resp => {
            this._service.mostrar(this.buscar);
            if (!resp.ok) {
              this._sweet.mensajeSimple('Ocurrio un error', 'MEDICO', 'error');
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'MEDICO',
              }
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple('Eliminado correctamente', 'MEDICO', 'success');
            }
          })
        }
      })

  }

  impo() {
    let date = new Date();
    let url = '../../../assets/assets/img/ft.jpg';

    let rawHTML = `
   <div id="otra">
   <img src="${url}" alt="">
   <div class="parraf">
   <h5>Dental Center</h5>
   <h5>Listado de Medicos</h5>
   <h6>${date.toLocaleString()}</h6>
   </div>
   </div><br>`;

    printJS({
      printable: 'reporte',
      type: 'html',
      header: rawHTML,
      css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      style:
        '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
      scanStyles: false,
      documentTitle: 'Medico',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'MEDICO',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }

}
