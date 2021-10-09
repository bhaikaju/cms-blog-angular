import {Component, OnInit} from '@angular/core';
import {ApiService} from "projects/tools/src/lib/api.service";
import {Subscription} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Category} from "projects/models/category.interface";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

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
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.apiService.getAllCategory().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  preview(ev: any) {
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
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          if (this.uploadProgress === 100) {
            this.messageService.add({
              severity: 'info', summary: 'Success',
              detail: 'File Uploaded', life: 2000
            })
          }
        }
        if (event instanceof HttpResponse) {
          const response: any = event.body;
          this.mainImagePath = response.filePath;
        }
        setTimeout(()=> this.showProgress = false , 2000)
      })

    }
  }

  createPost(myForm: NgForm) {
     if (myForm.invalid) {
       return;
     }
     const {title, category, content} = myForm.value;
    console.log(this.mainImagePath);
     const formData = {
       title,
       categoryId: parseInt(category),
       content,
       mainImageUrl: this.mainImagePath
     }

     this.apiService.createPost({...formData}).subscribe(post => {
       this.messageService.add({
         severity:'info',
         detail: 'Post Created',
         summary: 'Done',
         life: 2000
       });
       myForm.reset();
     })
  }
}
