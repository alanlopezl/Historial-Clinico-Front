import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos/medicos.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { EspecialidadInsertUpdateComponent } from './especialidad/especialidad-insert-update/especialidad-insert-update.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicosInsertUpdateComponent } from './medicos/medicos-insert-update/medicos-insert-update.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {EspecialidadComponent as espe} from './medicos/especialidad/especialidad.component'

@NgModule({
  declarations: [
    MedicosComponent,
    EspecialidadComponent,
    EspecialidadInsertUpdateComponent,
    MedicosInsertUpdateComponent,
    espe
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,   
     MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class MedicosModule { }
