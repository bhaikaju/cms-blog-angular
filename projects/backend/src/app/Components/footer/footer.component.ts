import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: any;
  constructor() { }

  ngOnInit(): void {
    this.year = new Date(Date.now()).getFullYear();
  }

}
