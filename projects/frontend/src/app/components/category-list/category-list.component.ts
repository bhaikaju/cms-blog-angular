import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "projects/models/category.interface";
import {ApiService} from "projects/tools/src/lib/api.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  // @ts-ignore
  category: Observable<Category[]>;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.category = this.apiService.getAllCategory();
  }

}
