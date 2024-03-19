import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosInsertUpdateComponent } from './usuarios/usuarios-insert-update/usuarios-insert-update.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PermisosInsertUpdateComponent } from './permisos/permisos-insert-update/permisos-insert-update.component';
import { ObjetosComponent } from './objetos/objetos.component';
import { ObjetosInsertUpdateComponent } from './objetos/objetos-insert-update/objetos-insert-update.component';
import { RolesComponent } from './roles/roles.component';
import { RolesInsertUpdateComponent } from './roles/roles-insert-update/roles-insert-update.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { PreguntasInsertUpdateComponent } from './preguntas/preguntas-insert-update/preguntas-insert-update.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParametrosInsertUpdateComponent } from './parametros/parametros-insert-update/parametros-insert-update.component';
import { PersonaComponent } from './usuarios/persona/persona.component';
import { EstadosComponent } from './estados/estados.component';
import { InsertUpdateEstadoComponent } from './estados/insert-update-estado/insert-update-estado.component';
import { BackupComponent } from './backup/backup.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [UsuariosComponent, UsuariosInsertUpdateComponent,
     PermisosComponent, BackupComponent, PermisosInsertUpdateComponent, ObjetosComponent, ObjetosInsertUpdateComponent, RolesComponent, RolesInsertUpdateComponent, BitacoraComponent, PreguntasComponent, PreguntasInsertUpdateComponent, ParametrosComponent, ParametrosInsertUpdateComponent, PersonaComponent, EstadosComponent, InsertUpdateEstadoComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})

export class SeguridadModule { }
