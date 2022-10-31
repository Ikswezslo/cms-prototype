import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {Page} from "../models/page";
import {User} from "../models/user";
import {University} from "../models/university";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private userService: UserService) {
  }

  public isForbiddenPage(page?: Page): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser && page) {
      if (loggedUser.accountType === "USER" || loggedUser.accountType === "MODERATOR") {
        if (!this.hasUniversity(page.university.id)) {
          return true;
        }
      }
      if (loggedUser.accountType === "USER") {
        if (!(page.creator.id === loggedUser.id)) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  }

  public isForbiddenUniversity(university?: University): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser && university) {
      if (loggedUser.accountType === "USER") {
        return true;
      } else if (!this.hasUniversity(university.id)) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

  public isForbiddenUser(user?: User, onlyDifferentUser: boolean = false): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser && user) {

      if (onlyDifferentUser) {
        if (user.id === loggedUser.id) {
          return true;
        }
      }

      if (loggedUser.accountType === "USER") {
        if (!(user.id === loggedUser.id)) {
          return true;
        }
      } else if (loggedUser.accountType === "MODERATOR") {
        if (user.accountType !== "USER") { // TODO: or: user.accountType === "ADMIN"
          return true;
        }
        let sameUniversity: boolean = false;
        for (const university of user.enrolledUniversities) {
          if (this.hasUniversity(university.id)) {
            sameUniversity = true;
            break;
          }
        }
        if (!sameUniversity) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  }


  public hasUniversity(universityId?: number): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser && universityId) {
      if (loggedUser.accountType === "USER" || loggedUser.accountType === "MODERATOR") {
        if (!loggedUser.enrolledUniversities.map((university) => university.id).includes(universityId)) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
