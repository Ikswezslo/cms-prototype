import {Injectable} from '@angular/core';
import {catchError, OperatorFunction, throwError} from "rxjs";
import {Router} from "@angular/router";
import {DialogService} from "./dialog.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private translateService: TranslateService) {
  }

  public getRestError(responseError: any): RestError {
    let error: RestError = responseError.error as RestError;
    if (error == null) {
      error = {} as RestError;
    }
    if (error.fieldViolations == null) {
      error.fieldViolations = [];
    }
    error.status = responseError.status;
    error.url = responseError.url;
    return error;
  }

  public getErrorHandling(defaultErrorHandling: boolean): OperatorFunction<any, any> {
    return catchError(error => {
      let restError: RestError = this.getRestError(error)
      console.error(restError);
      if (defaultErrorHandling) {
        this.handleError(restError);
      }
      return throwError(() => restError);
    })
  }

  public handleError(error: RestError) {
    switch (error.status) {
      case 400:
        this.dialogService.openErrorDialog(error.message ?
          this.translateService.instant(error.message) : this.translateService.instant('ERRORS.400'));
        break;
      case 401:
        this.router.navigateByUrl("/login");
        break;
      case 403:
        this.dialogService.openErrorDialog(error.message ?
          this.translateService.instant(error.message) : this.translateService.instant('ERRORS.403'));
        break;
      case 404:
        this.dialogService.openErrorDialog(error.message ?
          this.translateService.instant(error.message) : this.translateService.instant('ERRORS.404'));
        break;
      case 500:
        this.dialogService.openErrorDialog(this.translateService.instant('ERRORS.500'));
        break;
    }
  }
}

export interface RestError {
  message: string;
  error: string;
  status: number;
  url: string;
  method: string;
  exception: string;
  fieldViolations: Violation[]
}

export interface Violation {
  field: string;
  message: string;
}
