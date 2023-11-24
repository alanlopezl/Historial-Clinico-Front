import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { IntercepInterceptor } from './intercep.interceptor';
import { FullComponentComponent } from './full-component/full-component.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecuComponent } from './auth/recu/recu.component';
import { PreguntasSeguridadComponent } from './auth/preguntas-seguridad/preguntas-seguridad.component';
import { RecuPreguntasComponent } from './auth/recu-preguntas/recu-preguntas.component';
import { RecuCorreoComponent } from './auth/recu-correo/recu-correo.component';
import { CambioPassComponent } from './auth/cambio-pass/cambio-pass.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponentComponent,
    LoginComponent,
    RegisterComponent,
    RecuComponent,
    PreguntasSeguridadComponent,
    RecuPreguntasComponent,
    RecuCorreoComponent,
    CambioPassComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: IntercepInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
