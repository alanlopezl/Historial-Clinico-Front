import { Component, Input } from '@angular/core';
import { OdontogramaService } from '../../services/odontograma.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PacientesPackageService } from 'src/app/pacientes/pacientes/pacientes-package.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-modal-presupuesto',
  templateUrl: './modal-presupuesto.component.html',
  styleUrls: ['./modal-presupuesto.component.css']
})
export class ModalPresupuestoComponent {
  constructor(public odontologiaService: OdontogramaService, private _sweet: SweetAlertService, public pacienteService: PacientesPackageService) {}

  @Input() presupuesto = [];
  @Input() total = 0.0;

  actualizarTotal(indice: number, precio) {
    this.total = 0.0;
    console.log(precio.target.value)
    if(precio.target.value == "") {
      this.presupuesto[indice].precio_tratamiento = 0;
    } else {
      this.presupuesto[indice].precio_tratamiento = precio.target.value;
    }
    this.presupuesto.forEach(tratamiento => {
      console.log(tratamiento)
      this.total += parseFloat(tratamiento.precio_tratamiento)
      console.log(this.total)
    })
  }

  enviarPresupuesto() {
    this.impo()
  }

  impo() {
    let date = new Date();
    let url = '../../../assets/assets/img/ft.jpg';
    let rawHTML = `
    <div id="otra">
    <img src="${url}" alt="">
    <div class="parraf">
    <h5>Data Center</h5>
    <h5>Presupuesto</h5>
    <h6>${date.toLocaleString()}</h6>
    </div>
    </div><br>`;
  
      printJS({
        printable: 'reporte',
        type: 'html',
        header: rawHTML,
        css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        style: '@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }',
        scanStyles: false,
        documentTitle: 'Presupuesto',
        font_size: '10pt',
        ignoreElements: ['d']
      })
    }

}
