import { Component, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PacientesPackageService } from '../pacientes/pacientes-package.service';
import { Router } from '@angular/router';

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
  @ViewChild(TemplateRef, { static: true }) odontoTemplate: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true, read: ViewContainerRef })
  odontoContainer: ViewContainerRef;
  constructor(public pacienteService: PacientesPackageService, private _route:Router,) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    if(this.pacienteService.selectedIdPaciente === 0) {
      this._route.navigateByUrl('/pacientes/pacientes');
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

  public dientes1: string[] = ["1.8", "1.7", "1.6", "1.5", "1.4", "1.3", "1.2", "1.1"];
  public dientes2: string[] = ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8"];
  public dientes3: string[] = ["31", "32", "33", "34", "35", "36", "37", "38"];
  public dientes4: string[] = ["48", "47", "46", "45", "44", "43", "42", "41"];
  public dientes5: string[] = ["61", "62", "63", "64", "65"];
  public dientes6: string[] = ["5.5", "54", "53", "52", "51"];
  public dientes7: string[] = ["71", "72", "73", "74", "75"];
  public dientes8: string[] = ["85", "84", "83", "82", "81"];

  guardarOdonto() {
    // this.htmlString = odonto.innerHTML;
    // this.htmlString = odonto.innerHTML;
    this.nativo = this.odontoTemplate;
    const svgElements: NodeList = this.nativo.elementRef.nativeElement.ownerDocument.querySelectorAll(
      "svg"
    ) as NodeList;
    let toStore = "";
    svgElements.forEach(
      (node: SVGElement) => (toStore = "<div>" + node.innerHTML + "</div>")
    );
    console.log(toStore);
    localStorage.setItem("html", toStore);
  }
  cargarOdonto() {
    this.odontoTemplate = this.nativo;
  }
}
