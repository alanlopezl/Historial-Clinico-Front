import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  
  pacientes: number;
  usuarios: number;
  medico:number
 

  constructor(private http: HttpClient) {

    this.http.get(environment.url+'countP').subscribe((resp:any)=>{
      this.pacientes = resp.data[0].id
    })

    this.http.get(environment.url+'countM').subscribe((resp:any)=>{
      this.medico = resp.data[0].id
    })
    this.http.get(environment.url+'countU').subscribe((resp:any)=>{
      this.usuarios = resp.data[0].id
    })
  }

 
}
