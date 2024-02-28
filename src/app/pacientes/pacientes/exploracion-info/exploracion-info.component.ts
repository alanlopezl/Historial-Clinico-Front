import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { PacientesPackageService } from '../pacientes-package.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-exploracion-info',
  templateUrl: './exploracion-info.component.html',
  styleUrls: ['./exploracion-info.component.css']
})
export class ExploracionInfoComponent {
  cuestio: any[] = [];
  cuestionarios: any[] = [];
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
      this.getAnswers();
    }
  }

  ngOnDestroy(): void {
    this.pacienteService.selectedIdPaciente = 0;
    this.pacienteService.selectedNamePaciente = "";
  }

  getAnswers() {
    let idUsuario = this.pacienteService.selectedIdPaciente;
    this.http
        .get(environment.url + 'getAnswers/' + idUsuario)
        .subscribe((resp:any) => {
          this.fecha = resp.respuestas.rows[0].FECHA
          this.enfermedades = resp.enfermedades
          this.cuestionarios = resp.respuestas.rows
          console.log(resp)
    });
  }

}
