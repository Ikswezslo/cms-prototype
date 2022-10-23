import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page, PageForm} from 'src/assets/models/page';
import {Observable} from "rxjs";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private pageUrl = 'http://localhost:8080/pages';

  httpOptions = {
    withCredentials: true
  };


  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
  }

  private cachedPage?: Page;

  cachePage(page: Page): void {
    this.cachedPage = page;
  }

  getCachedPage(id: Number) {
    if (id !== this.cachedPage?.id) {
      this.cachedPage = undefined;
    }
    return this.cachedPage;
  }

  getPage(id: Number, defaultErrorHandling: boolean = true): Observable<Page> {
    return this.http.get<Page>(`${this.pageUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getPages(defaultErrorHandling: boolean = true): Observable<Page[]> {
    return this.http.get<Page[]>(this.pageUrl + "/all", this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getNewPages(defaultErrorHandling: boolean = true): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.pageUrl}?sort=createdOn,desc`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyPageContentField(id: Number, content: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.pageUrl}/${id}/content`, content, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyPageHiddenField(id: Number, hidden: boolean, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.pageUrl}/${id}/hidden`, hidden, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  deletePage(id: Number, defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.delete<Page>(`${this.pageUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  addNewPage(Page: PageForm, defaultErrorHandling: boolean = true): Observable<Page> {
    return this.http.post<Page>(this.pageUrl, Page, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getCreatorPages(userId: Number, defaultErrorHandling: boolean = true): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.pageUrl}/creator/${userId}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
}
