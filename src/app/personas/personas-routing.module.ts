import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { TipoPersonaComponent } from './tipo-persona/tipo-persona.component';


const routes: Routes = [
  {
    path:'personas',component:PersonasComponent
  },
  {
    path:'tipo-persona',component:TipoPersonaComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
