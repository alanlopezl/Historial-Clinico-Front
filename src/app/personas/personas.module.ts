import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas/personas.component';
import { PersonasInsertUpdateComponent } from './personas/personas-insert-update/personas-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoPersonaComponent } from './tipo-persona/tipo-persona.component';
import { TipoPersonaInsertUpdateComponent } from './tipo-persona/tipo-persona-insert-update/tipo-persona-insert-update.component';




@NgModule({
  declarations: [PersonasComponent, PersonasInsertUpdateComponent, TipoPersonaComponent, TipoPersonaInsertUpdateComponent],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonasModule { }
