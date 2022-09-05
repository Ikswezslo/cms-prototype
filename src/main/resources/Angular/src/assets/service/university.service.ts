import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {university, UniversityForm} from '../models/university';
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

  getUniversity(id: Number, defaultErrorHandling: boolean = true): Observable<university> {
    return this.http.get<university>(`${this.universityUrl}/${id}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getUniversities(defaultErrorHandling: boolean = true): Observable<university[]> {
    return this.http.get<university[]>(this.universityUrl, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
  addNewUniveristy(university: UniversityForm, defaultErrorHandling: boolean = true ) : Observable<university>{
    return this.http.post<university>(this.universityUrl, university, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
}
