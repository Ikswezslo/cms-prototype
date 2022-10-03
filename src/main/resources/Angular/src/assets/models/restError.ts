import { MatDialog } from "@angular/material/dialog";
import {catchError, OperatorFunction, throwError} from "rxjs";
import { ErrorDialogComponent } from "src/app/dialog/error-dialog/error-dialog.component";
import { ErrorHandleService } from "../service/error-handle.service";

export interface RestError {
    message: string;
    error: string;
    status: string;
    url: string;
    method: string;
    exception: string;
    fieldViolations: Violation[]
}

export interface Violation {
    field: string;
    message: string;
}

export class RestErrorHandler {

    static getRestError(responseError: any): RestError {
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

    static getErrorHandling(defaultErrorHandling: boolean): OperatorFunction<any, any> {
        return catchError(error => {
            console.log(error)
            let restError: RestError = RestErrorHandler.getRestError(error)
            if (defaultErrorHandling) {
                RestErrorHandler.handleError(restError);
            }
            return throwError(() => restError);
        })
    }

    static handleError(error: RestError) {
        console.error(error);
        // alert(`
        // ${error.status} - ${error.error}
        // Message: ${error.message}
        // Exception: ${error.exception}

        // Request: ${error.method} ${error.url}
        // ${error.fieldViolations.map(value => `\n${value.field}: ${value.message}`).join('')}
        // `)
    }
}
