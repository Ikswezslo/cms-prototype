import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private server = 'http://localhost:8080/file';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
  }

  upload(formData: FormData, pageId: Number, userId: Number, defaultErrorHandling: boolean = true): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/upload/page/${pageId}/user/${userId}`, formData, {
      withCredentials: true,
      reportProgress: true,
      observe: 'events',
    }).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }

  download(filename: string, defaultErrorHandling: boolean = true): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: "blob"
    }).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling))
  }
}
