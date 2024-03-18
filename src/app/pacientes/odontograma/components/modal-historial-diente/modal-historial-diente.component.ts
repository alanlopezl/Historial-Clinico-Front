import { Component } from '@angular/core';
import { OdontogramaService } from '../../services/odontograma.service';

@Component({
  selector: 'app-modal-historial-diente',
  templateUrl: './modal-historial-diente.component.html',
  styleUrls: ['./modal-historial-diente.component.css']
})
export class ModalHistorialDienteComponent {
  constructor(public odontologiaService: OdontogramaService) {}

}
