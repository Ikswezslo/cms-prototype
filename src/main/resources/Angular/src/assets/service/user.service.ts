import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserForm} from '../models/user';
import {RestErrorHandler} from "../models/restError";
import {University} from "../models/university";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  public loggedUser!: User;

  httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  getUser(id: Number, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getUsers(defaultErrorHandling: boolean = true): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  createUser(user: UserForm, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  editUser(id: Number, user: UserForm, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, user, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  login(user: { username: string, password: string }, defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }


  logout(defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.get<any>('http://localhost:8080/logout', this.httpOptions)
        .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  getLoggedUser(defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.get<any>(this.userUrl + '/logged', this.httpOptions)
        .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserEnabledField(id: Number, enabled: boolean, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/enabled`, enabled, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  addUniversityToUser(id: Number, university: University, defaultErrorHandling: boolean = true): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}/universities`, university.id, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserPasswordField(id: Number, passwords: { oldPassword: string, newPassword: string },
                          defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/password`, passwords, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }

  modifyUserUsernameField(id: Number, username: string, defaultErrorHandling: boolean = true): Observable<void> {
    return this.http.patch<void>(`${this.userUrl}/${id}/username`, username, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
}
