import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { university } from '../models/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  
  private userUrl = 'http://localhost:8080/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUniversity(id: Number) {
    return this.http.get<university>('http://127.0.0.1:8080/universities/' + id);
  }

  getUniversities() {
    return this.http.get<university[]>('http://127.0.0.1:8080/universities');
  }

}
