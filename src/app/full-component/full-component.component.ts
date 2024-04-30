import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SweetAlertService } from '../services/sweet-alert.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-component',
  templateUrl: './full-component.component.html',
  styleUrls: ['./full-component.component.css'],
})
export class FullComponentComponent {
  opened = true;
  panelOpenState = false;
  permisos: any[] = [];
  parametros: any = [];
  usuario: any = [];
  fecha: any;
  empresa: any = [];
  permiso: string = localStorage.getItem('rol');

  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    let sidebar = document.getElementById('sidebar');
    if (this.sidebarActive) {
      sidebar.classList.add('active');
    } else {
      sidebar.classList.remove('active');
    }
  }

  constructor(
    private _service: GlobalService,
    private _alert: SweetAlertService,
    private _ruter: Router,
  ) {
    //this._alert.mensajeSimple('Bienvenido a tu historial clinico','','success');
    this.fecha = new Date().getFullYear();
    this._service.mostrarpermisos().subscribe(resp=>{
      this.permisos = resp
    })

    this._service.mostrarusuario().subscribe((resp) => {
      this.usuario = resp[0];
    });
  }



ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 

}
  salir() {
    this._alert
      .mensajeConConfirmacion('SALIR', 'Desea salir del sistema?', 'warning')
      .then((r) => {
        if (r) {
          localStorage.clear();
          localStorage.removeItem('token');
          this._ruter.navigateByUrl('/inicio');
        }
      });
  }
}
