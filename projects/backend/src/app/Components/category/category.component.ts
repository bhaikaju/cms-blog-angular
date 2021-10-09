import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "projects/models/category.interface";
import {ApiService} from "projects/tools/src/lib/api.service";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  subs: Subscription[] = [];

  constructor(private apiService: ApiService,
              private message: MessageService) {
  }

  ngOnInit(): void {

    this.subs.push(this.apiService.getAllCategory().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized')));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const {title, description} = form.value;

    this.apiService.createCategory(title, description).subscribe(res => {
      this.categories.push(res);
      form.reset();
    })
  }

  update(ev: CellEventResponse) {
    this.subs.push(this.apiService.updateCategory(ev.data.id, ev.data.title, ev.data.description).subscribe(res => {
      this.categories[ev.index].title = res.title;
      this.categories[ev.index].description = res.description;
      this.message.add({
        severity: 'success',
        detail: 'Category Updated',
        life: 1000,
        summary: 'Successful'
      })
    }));
  }

  remove(rowIndex: number, id: number) {
    this.subs.push(
      this.apiService.removeCategory(id).subscribe(res => {
        if (res.success) {
          this.message.add({
            severity: 'success',
            detail: 'Category Removed',
            life: 1000,
            summary: 'Successful'
          })
        }
        this.categories.splice(rowIndex, 1);
      })
    )
  }
}

interface CellEventResponse {
  data: { id: number, title: string, description: string }
  field: string
  index: number
}
