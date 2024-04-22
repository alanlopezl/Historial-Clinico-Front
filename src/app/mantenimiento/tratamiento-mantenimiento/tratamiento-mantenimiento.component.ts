import { Component } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TratamientoService } from './tratamiento.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as printJS from 'print-js';
import { FormTratamientoComponent } from './form-tratamiento/form-tratamiento.component';

@Component({
  selector: 'app-tratamiento-mantenimiento',
  templateUrl: './tratamiento-mantenimiento.component.html',
  styleUrls: ['./tratamiento-mantenimiento.component.css']
})
export class TratamientoMantenimientoComponent {
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['NOMBRE_ROL'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];

  usuario: any; //paso //2

  permisos: any = [];

  constructor(
    public _service: TratamientoService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrar(this.buscar);
    this._service.mostrarpermiso(localStorage.getItem('rol'), 3);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {
    let params = {
      idusuario: localStorage.getItem('user'),
      idobjeto: 3,
      descripcion: '',
      accion: 'Ingreso',
    };
    this._bitacora.crear(params).subscribe();
  }

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
    this._dialog.open(FormTratamientoComponent);
    this._service.inicializarForm();
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    this._dialog.open(FormTratamientoComponent);
    this._service.popForm(item);
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
                'No se puede eliminar, en uso',
                'Enfermedad',
                'error'
              );
            } else {
              let params = {
                idusuario: localStorage.getItem('user'),
                idobjeto: 3,
                descripcion: '',
                accion: 'Elimino',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'Enfermedad',
                'success'
              );
            }
          });
        }
      });
  }

  impo() {
    let date = new Date();
    let url = '../../../assets/assets/img/ft.jpg';

    let rawHTML = `
   <div id="otra">
   <img src="${url}" alt="">
   <div class="parraf">
   <h5>Dental Center</h5>
   <h5>Listado de Enfermedad</h5>
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
      documentTitle: 'Enfermedad',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'ENFERMDAD',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
