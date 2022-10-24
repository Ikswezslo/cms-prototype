import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {University, UniversityForm} from '../models/university';
import {Observable} from "rxjs";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private universityUrl = 'http://localhost:8080/universities';

  httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
  }

  getUniversity(id: Number, defaultErrorHandling: boolean = true): Observable<University> {
    return this.http.get<University>(`${this.universityUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getUniversities(defaultErrorHandling: boolean = true): Observable<University[]> {
    return this.http.get<University[]>(this.universityUrl, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  addNewUniversity(University: UniversityForm, defaultErrorHandling: boolean = true): Observable<University> {
    return this.http.post<University>(this.universityUrl, University, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUniversityHiddenField(id: Number, hidden: boolean, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.universityUrl}/${id}/hidden`, hidden, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  editUniversity(University: UniversityForm, defaultErrorHandling: boolean = true): Observable<University> {
    return this.http.put<University>(`${this.universityUrl}/${University.id}`, University, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }
}
