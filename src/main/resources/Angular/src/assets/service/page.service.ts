import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {page} from 'src/assets/models/page';
import {RestErrorHandler} from "../models/restError";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private pageUrl = 'http://localhost:8080/pages';

  httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  getPage(id: Number, defaultErrorHandling: boolean = true): Observable<page> {
    return this.http.get<page>(`${this.pageUrl}/${id}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getPages(defaultErrorHandling: boolean = true): Observable<page[]> {
    return this.http.get<page[]>(this.pageUrl + "/all", this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getNewPages(defaultErrorHandling: boolean = true): Observable<page[]> {
    return this.http.get<page[]>(`${this.pageUrl}/cards?sort=createdOn,desc`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

}
