import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorHandlerService} from "./error-handler.service";
import {FileResource} from "../models/file";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private server = 'http://localhost:8080/file';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
  }

  getAll(pageID: Number, defaultErrorHandling: boolean = true): Observable<FileResource[]> {
    return this.http.get<FileResource[]>(`${this.server}/all/page/${pageID}`, {withCredentials: true}).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }

  deleteFile(filename: string, pageID: Number, defaultErrorHandling: boolean = true): Observable<FileResource[]> {
    return this.http.delete<void>(`${this.server}/delete/page/${pageID}/${filename}`, {withCredentials: true}).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }

  upload(formData: FormData, pageId: Number, userId: Number, defaultErrorHandling: boolean = true): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/upload/page/${pageId}/user/${userId}`, formData, {
      withCredentials: true,
      reportProgress: true,
      observe: 'events',
    }).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }

  download(filename: string, pageId: Number, defaultErrorHandling: boolean = true): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/download/page/${pageId}/${filename}`, {
      reportProgress: true,
      withCredentials: true,
      observe: 'events',
      responseType: "blob",
    }).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }
}
