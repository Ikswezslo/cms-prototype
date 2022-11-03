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
      switch (loggedUser.accountType) {
        case "ADMIN":
          return false
        case "MODERATOR":
          return !this.hasUniversity(page.university.id);
        case "USER":
          return page.creator.id !== loggedUser.id && !this.hasUniversity(page.university.id);
      }
    }

    return true;
  }

  public isForbiddenUniversity(university?: University): boolean {
    let loggedUser: User | null = this.userService.loggedUser;

    if (loggedUser && university) {
      switch (loggedUser.accountType) {
        case "ADMIN":
          return false
        case "MODERATOR":
          return !this.hasUniversity(university.id);
        case "USER":
          return true;
      }
    }

    return true;
  }


  public isForbiddenUser(user?: User, onlyDifferentUser: boolean = false): boolean {
    let loggedUser: User | null = this.userService.loggedUser;

    if (loggedUser && user) {
      if (onlyDifferentUser && loggedUser.id === user.id) {
        return true;
      }

      switch (loggedUser.accountType) {
        case "ADMIN":
          return false
        case "MODERATOR":
          return loggedUser.id !== user.id &&
            (!this.hasLoggedUserHigherRole(user.accountType) ||
            !this.hasUniversityFromList(user.enrolledUniversities.map((university) => university.id)));
        case "USER":
          return loggedUser.id !== user.id;
      }
    }


    return true;
  }


  public hasRole(role?: string): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser && role) {
      switch (role) {
        case "ADMIN":
          return loggedUser.accountType === "ADMIN";
        case "MODERATOR":
          return loggedUser.accountType === "MODERATOR" || loggedUser.accountType === "ADMIN";
        case "USER":
          return true;
      }
    }
    return false;
  }

  public hasUniversityFromList(universities: number[]): boolean {
    let loggedUser: User | null = this.userService.loggedUser;

    if (loggedUser) {
      let sameUniversity: boolean = false;
      for (const university of universities) {
        if (loggedUser.enrolledUniversities.map((university) => university.id).includes(university)) {
          sameUniversity = true;
          break;
        }
      }
      return loggedUser.accountType === "ADMIN" || sameUniversity;
    }
    return false;
  }


  public hasUniversity(universityId?: number): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser && universityId) {
      return loggedUser.accountType === "ADMIN" ||
        loggedUser.enrolledUniversities.map((university) => university.id).includes(universityId)
    }
    return false;
  }


  public hasUserHigherRole(userRole: string, role: string): boolean {
    switch (role) {
      case "ADMIN":
      case "MODERATOR":
        return userRole === "ADMIN";
      case "USER":
        return userRole === "ADMIN" || userRole === "MODERATOR";
    }
    return false;
  }

  public hasLoggedUserHigherRole(role: string): boolean {
    let loggedUser: User | null = this.userService.loggedUser;
    if (loggedUser) {
      return this.hasUserHigherRole(loggedUser.accountType, role)
    }
    return false;
  }
}
