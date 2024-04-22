import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EstadoCitaComponent } from './estado-cita/estado-cita.component';
import { EstadoCitaInsertUpdateComponent } from './estado-cita/estado-cita-insert-update/estado-cita-insert-update.component';
import { EnfermedadComponent } from './enfermedad/enfermedad.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { InsertUpdateCuestionarioComponent } from './cuestionario/insert-update-cuestionario/insert-update-cuestionario.component';
import { InsertUpdateEnfermedadComponent } from './enfermedad/insert-update-enfermedad/insert-update-enfermedad.component';
import { EstadoDienteComponent } from './estado-diente/estado-diente.component';
import { TratamientoMantenimientoComponent } from './tratamiento-mantenimiento/tratamiento-mantenimiento.component';
import { FormEstadoDienteComponent } from './estado-diente/form-estado-diente/form-estado-diente.component';
import { FormTratamientoComponent } from './tratamiento-mantenimiento/form-tratamiento/form-tratamiento.component';

@NgModule({
  declarations: [
    EstadoCitaComponent,
    EstadoCitaInsertUpdateComponent,
    EnfermedadComponent,
    CuestionarioComponent,
    InsertUpdateCuestionarioComponent,
    InsertUpdateEnfermedadComponent,
    EstadoDienteComponent,
    TratamientoMantenimientoComponent,
    FormEstadoDienteComponent,
    FormTratamientoComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class MantenimientoModule { }
