import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
})
export class TratamientoComponent {
  cuestio: any[] = [];
  cuestionario: any[] = [];
  enfermedad: any[] = [];
  enfermedades: any[] = [];
  fecha: Date = new Date();
  data: any = [];

  constructor(
    private http: HttpClient,
    private query: ActivatedRoute,
    private _swwet: SweetAlertService,
    private _route:Router
  ) {
    this.query.queryParams.subscribe((r) => {
      this.data = r;
    });
  }

  ngOnInit(): void {
    this.mostrarCuest();
    this.mostrarEnfer();
  }

  toco(value: number, id: number) {
    this.cuestionario.push({ id, value, paciente: this.data.ID_PACIENTE });
    this.cuestionario = this.cuestionario.filter((r) => r.id != id);
    this.cuestionario.push({ id, value, paciente: this.data.ID_PACIENTE });
  }

  tocoe(value: number, id: number) {
    this.enfermedades.push({ id, value, paciente: this.data.ID_PACIENTE });
    this.enfermedades = this.enfermedades.filter((r) => r.id != id);
    this.enfermedades.push({ id, value, paciente: this.data.ID_PACIENTE });
  }

  guardarCuest() {
    Notiflix.Confirm.show('Guardar', 'Desea guardar', 'Si', 'No', () => {
      let params = {
        cuest: this.cuestionario,
        enfer: this.enfermedades,
      };
      this.http
        .post(environment.url + 'cuestionario', params)
        .subscribe((resp:any) => {

          if(resp.ok){
           Notiflix.Notify.success('Guardado correctamente');
           this._route.navigateByUrl('pacientes/odontograma')
          }else{
            Notiflix.Notify.warning('Ocurrio un error, comuniquese con el administrador');
          }
          console.log(resp);
        });
    });
  }

  mostrarCuest() {
    this.http.get(environment.url + 'cuestionario').subscribe((resp: any) => {
      this.cuestio = resp.data;
    });
  }

  mostrarEnfer() {
    this.http.get(environment.url + 'enfermedad').subscribe((resp: any) => {
      this.enfermedad = resp.data;
    });
  }
}
