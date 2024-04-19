import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-mail-confirmation',
  templateUrl: './mail-confirmation.component.html',
  styleUrls: ['./mail-confirmation.component.css']
})
export class MailConfirmationComponent implements OnInit {
  token: string;
  fecha: string = "";
  warning: string = "";
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private globalService: GlobalService) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    this.globalService.validarTokenCorreoCliente(this.token, 2)
      .subscribe((resp: any) => {
        if(resp.ok == true) {
          this.fecha = resp.fecha
        } else {
          this.warning = resp.msg
        }
        this.loading = false;
      })
  }
}
