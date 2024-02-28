import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment.prod';
import { PacientesPackageService } from '../pacientes/pacientes-package.service';

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
    private _route:Router,
    public pacienteService: PacientesPackageService
  ) {
    this.query.queryParams.subscribe((r) => {
      this.data = r;
    });
  }

  ngOnInit(): void {
    if(this.pacienteService.selectedIdPaciente === 0) {
      this._route.navigateByUrl('/pacientes/pacientes');
    } else {
      this.mostrarCuest();
      this.mostrarEnfer();
      this.getAnswers();
    }
  }

  ngOnDestroy(): void {
    this.pacienteService.selectedIdPaciente = 0;
    this.pacienteService.selectedNamePaciente = "";
  }

  toco(value: number, id: number) {
    this.cuestionario.push({ id, value, paciente: this.pacienteService.selectedIdPaciente });
    this.cuestionario = this.cuestionario.filter((r) => r.id != id);
    this.cuestionario.push({ id, value, paciente: this.pacienteService.selectedIdPaciente });
  }

  tocoe(value: number, id: number) {
    // Busca si el elemento ya existe en el arreglo
    let index = this.enfermedades.findIndex((r) => r.id === id);
    console.log(index)
    console.log(value)
    // Si el elemento existe y el checkbox se desmarca, lo elimina
    if (index !== -1) {
      this.enfermedades.splice(index, 1);
    }
    // Si el elemento no existe y el checkbox se marca, lo agrega
    else if (index === -1) {
      this.enfermedades.push({ id, value, paciente: this.pacienteService.selectedIdPaciente });
    }
  }

  guardarCuest() {
    if(this.cuestionario.length >= this.cuestio.length) {
      Notiflix.Confirm.show('Guardar', 'Desea guardar', 'Si', 'No', () => {
        let params = {
          idPaciente: this.pacienteService.selectedIdPaciente,
          cuest: this.cuestionario,
          enfer: this.enfermedades,
        };
        
        this.http
          .post(environment.url + 'cuestionario', params)
          .subscribe((resp:any) => {
  
            if(resp.ok){
             Notiflix.Notify.success('Guardado correctamente');
             this._route.navigateByUrl('pacientes/pacientes')
            }else{
              Notiflix.Notify.warning('Ocurrio un error, comuniquese con el administrador');
            }
            console.log(resp);
          });
      });
    } else {
      this._swwet.mensajeSimple('Debe responder todo el cuestionario', 'PACIENTE', 'info');
    }
  }

  getAnswers() {
    let idUsuario = this.pacienteService.selectedIdPaciente;
    this.http
        .get(environment.url + 'getAnswers/' + idUsuario)
        .subscribe((resp:any) => {
          console.log(resp);
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
