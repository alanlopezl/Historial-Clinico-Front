import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { OdontogramaService } from '../../services/odontograma.service';
import { PacientesPackageService } from 'src/app/pacientes/pacientes/pacientes-package.service';

@Component({
  selector: 'app-diente',
  templateUrl: './diente.component.html',
  styleUrls: ['./diente.component.css']
})
export class DienteComponent {

  @Input() numeroDiente: string;

  constructor(public odontologiaService: OdontogramaService, public pacienteService: PacientesPackageService) {}

  dienteCompleto: boolean = false;

  historial = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.odontologiaService.odontograma$.subscribe(odontograma => {
      odontograma.forEach((diente) => {
        if(diente.INDICE_DIENTE == this.numeroDiente) {
          switch (diente.LADO_DIENTE) {
            case `Arriba`:
              this.ladoDiente[0].observacion = diente.OBSERVACION
              this.ladoDiente[0].observacion = diente.ID_TRATAMIENTO
              this.ladoDiente[0].observacion = diente.ID_ESTADO
              this.ladoDiente[0].estado = {
                COLOR: diente.COLOR,
                COMPLETO: diente.COMPLETO,
                ID_ESTADO: diente.ID_ESTADO,
                NOMBRE: diente.NOMBRE
              }
              this.changeColor(this.numeroDiente+'1', this.ladoDiente[0])
              break;
            case `Derecha`:
              this.ladoDiente[1].observacion = diente.OBSERVACION
              this.ladoDiente[1].observacion = diente.ID_TRATAMIENTO
              this.ladoDiente[1].observacion = diente.ID_ESTADO
              this.ladoDiente[1].estado = {
                COLOR: diente.COLOR,
                COMPLETO: diente.COMPLETO,
                ID_ESTADO: diente.ID_ESTADO,
                NOMBRE: diente.NOMBRE
              }
              this.changeColor(this.numeroDiente+'2', this.ladoDiente[1])
              break;
            case `Abajo`:
              this.ladoDiente[2].observacion = diente.OBSERVACION
              this.ladoDiente[2].observacion = diente.ID_TRATAMIENTO
              this.ladoDiente[2].observacion = diente.ID_ESTADO
              this.ladoDiente[2].estado = {
                COLOR: diente.COLOR,
                COMPLETO: diente.COMPLETO,
                ID_ESTADO: diente.ID_ESTADO,
                NOMBRE: diente.NOMBRE
              }
              this.changeColor(this.numeroDiente+'3', this.ladoDiente[2])
              break;
            case `Izquierda`:
              this.ladoDiente[3].observacion = diente.OBSERVACION
              this.ladoDiente[3].observacion = diente.ID_TRATAMIENTO
              this.ladoDiente[3].observacion = diente.ID_ESTADO
              this.ladoDiente[3].estado = {
                COLOR: diente.COLOR,
                COMPLETO: diente.COMPLETO,
                ID_ESTADO: diente.ID_ESTADO,
                NOMBRE: diente.NOMBRE
              }
              this.changeColor(this.numeroDiente+'4', this.ladoDiente[3])
              break;
            case `Centro`:
              this.ladoDiente[4].observacion = diente.OBSERVACION
              this.ladoDiente[4].observacion = diente.ID_TRATAMIENTO
              this.ladoDiente[4].observacion = diente.ID_ESTADO
              this.ladoDiente[4].estado = {
                COLOR: diente.COLOR,
                COMPLETO: diente.COMPLETO,
                ID_ESTADO: diente.ID_ESTADO,
                NOMBRE: diente.NOMBRE
              }
              this.changeColor(this.numeroDiente+'5', this.ladoDiente[4])
              break;
          
            default:
              break;
          }
        }
      })
    })
    
  }

  ladoDiente: LadoDiente[] = [
    {lado: 0, estado: '', observacion: '', tratamiento: 0},
    {lado: 1, estado: '', observacion: '', tratamiento: 0},
    {lado: 2, estado: '', observacion: '', tratamiento: 0},
    {lado: 3, estado: '', observacion: '', tratamiento: 0},
    {lado: 4, estado: '', observacion: '', tratamiento: 0},
  ];

  selectLado(id: string) {
    this.odontologiaService.numeroDienteSeleccionado = this.numeroDiente;
    switch (id) {
      case `${this.numeroDiente}1`:
        this.odontologiaService.ladoSeleccionadoNombre = "Arriba";
        this.odontologiaService.numeroLadoSeleccionadoNombre = 0;
        this.odontologiaService.idDienteSeleccionado = this.numeroDiente+1;
        break;
      case `${this.numeroDiente}2`:
        this.odontologiaService.ladoSeleccionadoNombre = "Derecha";
        this.odontologiaService.numeroLadoSeleccionadoNombre = 1;
        this.odontologiaService.idDienteSeleccionado = this.numeroDiente+2;
        break;
      case `${this.numeroDiente}3`:
        this.odontologiaService.ladoSeleccionadoNombre = "Abajo";
        this.odontologiaService.numeroLadoSeleccionadoNombre = 2;
        this.odontologiaService.idDienteSeleccionado = this.numeroDiente+3;
        break;
      case `${this.numeroDiente}4`:
        this.odontologiaService.ladoSeleccionadoNombre = "Izquierda";
        this.odontologiaService.numeroLadoSeleccionadoNombre = 3;
        this.odontologiaService.idDienteSeleccionado = this.numeroDiente+4;
        break;
      case `${this.numeroDiente}5`:
        this.odontologiaService.ladoSeleccionadoNombre = "Centro";
        this.odontologiaService.numeroLadoSeleccionadoNombre = 4;
        this.odontologiaService.idDienteSeleccionado = this.numeroDiente+5;
        break;
    
      default:
        break;
    }
    this.cargarHistorial()
  }

  changeColor(id: string, color: any) {
    const lado: HTMLElement | null = document.getElementById(id);
    if(color.estado.COMPLETO) {
      this.dienteCompleto = true;
      for (let index = 1; index <= 5; index++) {
        let newId = id.slice(0, -1) + index;
        const lado: HTMLElement | null = document.getElementById(newId);
        lado.attributes.setNamedItem(
          lado.attributes.getNamedItem("fill")
        ).value = color.estado.COLOR;
      }
    } else {
      if(this.dienteCompleto) {
        for (let index = 1; index <= 5; index++) {
          let newId = id.slice(0, -1) + index;
          const lado: HTMLElement | null = document.getElementById(newId);
          lado.attributes.setNamedItem(
            lado.attributes.getNamedItem("fill")
          ).value = "white";
        }
      }
      lado.attributes.setNamedItem(
        lado.attributes.getNamedItem("fill")
      ).value = color.estado.COLOR;
    }

    this.ladoDiente.forEach(diente => {
      if(diente.lado == this.odontologiaService.numeroLadoSeleccionadoNombre) {
        diente.estado = color.estado,
        diente.observacion = color.observacion,
        diente.tratamiento = color.tratamiento
      }
    })
  }

  cargarHistorial() {
    const idPaciente = this.pacienteService.selectedIdPaciente;
    const ladoSeleccionado = this.odontologiaService.ladoSeleccionadoNombre;
    this.odontologiaService.getHistorialDiente(idPaciente, ladoSeleccionado, this.numeroDiente)
      .subscribe();
  }

}

interface LadoDiente {
  lado: number,
  estado: any,
  observacion: string
  tratamiento: number
}
