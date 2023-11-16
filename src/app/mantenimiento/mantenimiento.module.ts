import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EstadoCitaComponent } from './estado-cita/estado-cita.component';
import { EstadoCitaInsertUpdateComponent } from './estado-cita/estado-cita-insert-update/estado-cita-insert-update.component';


@NgModule({
  declarations: [
    EstadoCitaComponent,
    EstadoCitaInsertUpdateComponent
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
