import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs/operators';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';

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


    forkJoin({
    pacientes: this.http.get(environment.url+'countP'),
    medico: this.http.get(environment.url+'countM'),
    usuarios: this.http.get(environment.url+'countU')
  }).subscribe((res: any) => {
    this.pacientes = res.pacientes.data[0].id;
    this.medico = res.medico.data[0].id;
    this.usuarios = res.usuarios.data[0].id;
    this.updateData();
  });
  }

  single: any[] = [];
  view: [number, number] = [1000, 200];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  updateData() {
    console.log(this.pacientes, this.medico, this.usuarios)
    this.single = [
      { 
        "name": "Pacientes",
        "value": this.pacientes
      },
      { 
        "name": "Médicos",
        "value": this.medico
      },
      { 
        "name": "Usuarios",
        "value": this.usuarios
      }
    ];
  }
 
}
