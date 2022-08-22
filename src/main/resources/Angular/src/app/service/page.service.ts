import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { universitie } from '../models/universitie';
import { page } from '../models/page';
import { User, UserForm } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class PageService {

  private userUrl = 'http://localhost:8080/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPage(id: Number) {
    return this.http.get<page>('http://127.0.0.1:8080/pages/' + id);
  }

  getPages() {
    return this.http.get<page[]>('http://127.0.0.1:8080/pages');

  }

  getUniversitie(id: Number) {
    return this.http.get<universitie>('http://127.0.0.1:8080/universities/' + id);
  }

  getUniversities() {
    return this.http.get<universitie[]>('http://127.0.0.1:8080/universities');
  }

  getUser(id: Number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  createUser(user: UserForm): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions)
  }
}
