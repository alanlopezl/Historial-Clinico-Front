import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { EnfermedadComponent } from './enfermedad/enfermedad.component';

const routes: Routes = [
  {
    path: 'cuestionario',
    component: CuestionarioComponent,
  },
  {
    path: 'enfermedades',
    component: EnfermedadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoRoutingModule {}
