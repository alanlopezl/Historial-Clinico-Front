import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { OdontogramaService } from '../../services/odontograma.service';

@Component({
  selector: 'app-diente',
  templateUrl: './diente.component.html',
  styleUrls: ['./diente.component.css']
})
export class DienteComponent {

  @Input() numeroDiente: string;

  constructor(public odontologiaService: OdontogramaService) {}

  dienteCompleto: boolean = false;

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
  }

  changeColor(id: string, color: any) {
    console.log(id)
    console.log(color)
    const lado: HTMLElement | null = document.getElementById(id);
    if(color.estado.COMPLETO) {
      this.dienteCompleto = true;
      for (let index = 1; index <= 5; index++) {
        let newId = id.slice(0, -1) + index;
        console.log(newId)
        const lado: HTMLElement | null = document.getElementById(newId);
        lado.attributes.setNamedItem(
          lado.attributes.getNamedItem("fill")
        ).value = color.estado.COLOR;
      }
    } else {
      if(this.dienteCompleto) {
        for (let index = 1; index <= 5; index++) {
          let newId = id.slice(0, -1) + index;
          console.log(newId)
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
    console.log(this.ladoDiente);
  }

}

interface LadoDiente {
  lado: number,
  estado: any,
  observacion: string
  tratamiento: number
}
