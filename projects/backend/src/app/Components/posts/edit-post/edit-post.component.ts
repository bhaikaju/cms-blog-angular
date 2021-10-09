import {Component, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "projects/models/post.interface";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {Category} from "projects/models/category.interface";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  // @ts-ignore
  post: Post;
  imgUrl: any = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
  imagePath = this.imgUrl;
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';
  categories: Category[] = [];

  constructor(private apiService: ApiService,
              private message: MessageService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const slug = param.get('slug')
      if (slug) {
        this.apiService.getPostBySlug(slug).subscribe(post => this.post = post);
      }
    })


    this.apiService.getAllCategory().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  previewImage(ev: any) {
    if (ev.target.files.length === 0) {
      this.imgUrl = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
      this.mainImagePath = this.imgUrl;
      return;
    }
    const reader = new FileReader();
    this.imagePath = ev.target.files;
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      this.imgUrl = reader.result;
    }
    this.altText = ev.target.files[0].name;

    const file: File = ev.target.files[0];

    if (file) {
      this.showProgress = true;
      this.uploadProgress = 0;
      this.filename = file.name;
      const formData = new FormData();
      formData.append('picture', file);
      const upload$ = this.apiService.uploadFile(formData);

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          if (this.uploadProgress === 100) {
            this.message.add({
              severity: 'info', summary: 'Success',
              detail: 'File Uploaded', life: 2000
            })
          }
        }
        if (event instanceof HttpResponse) {
          const response: any = event.body;
          this.mainImagePath = response.filePath;
          this.post.mainImageUrl = this.mainImagePath;
        }
        setTimeout(() => this.showProgress = false, 2000)
      })

    }
  }

  updatePost() {
    this.apiService.updatePost(this.post.slug ,this.post).subscribe(res => {
      if (res.title) {
        this.message.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Post updated',
          life: 1500
        })
      }
    }, (err: HttpErrorResponse) => {
      this.message.add({
        severity: 'error',
        summary: 'Failure',
        detail: err.statusText,
        life: 1500
      })
    })
  }
}
