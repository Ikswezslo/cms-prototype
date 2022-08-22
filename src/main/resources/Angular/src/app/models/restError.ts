export interface RestError {
  statusCode: number;
  url: string;

  message: string;
  status: string;
  violations: Violation[]
}

export interface Violation {
  field: string;
  message: string;
}

export class RestErrorHandler {

  static prepareError(responseError: any): RestError {
    let error: RestError = responseError.error as RestError;
    error.statusCode = responseError.status;
    error.url = responseError.url;
    return error;
  }

  static handleError(error: RestError) {
    console.error(error);
    alert(`
      ${error.statusCode} - ${error.status}
      ${error.message}

      url: ${error.url}
      ${error.violations.map(value => `\n${value.field}: ${value.message}`).join('')}
    `)
  }
}
