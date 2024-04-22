import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacientesPackageService } from 'src/app/pacientes/pacientes/pacientes-package.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { OdontogramaService } from '../../services/odontograma.service';

@Component({
  selector: 'app-tratamiento-diente',
  templateUrl: './tratamiento-diente.component.html',
  styleUrls: ['./tratamiento-diente.component.css']
})
export class TratamientoDienteComponent {
  constructor(public odontologiaService: OdontogramaService, private fb: FormBuilder, private _sweet: SweetAlertService, public pacienteService: PacientesPackageService){}
  formularioOdontograma: FormGroup = this.fb.group({
    tratamiento: ['', [Validators.required]],
  })
}
