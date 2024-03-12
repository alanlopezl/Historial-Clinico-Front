import { Component, EventEmitter, Output } from '@angular/core';
import { OdontogramaService } from '../../services/odontograma.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(public odontologiaService: OdontogramaService, private fb: FormBuilder){}

  tratamientoSubscripcion!: Subscription;
  tratamientos = [];
  estadosDientes = [];

  formularioOdontograma: FormGroup = this.fb.group({
    tratamiento: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    observacion: ['', [Validators.maxLength(100)]]
  })
  
  ngOnInit(): void {
    this.cargarTratamientos();
    this.cargarEstadosDiente();
  }

  cargarTratamientos() {

    this.tratamientoSubscripcion = this.odontologiaService.getTratamientos()
      .subscribe(
        resp => {
          this.tratamientos = resp.tratamientos!
        }
      )
  }

  cargarEstadosDiente() {

    this.odontologiaService.getEstadosDientes()
      .subscribe(
        resp => {
          this.estadosDientes = resp.estado!
        }
      )
  }

  guardarObservacionDiente() {
    this.onSubmit.emit(this.formularioOdontograma.value);
  }

}
