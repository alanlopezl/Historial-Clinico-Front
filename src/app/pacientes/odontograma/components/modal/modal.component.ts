import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { OdontogramaService } from '../../services/odontograma.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PacientesPackageService } from 'src/app/pacientes/pacientes/pacientes-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @ViewChild('close') closeModal!: ElementRef;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  viewHistory: boolean = false;
  viewTratamiento: boolean = false;

  constructor(public odontologiaService: OdontogramaService, private fb: FormBuilder, private _sweet: SweetAlertService, public pacienteService: PacientesPackageService){}

  tratamientoSubscripcion!: Subscription;
  tratamientos = [];
  estadosDientes = [];

  formularioOdontograma: FormGroup = this.fb.group({
    estado: ['', [Validators.required]],
    observacion: ['', [Validators.maxLength(100)]]
  })

  formularioTratamiento: FormGroup = this.fb.group({
    tratamiento: ['', [Validators.required]],
  })
  
  ngOnInit(): void {
    
  }

  guardarObservacionDiente() {

    this.onSubmit.emit(this.formularioOdontograma.value);
    this.formularioOdontograma.reset();
    this.closeModal.nativeElement.click()
    
  }

  guardarTratamientos() {
    this.formularioTratamiento.reset();
    this.closeModal.nativeElement.click()
  }

  openHistory() {
    console.log(
      this.odontologiaService.idDienteSeleccionado, " ",
      this.odontologiaService.ladoSeleccionadoNombre,  " ",
      this.odontologiaService.numeroDienteSeleccionado,  " ",
      this.odontologiaService.numeroLadoSeleccionadoNombre,  " ",
    )
    this.viewHistory = !this.viewHistory;
    this.viewTratamiento = false;
  }

  openTratamiento() {
    console.log(
      this.odontologiaService.idDienteSeleccionado, " ",
      this.odontologiaService.ladoSeleccionadoNombre,  " ",
      this.odontologiaService.numeroDienteSeleccionado,  " ",
      this.odontologiaService.numeroLadoSeleccionadoNombre,  " ",
    )
    this.viewTratamiento = !this.viewTratamiento;
    this.viewHistory = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destruido')
  }

  evitarCerrar(click: Event) {
    console.log(click)
    click.stopPropagation();
    click.preventDefault();
  }

  guardarEnOdontrograma() {
    const {estado, observacion} = this.formularioOdontograma.value;
    const idPaciente = this.pacienteService.selectedIdPaciente;

    this.odontologiaService.postDienteOdontograma(idPaciente, estado.ID_ESTADO, observacion)
      .subscribe(resp => {
        if(resp.ok) {
          this._sweet.mensajeSimple(
            resp.msg,
            'Odontograma',
            'success'
          );
          this.guardarObservacionDiente();
        } else {
          this._sweet.mensajeSimple(
            resp.msg,
            'Odontograma',
            'error'
          );
        }
      })
  }

  tratamientoEnOdontrograma() {
    const {tratamiento} = this.formularioTratamiento.value;
    const idPaciente = this.pacienteService.selectedIdPaciente;

    this.odontologiaService.putTratamientoDienteOdontograma(idPaciente, tratamiento)
      .subscribe(resp => {
        if(resp.ok) {
          this._sweet.mensajeSimple(
            resp.msg,
            'Odontograma',
            'success'
          );
          this.guardarTratamientos();
          this.viewTratamiento = false;
        } else {
          this._sweet.mensajeSimple(
            resp.msg,
            'Odontograma',
            'error'
          );
        }
      })
  }

  estadoEnOdontrograma() {

    const idPaciente = this.pacienteService.selectedIdPaciente;
    this._sweet
    .mensajeConConfirmacion(
      'Finalizar',
      '¿Desea finalizar el proceso de la pieza?',
      'warning'
    )
    .then((result) => {
      if (result) {
        this.odontologiaService.putEstadoProcesoDienteOdontograma(idPaciente)
      .subscribe(resp => {
        if(resp.ok) {
          this._sweet.mensajeSimple(
            resp.msg,
            'Odontograma',
            'success'
          );
          this.closeModal.nativeElement.click()
          this.viewTratamiento = false;
        } else {
          this._sweet.mensajeSimple(
            resp.msg,
            'Odontograma',
            'error'
          );
        }
      })
      }
    });
    
  }
}
