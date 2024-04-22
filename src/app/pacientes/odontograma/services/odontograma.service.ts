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

  infoDiente = {
    estadoDiente: "",
    tratamiento: "",
    observacion: "",
    proceso: ""
  };

  fecha: string = "";

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

  getOdontograma (idPaciente: number, fecha: string){

    const url: string = `${this.url}diente/odontograma/${idPaciente}?fecha=${fecha}`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => {
          this.limpiarOdontograma();
          this.odontograma = resp.dientes;
          this.cargarOdontograma();
        }),
        catchError( err => of(err.error.msg))
      )
  }

  limpiarOdontograma() {
    // Lógica para cargar odontograma
    // Cuando odontograma esté listo:
    this.odontogramaSubject.next([]);
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

  getInfoDiente (idPaciente: number, lado: string, numDiente: string){

    let ahora = new Date();
    const url: string = `${this.url}diente/info/${idPaciente}/${lado}/${numDiente}?fecha=${this.fecha ? this.fecha : new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()).toISOString().split('T')[0]}`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => {
          console.log(resp)

          this.infoDiente.estadoDiente = resp.info.NOMBRE ? resp.info.NOMBRE : "";
          this.infoDiente.tratamiento = resp.info.nombre_tratamiento ? resp.info.nombre_tratamiento : "";
          this.infoDiente.observacion = resp.info.OBSERVACION ? resp.info.OBSERVACION : "";
          this.infoDiente.proceso = resp.info.NOMBRE_ESTADO ? resp.info.NOMBRE_ESTADO : ""
          console.log(this.infoDiente.estadoDiente)
        }),
        catchError( err => of({}))
      )
  }

  getPresupuesto (idPaciente: number, fecha: string){

    const url: string = `${this.url}odontograma/presupuesto/${idPaciente}?fecha=${fecha}`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        tap((resp: any) => console.log(resp)),
        catchError( err => of(err.error.msg))
      )
  }

  postDienteOdontograma (idPaciente: number, idEstado: number, observacion: string){
    let ahora = new Date();
    // Url de la API de Bitacora
    const url: string = `${this.url}odontograma`;
    const body = {
      lado: this.ladoSeleccionadoNombre,
      numeroDiente: this.numeroDienteSeleccionado,
      idEstado: idEstado,
      observacion,
      idPaciente,
      fecha: this.fecha ? this.fecha : new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()).toISOString().split('T')[0]
    }
    // Consumir API
    return this.http.post(url, body)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }

  putTratamientoDienteOdontograma (idPaciente: number, idTratamiento: any){
    let ahora = new Date();
    // Url de la API de Bitacora
    const url: string = `${this.url}odontograma/tratamiento`;
    const body = {
      lado: this.ladoSeleccionadoNombre,
      numeroDiente: this.numeroDienteSeleccionado,
      idPaciente,
      idTratamiento,
      fecha: this.fecha ? this.fecha : new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()).toISOString().split('T')[0]
    }
    // Consumir API
    return this.http.put(url, body)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }

  putEstadoProcesoDienteOdontograma (idPaciente: number){
    let ahora = new Date();
    // Url de la API de Bitacora
    const url: string = `${this.url}odontograma/estado`;
    const body = {
      lado: this.ladoSeleccionadoNombre,
      numeroDiente: this.numeroDienteSeleccionado,
      idPaciente,
      fecha: this.fecha ? this.fecha : new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()).toISOString().split('T')[0]
    }
    // Consumir API
    return this.http.put(url, body)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }
}
