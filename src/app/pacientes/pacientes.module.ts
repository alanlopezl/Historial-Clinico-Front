import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CitasComponent } from './citas/citas.component';
import { CitasInsertUpdateComponent } from './citas/citas-insert-update/citas-insert-update.component';
import { PacientesInsertUpdateComponent } from './pacientes/pacientes-insert-update/pacientes-insert-update.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { TratamientoPackageComponent } from './tratamiento/tratamiento-package/tratamiento-package.component';


@NgModule({
  declarations: [
    PacientesComponent,
    CitasComponent,
    CitasInsertUpdateComponent,
    PacientesInsertUpdateComponent,
    TratamientoComponent,
    TratamientoPackageComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PacientesModule { }
