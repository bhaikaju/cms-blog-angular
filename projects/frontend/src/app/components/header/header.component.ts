import { Component, OnInit } from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {noop, Observable} from "rxjs";
import {User} from "projects/models/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  user$: Observable<User>;
  constructor(private apiService: ApiService,
              private router: Router ) { }

  ngOnInit(): void {
    console.log(this.router.url);
   this.user$ = this.apiService.getUserObservable();
  }

  logout() {
    this.apiService.logout().subscribe(noop);
  }
}
