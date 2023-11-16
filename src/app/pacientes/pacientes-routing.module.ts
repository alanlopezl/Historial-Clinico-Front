import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
  {
    path:'pacientes',component:PacientesComponent
  },
  {
    path:'citas',component:CitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
