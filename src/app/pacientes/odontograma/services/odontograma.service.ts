import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {

  ladoSeleccionadoNombre: string;
  numeroLadoSeleccionadoNombre: number;
  numeroDienteSeleccionado: string
  idDienteSeleccionado: string

  constructor(private http: HttpClient) { }

  private url = `${environment.url}`;

  getTratamientos (){

    // Url de la API de Bitacora
    const url: string = `${this.url}tratamientos`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }

  getEstadosDientes (){

    // Url de la API de Bitacora
    const url: string = `${this.url}estado_diente`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }

  postTratamiento (idTratamiento: number, observacion: number, ){

    // Url de la API de Bitacora
    const url: string = `${this.url}tratamientos`;

    // Consumir API
    return this.http.get(url)
      .pipe(
        catchError( err => of(err.error.msg))
      )
  }
}
