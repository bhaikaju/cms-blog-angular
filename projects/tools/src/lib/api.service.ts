import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "projects/models/post.interface";
import {Category} from "projects/models/category.interface";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "projects/models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:5000/api';
  private authState$ = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  private user: User = {
    email: '',
    id: -1,
    firstname: '',
    lastname: '',
    profilePic: '',
    roles: ''
  };
  private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient,
              private router: Router) {
    this.http.get<{ status: boolean, user: User }>(`${this.URL}/auth/authstatus`).toPromise().then(res => {
      this.authState$.next(res.status);
      if (res.status) {
        this.user = res.user;
        this.user$.next(this.user);
        this.setUser(this.user);
        this.router.navigateByUrl('/').then();
      }
    })
  }

  getAuthState(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  getUserObservable() {
    return this.user$.asObservable();
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/posts`);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

  createCategory(title: string, description: string) {
    return this.http.post<Category>(`${this.URL}/category`, {title, description}, {
      withCredentials: true
    })
  }

  getPostBySlug(slug: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/posts/slug/${slug}`);
  }

  createPost(formData: any): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, formData, {
      withCredentials: true
    });
  }

  updatePost(slug:string, postData: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.URL}/posts/${slug}`, postData, {
      withCredentials: true
    });
  }

  uploadFile(form: FormData) {
    return this.http.post(`${this.URL}/posts/upload-photo`, form, {
      reportProgress: true,
      observe: 'events'
    });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.URL}/auth/login`, {email, password}, {
      withCredentials: true
    }).pipe(
      tap(value => {
        if (value.success) {
          this.authState$.next(true);
          this.user$.next(value.user)
        } else {
          this.authState$.next(false);
        }
      })
    );
  }

  /*registration*/
  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/auth/register`, userData, {
      withCredentials: true
    });
  }

  /*logout*/
  logout() {
    return this.http.post<{ success: boolean }>(`${this.URL}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(res => {
        this.user$.next({
          email: '',
          id: -1,
          firstname: '',
          lastname: '',
          profilePic: '',
          roles: ''
        })
        localStorage.removeItem('user');
      })
    );
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  updateCategory(id: number, title: string, description: string) {
    return this.http.patch<Category>(`${this.URL}/category/${id}`, {title, description}, {
      withCredentials: true
    })
  }

  removeCategory(id: number) {
    return this.http.delete<{ success: boolean, category: Category }>(`${this.URL}/category/${id}`, {
      withCredentials: true
    });
  }

  removePost(id: number) {
    return this.http.delete<{success: boolean, post: Post}>(`${this.URL}/posts/${id}`, {withCredentials: true});
  }
}
