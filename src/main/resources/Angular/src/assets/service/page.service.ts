import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page} from 'src/assets/models/page';
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

  public tempPage?: Page;

  getPage(id: Number, defaultErrorHandling: boolean = true): Observable<Page> {
    return this.http.get<Page>(`${this.pageUrl}/${id}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getPages(defaultErrorHandling: boolean = true): Observable<Page[]> {
    return this.http.get<Page[]>(this.pageUrl + "/all", this.httpOptions)
        .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getNewPages(defaultErrorHandling: boolean = true): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.pageUrl}/all?sort=createdOn,desc`, this.httpOptions)
        .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyPageContentField(id: Number, content: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.pageUrl}/${id}/content`, content, this.httpOptions)
        .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyPageHiddenField(id: Number, hidden: boolean, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.pageUrl}/${id}/hidden`, hidden, this.httpOptions)
        .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
}
