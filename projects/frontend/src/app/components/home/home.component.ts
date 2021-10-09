import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {Post} from "projects/models/post.interface";
import {Observable, Subscription, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // @ts-ignore
  posts$: Observable<Post[]> = [];
  subs: Subscription[] = [];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {


    this.subs.push(this.route.paramMap.subscribe(params => {
      const catTitle = params.get('title');
      if (this.router.url === `/post/category/${catTitle}`) {
        this.posts$ = this.apiService.getAllPosts().pipe(
          map(posts => posts.filter(p => p.category.title === catTitle))
        );
      } else {

        this.posts$ = this.apiService.getAllPosts().pipe(

          catchError(err => throwError(err))
        );
      }
    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

}
