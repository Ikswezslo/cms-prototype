import {Injectable} from "@angular/core";
import {UserService} from "./user.service";

@Injectable()
export class SetupService {
  constructor(private userService: UserService) {
  }

  public initliaze(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getLoggedUser().subscribe({
        next: user => {
          this.userService.loggedUser = user;
          resolve(true);
        },
        error: err => {
          resolve(true);
        }
      });
    })
  }

}
