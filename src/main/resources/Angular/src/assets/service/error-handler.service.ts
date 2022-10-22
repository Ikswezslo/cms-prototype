import {Injectable} from '@angular/core';
import {catchError, OperatorFunction, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router,) {
  }

  public getRestError(responseError: any): RestError {
    console.log(responseError)
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
      console.log(restError)
      if (defaultErrorHandling) {
        this.handleError(restError);
      }
      return throwError(() => restError);
    })
  }

  public handleError(error: RestError) {
    console.error();
    if (error.status === 401) {
      this.router.navigateByUrl("/login")
    }
    // alert(`
    // ${error.status} - ${error.error}
    // Message: ${error.message}
    // Exception: ${error.exception}

    // Request: ${error.method} ${error.url}
    // ${error.fieldViolations.map(value => `\n${value.field}: ${value.message}`).join('')}
    // `)
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
