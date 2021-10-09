import {Component, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService,
              private router: Router,
              private message: MessageService) {
  }

  ngOnInit(): void {

  }

  logout() {
    this.apiService.logout().subscribe(res => {
      if (res.success) {
        this.message.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Logged out',
          life: 1500
        });
       setTimeout(()=>{
         this.router.navigateByUrl('/login').then();
       },1500);

      }
    })
  }

}
