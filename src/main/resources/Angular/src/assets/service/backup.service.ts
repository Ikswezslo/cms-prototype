import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "./error-handler.service";
import {Observable} from "rxjs";
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

  downloadBackup(backupName: string, defaultErrorHandling: boolean = true): Observable<Blob> {
    return this.http.get(`${this.backupUrl}/download/${backupName}`, {
      ...this.httpOptions,
      reportProgress: true,
      responseType: "blob",
    }).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }

  createBackup(defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.post<void>(this.backupUrl + '/export', null, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  deleteBackup(backupName: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.delete<void>(`${this.backupUrl}/delete/${backupName}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

}
