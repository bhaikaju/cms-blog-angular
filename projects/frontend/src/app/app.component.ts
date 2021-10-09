import {Component, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService,
              ) {
  }

  ngOnInit() {
  }

}
