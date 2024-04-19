import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-mail-decline',
  templateUrl: './mail-decline.component.html',
  styleUrls: ['./mail-decline.component.css']
})
export class MailDeclineComponent implements OnInit {
  token: string;
  warning: string = "";
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private globalService: GlobalService) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    this.globalService.validarTokenCorreoCliente(this.token, 3)
      .subscribe((resp: any) => {
        if(resp.ok == true) {
        } else {
          this.warning = resp.msg
        }
        this.loading = false;
      })
  }
}
