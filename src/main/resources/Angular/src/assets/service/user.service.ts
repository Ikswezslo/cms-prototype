import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserForm} from '../models/user';
import {University} from "../models/university";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  public loggedUser!: User;

  httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
  }

  getUser(id: Number, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getUsers(defaultErrorHandling: boolean = true): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  createUser(user: UserForm, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  editUser(id: Number, user: UserForm, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, user, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  login(user: { username: string, password: string }, defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  logout(defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.get<any>('http://localhost:8080/logout', this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  getLoggedUser(defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.get<any>(this.userUrl + '/logged', this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserEnabledField(id: Number, enabled: boolean, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/enabled`, enabled, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  addUniversityToUser(id: Number, university: University, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/${id}/universities`, university.id, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserPasswordField(id: Number, passwords: { oldPassword: string, newPassword: string },
                          defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/password`, passwords, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserUsernameField(id: Number, username: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/username`, username, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserAccountTypeField(id: Number, accountType: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/accountType`, {accountType: accountType}, this.httpOptions)
      .pipe(this.errorHandler.getErrorHandling(defaultErrorHandling));
  }
}
