import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { page } from 'src/assets/models/page';
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


}
