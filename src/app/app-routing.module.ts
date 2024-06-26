import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponentComponent } from './full-component/full-component.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecuCorreoComponent } from './auth/recu-correo/recu-correo.component';
import { RecuPreguntasComponent } from './auth/recu-preguntas/recu-preguntas.component';
import { RecuComponent } from './auth/recu/recu.component';
import { CambioPassComponent } from './auth/cambio-pass/cambio-pass.component';
import { PreguntasSeguridadComponent } from './auth/preguntas-seguridad/preguntas-seguridad.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CorreoGuard } from './guard/correo.guard';
import { CitasModule } from './citas/citas.module';
import { MailConfirmationComponent } from './shared/mail-confirmation/mail-confirmation.component';
import { MailDeclineComponent } from './shared/mail-decline/mail-decline.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: LoginComponent },
    { path: 'preguntas', component: PreguntasSeguridadComponent },
   { path: 'contraseña/:token', component: CambioPassComponent, canActivate: [CorreoGuard] },
   { path: 'seleccion', component: RecuComponent },
   { path: 'recuperacion-preguntas', component: RecuPreguntasComponent },
   { path: 'recuperacion-correo', component: RecuCorreoComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path:'confirmation/:token',component:MailConfirmationComponent
  },
  {
    path:'decline/:token',component:MailDeclineComponent
  },
  {
    path: '',
    component: FullComponentComponent,canActivate:[AuthGuard],
    children: [
      {
        path:'dashboard',component:DashboardComponent
      },
      {
        path:'perfil',component:PerfilComponent
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./seguridad/seguridad.module').then(m => m.SeguridadModule)
      },
      {
        path: 'personas',
        loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule)
      },
      {
        path: 'pacientes',
        loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule)
      },
      {
        path: 'medico',
        loadChildren: () => import('./medicos/medicos.module').then(m => m.MedicosModule)
      },
      {
        path: 'mantenimiento',
        loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule)
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
