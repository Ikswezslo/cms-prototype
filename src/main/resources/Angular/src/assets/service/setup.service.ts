import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable()
export class SetupService {
  constructor(
    private userService: UserService,
    private errorHandler: ErrorHandlerService
  ) {
  }

  public initialize(): Promise<any> {
    return new Promise((resolve) => {
      this.userService.getLoggedUser(false).subscribe({
        next: user => {
          this.userService.loggedUser = user;
          resolve(true);
        },
        error: err => {
          if (err.status !== 404) {
            this.errorHandler.handleError(err);
          }
          resolve(true);
        }
      });
    })
  }
}
