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
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { OdontogramaComponent } from './odontograma/odontograma.component';
import { ExploracionInfoComponent } from './pacientes/exploracion-info/exploracion-info.component'; 
@NgModule({
  declarations: [
    PacientesComponent,
    CitasComponent,
    CitasInsertUpdateComponent,
    PacientesInsertUpdateComponent,
    TratamientoComponent,
    TratamientoPackageComponent,
    OdontogramaComponent,
    ExploracionInfoComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class PacientesModule { }
