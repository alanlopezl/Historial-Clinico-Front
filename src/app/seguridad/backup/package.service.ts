import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient, private _globals: GlobalService) { }

  private url = `${environment.url}backup`;

  private permiso = new BehaviorSubject<any[]>([]);
  public responsepermiso$: Observable<any[]> = this.permiso.asObservable();


  getBackup() {

    const url: string = `${this.url}/db-backup/subir`;

    const body = {
      
    }

    return this.http.post(url, body, {observe: 'response', responseType: 'blob'})
      .pipe(
        catchError(err => of(err.error))
      )
  }

  mostrarpermiso(rol: any, objeto) {
    const request$ = this._globals
      .obtener(`permisossistemaid/${rol}/${objeto}`)
      .pipe(
        tap((resp: any) => {
          this.permiso.next(resp);
        })
      );
    return request$.subscribe();
  }

  postBackup(archivo: File) {
    const url: string = `${this.url}/db-backup/actualizar`;
    const file: File = archivo
    // if(!file) {
    //   return;
    // }
    const formData = new FormData();
    formData.append('backup', file, file.name)

    console.log(formData)
    return this.http.put(url, formData)
      .pipe(
        catchError(err => of(err.error))
      )
  }
}
