import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import * as printJS from 'print-js';
import { GlobalService } from 'src/app/services/global.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as XLSX from 'xlsx';
import { EspecialidadPackageService } from '../../especialidad/especialidad-package.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css'],
})
export class EspecialidadComponent {
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  pageEvent!: PageEvent;
  d: number = 0; //desde donde
  h: number = 25; //hasta donde

  //filtro

  buscar: any = '';
  campo: any[] = ['NOMBRE'];
  reporte: boolean = false;
  data: any = [];
  item: any = [];
  usuario: any; //paso //2
  permisos: any = [];
  especialidad: any;
  id: any;

  constructor(
    public _service: EspecialidadPackageService,
    private _dialog: MatDialog,
    private _bitacora: GlobalService,
    private _sweet: SweetAlertService,
    private paginator: MatPaginatorIntl,
    private _router: ActivatedRoute
  ) {
    this._service.mostrar();
    paginator.itemsPerPageLabel = 'Cantidad por página';
    this._service.mostrarpermiso(localStorage.getItem('rol'), 3);
    this._service.responsepermiso$.subscribe((r) => {
      this.permisos = r[0];
    });
  }

  ngOnInit(): void {
    this._router.queryParams.subscribe((id) => {
      this.id = id['id'];
      this._service.mostrarid(id['id']);
    });
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
    if (this.especialidad != '') {
      let params = {
        persona: this.id,
        especialidad: this.especialidad,
      };

      this._service.crearMedico(params).subscribe((resp) => {
        if (!resp.ok) {
          this._sweet.mensajeSimple(resp.msg, 'ESPECIALIDAD', 'warning');
        } else {
          this._sweet.mensajeSimple(
            'Agregada correctamente',
            'Especialidad',
            'success'
          );
          let params = {
            operacion: 'INSERTO',
            fecha: new Date(),
            idusuario: localStorage.getItem('user'),
            tabla: 'ESPECIALIDAD',
          };
          this._bitacora.crear(params).subscribe();
        }
        this._service.mostrarid(this.id);
      });
    }
  }

  editar(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    // this._dialog.open(EspecialidadInsertUpdateComponent);
    // this._service.popForm(item);
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
          this._service.eliminarFromMedic(id).subscribe((resp) => {
            this._service.mostrar(this.buscar);
            if (!resp.ok) {
              console.log(resp);
              this._sweet.mensajeSimple(
                'No se puede eliminar',
                'ESPECIALIDAD',
                'error'
              );
            } else {
              let params = {
                operacion: 'ELIMINO',
                fecha: new Date(),
                idusuario: localStorage.getItem('user'),
                tabla: 'ESPECIALIDAD',
              };
              this._bitacora.crear(params).subscribe();
              this._sweet.mensajeSimple(
                'Eliminado correctamente',
                'ESPECIALIDAD',
                'success'
              );
              this._service.mostrarid(this.id);
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
  <h5>Agrocomercial "Libertad"</h5>
  <h5>Listado de ESPECIALIDAD</h5>
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
      documentTitle: 'ESPECIALIDAD',
      font_size: '10pt',
      ignoreElements: ['d'],
    });
    let params = {
      operacion: 'DESCARGO PDF',
      fecha: new Date(),
      idusuario: localStorage.getItem('user'),
      tabla: 'ESPECIALIDAD',
    };
    this._bitacora.crear(params).subscribe((resp) => resp);
  }
}
