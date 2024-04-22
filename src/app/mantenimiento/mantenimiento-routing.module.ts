import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { EnfermedadComponent } from './enfermedad/enfermedad.component';
import { TratamientoComponent } from '../pacientes/tratamiento/tratamiento.component';
import { EstadoDienteComponent } from './estado-diente/estado-diente.component';
import { TratamientoMantenimientoComponent } from './tratamiento-mantenimiento/tratamiento-mantenimiento.component';

const routes: Routes = [
  {
    path: 'cuestionario',
    component: CuestionarioComponent,
  },
  {
    path: 'enfermedades',
    component: EnfermedadComponent,
  },
  {
    path: 'tratamientos',
    component: TratamientoMantenimientoComponent,
  },
  {
    path: 'estados',
    component: EstadoDienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoRoutingModule {}
