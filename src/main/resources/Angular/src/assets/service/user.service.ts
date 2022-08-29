import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserForm} from '../models/user';
import {RestErrorHandler} from "../models/restError";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

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

  login(user: { username: string, password: string }, defaultErrorHandling: boolean = true): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user, this.httpOptions)
      .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
  }
}
