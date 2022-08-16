import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { universitie } from '../models/universitie';
import { page } from '../models/page';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PageService {

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

  getUser(id: Number) {
    return this.http.get<user>('http://127.0.0.1:8080/users/' + id);
  }

  getUsers() {
    return this.http.get<user[]>('http://127.0.0.1:8080/users');
  }
}
