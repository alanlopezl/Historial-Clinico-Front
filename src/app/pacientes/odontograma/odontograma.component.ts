import { Component, ElementRef, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PacientesPackageService } from '../pacientes/pacientes-package.service';
import { Router } from '@angular/router';
import { OdontogramaService } from './services/odontograma.service';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent {
  fillColor: String = "white";
  fill;
  htmlString: string;
  nativo: any;

  getDay() {
    let ahora = new Date();
    return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()).toISOString().split('T')[0];
  }

  loadTodayOdontrogram() {
    let today = this.getDay();
    const idPaciente: number = this.pacienteService.selectedIdPaciente;
    this.odontologiaService.getOdontograma(idPaciente, today)
      .subscribe(resp => {
        console.log(resp)
      });
  }
  hoy = new Date()

  total: number = 0;
  presupuesto = [];

  @ViewChild('filtro') filtro!: ElementRef;
  @ViewChild(TemplateRef, { static: true }) odontoTemplate: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true, read: ViewContainerRef })
  odontoContainer: ViewContainerRef;
  constructor(public pacienteService: PacientesPackageService, private _route:Router, public odontologiaService: OdontogramaService, ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    if(this.pacienteService.selectedIdPaciente === 0) {
      this._route.navigateByUrl('/pacientes/pacientes');
    } else {
      this.cargarTratamientos();
      this.loadTodayOdontrogram();
      this.cargarEstadosDiente();
    }
  }

  ngAfterViewInit() {
    this.odontoContainer.createEmbeddedView(this.odontoTemplate);
  }

  changeColor(lado: HTMLElement) {
    this.fill = this.fillColor;
    lado.attributes.setNamedItem(
      lado.attributes.getNamedItem("fill")
    ).value = this.fill;
  }

  amarillo() {
    this.fillColor = "yellow";
  }

  rojo() {
    this.fillColor = "red";
  }

  public dientes1: string[] = ["18", "17", "16", "15", "14", "13", "12", "11"];
  public dientes2: string[] = ["21", "22", "23", "24", "25", "26", "27", "28"];
  public dientes3: string[] = ["31", "32", "33", "34", "35", "36", "37", "38"];
  public dientes4: string[] = ["48", "47", "46", "45", "44", "43", "42", "41"];
  public dientes5: string[] = ["61", "62", "63", "64", "65"];
  public dientes6: string[] = ["55", "54", "53", "52", "51"];
  public dientes7: string[] = ["71", "72", "73", "74", "75"];
  public dientes8: string[] = ["85", "84", "83", "82", "81"];


  cargarOdonto() {
    this.odontoTemplate = this.nativo;
  }

  cargarDientesOdontograma() {
    this.odontologiaService.fecha = this.filtro.nativeElement.value
    const idPaciente: number = this.pacienteService.selectedIdPaciente;
    this.odontologiaService.getOdontograma(idPaciente, this.filtro.nativeElement.value)
      .subscribe(resp => {
        console.log(resp)
      });
  }

  cargarPresupuesto() {
    const idPaciente: number = this.pacienteService.selectedIdPaciente;
    this.odontologiaService.getPresupuesto(idPaciente, this.filtro.nativeElement.value)
      .subscribe(resp => {
        this.total = resp.total;
        this.presupuesto = resp.presupuesto;
      });
  }

  cargarTratamientos() {
    this.odontologiaService.getTratamientos()
      .subscribe()
  }

  cargarEstadosDiente() {

    this.odontologiaService.getEstadosDientes()
      .subscribe()
  }
}
