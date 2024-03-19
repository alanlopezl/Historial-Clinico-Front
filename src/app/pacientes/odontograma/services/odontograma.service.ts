import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {

  ladoSeleccionadoNombre: string;
  numeroLadoSeleccionadoNombre: number;
  numeroDienteSeleccionado: string
  idDienteSeleccionado: string

  odontograma = [];
  odontogramaSubject = new Subject<any[]>();
  odontograma$ = this.odontogramaSubject.asObservable();

  tratamientos = [];
  tratamientosSubject = new Subject<any[]>();
  tratamientos$ = this.tratamientosSubject.asObservable();

  estadosDientes = [];
  historial = [];

  constructor(private http: HttpClient) { }

  private url = `${environment.url}`;

  getTratamientos (){

    // Url de la API de Bitacora
    const url: string = `${this.url}tratamientos`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any)=> {
          this.tratamientos = resp.tratamientos
          this.tratamientosSubject.next(this.tratamientos);
        }),
        catchError( err => of(err.error.msg))
      )
  }

  getEstadosDientes (){

    // Url de la API de Bitacora
    const url: string = `${this.url}estado_diente`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => {
          this.estadosDientes = resp.estado
        }),
        catchError( err => of(err.error.msg))
      )
  }

  getOdontograma (idPaciente: number){

    const url: string = `${this.url}diente/odontograma/${idPaciente}`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => {
          this.odontograma = resp.dientes;
          this.cargarOdontograma();
        }),
        catchError( err => of(err.error.msg))
      )
  }

  cargarOdontograma() {
    // Lógica para cargar odontograma
    // Cuando odontograma esté listo:
    this.odontogramaSubject.next(this.odontograma);
  }

  getHistorialDiente (idPaciente: number, lado: string, numDiente: string){

    const url: string = `${this.url}diente/historial/${idPaciente}/${lado}/${numDiente}`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => this.historial = resp.historial),
        catchError( err => of(err.error.msg))
      )
  }

  getPresupuesto (idPaciente: number){

    const url: string = `${this.url}odontograma/presupuesto/${idPaciente}`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => console.log(resp)),
        catchError( err => of(err.error.msg))
      )
  }

  postDienteOdontograma (idPaciente: number, idEstado: number, observacion: string, idTratamiento: number){

    // Url de la API de Bitacora
    const url: string = `${this.url}odontograma`;
    const body = {
      lado: this.ladoSeleccionadoNombre,
      numeroDiente: this.numeroDienteSeleccionado,
      idEstado: idEstado,
      observacion,
      tratamiento: idTratamiento,
      idPaciente
    }
    // Consumir API
    return this.http.post(url, body)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }
}
