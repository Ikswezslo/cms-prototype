import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "./error-handler.service";
import {Observable} from "rxjs";
import {Template} from "../models/template";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templateUrl = 'http://localhost:8080/templates';

  httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
  }

  getTemplate(id: number, defaultErrorHandling: boolean = true): Observable<Template> {
    return this.http.get<Template>(`${this.templateUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getAllTemplates(defaultErrorHandling: boolean = true): Observable<Template[]> {
    return this.http.get<Template[]>(this.templateUrl + "/all", this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getUniversityTemplates(universityID: number, defaultErrorHandling: boolean = true): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.templateUrl}/?universityID=${universityID}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  addTemplate(name: string, defaultErrorHandling: boolean = true): Observable<Template> {
    return this.http.post<Template>(this.templateUrl, name, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  addUniversityToTemplate(templateID: number, universityID: number,
                          defaultErrorHandling: boolean = true): Observable<Template> {
    return this.http.post<Template>(`${this.templateUrl}/${templateID}/universities/${universityID}`,
      this.httpOptions).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  removeUniversityFromTemplate(templateID: number, universityID: number,
                               defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.delete<void>(`${this.templateUrl}/${templateID}/universities/${universityID}`,
      this.httpOptions).pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyTemplateNameField(id: Number, name: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.templateUrl}/${id}/name`, name, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyTemplateContentField(id: Number, content: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.templateUrl}/${id}/content`, content, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  deleteTemplate(id: Number, defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.delete<void>(`${this.templateUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }
}
