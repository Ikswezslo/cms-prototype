import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Keyword } from '../models/keywords';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class KeyWordsService {

  private keyWordsUrl = 'http://localhost:8080/keyWords';

  httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
  }

  getKeyWord(id: number, defaultErrorHandling: boolean = true): Observable<Keyword> {
    return this.http.get<Keyword>(`${this.keyWordsUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getAllKeyWords(defaultErrorHandling: boolean = true): Observable<Keyword[]> {
    return this.http.get<Keyword[]>(this.keyWordsUrl + "/all", this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  addKeyWord(word: string, defaultErrorHandling: boolean = true): Observable<string> {
    return this.http.post<string>(this.keyWordsUrl, word, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }


  modifyKeyWordWordField(id: Number, word: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.post<void>(`${this.keyWordsUrl}/${id}`, word, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  deleteKeyWord(id: Number, defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.delete<void>(`${this.keyWordsUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }
}
