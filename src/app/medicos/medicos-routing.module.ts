import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './medicos/medicos.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import {EspecialidadComponent as espe} from './medicos/especialidad/especialidad.component'
const routes: Routes = [
  {
    path:'medico',component:MedicosComponent
  },
  {
    path:'especialidad',component:EspecialidadComponent
  },
  {
    path:'especialida',component:espe
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule {
  
 }
