import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {University, UniversityForm} from '../models/university';
import {Observable} from "rxjs";
import {RestErrorHandler} from "../models/restError";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private universityUrl = 'http://localhost:8080/universities';

  httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  getUniversity(id: Number, defaultErrorHandling: boolean = true): Observable<University> {
    return this.http.get<University>(`${this.universityUrl}/${id}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getUniversities(defaultErrorHandling: boolean = true): Observable<University[]> {
    return this.http.get<University[]>(this.universityUrl, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  addNewUniversity(University: UniversityForm, defaultErrorHandling: boolean = true): Observable<University> {
    return this.http.post<University>(this.universityUrl, University, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  hideUniversity(id: Number, un_hide: boolean, defaultErrorHandling: boolean = true): Observable<University> {
    return this.http.put<University>(`${this.universityUrl}/${id}/${un_hide}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
}
