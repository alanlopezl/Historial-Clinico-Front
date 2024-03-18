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

  constructor(public odontologiaService: OdontogramaService, private fb: FormBuilder, private _sweet: SweetAlertService, public pacienteService: PacientesPackageService){}

  tratamientoSubscripcion!: Subscription;
  tratamientos = [];
  estadosDientes = [];

  formularioOdontograma: FormGroup = this.fb.group({
    tratamiento: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    observacion: ['', [Validators.maxLength(100)]]
  })
  
  ngOnInit(): void {
    
  }

  guardarObservacionDiente() {

    this.onSubmit.emit(this.formularioOdontograma.value);
    this.formularioOdontograma.reset();
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
  }

  evitarCerrar(click: Event) {
    console.log(click)
    click.stopPropagation();
    click.preventDefault();
  }

  guardarEnOdontrograma() {
    const {estado, tratamiento, observacion} = this.formularioOdontograma.value;
    const idPaciente = this.pacienteService.selectedIdPaciente;

    this.odontologiaService.postDienteOdontograma(idPaciente, estado.ID_ESTADO, observacion, tratamiento)
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
}
