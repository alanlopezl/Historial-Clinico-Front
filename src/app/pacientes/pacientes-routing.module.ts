import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CitasComponent } from './citas/citas.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { OdontogramaComponent } from './odontograma/odontograma.component';

const routes: Routes = [
  {
    path:'pacientes',component:PacientesComponent
  },
  {
    path:'citas',component:CitasComponent
  },
  {
    path:'tratamiento',component:TratamientoComponent
  },
  {
    path:'odontograma',component:OdontogramaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
