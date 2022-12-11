import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {ErrorHandlerService} from "./error-handler.service";
import {Observable} from "rxjs";
import {Page} from "../models/page";
import {Backup} from "../models/backup";

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  private backupUrl = 'http://localhost:8080/backups';

  httpOptions = {
    withCredentials: true
  };


  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
  }

  getBackups(defaultErrorHandling: boolean = true): Observable<Backup[]> {
    return this.http.get<Backup[]>(this.backupUrl, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  createBackup(defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.get<void>(this.backupUrl + '/export', this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  downloadBackup(backupName: string, defaultErrorHandling: boolean = true): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.backupUrl}/download/page/${backupName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: "blob",
    }).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }

}
