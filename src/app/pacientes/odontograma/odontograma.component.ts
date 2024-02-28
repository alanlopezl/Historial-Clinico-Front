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
