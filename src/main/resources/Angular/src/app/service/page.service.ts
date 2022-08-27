import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {universitie} from '../models/universitie';
import {page} from '../models/page';
import {User, UserForm} from '../models/user';
import {RestErrorHandler} from "../models/restError";

@Injectable({
    providedIn: 'root'
})
export class PageService {
    private mainUrl = 'http://localhost:8080/'
    private userUrl = 'http://localhost:8080/users';

    httpOptions = {
        withCredentials: true
    };

    constructor(private http: HttpClient) {
    }

    getPage(id: Number, defaultErrorHandling: boolean = true): Observable<page> {
        return this.http.get<page>(this.mainUrl + 'pages/' + id, this.httpOptions)
            .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
    }

    getPages(defaultErrorHandling: boolean = true): Observable<page[]> {
        return this.http.get<page[]>(this.mainUrl + 'pages', this.httpOptions)
            .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
    }

    getUniversitie(id: Number, defaultErrorHandling: boolean = true): Observable<universitie> {
        return this.http.get<universitie>(this.mainUrl + 'universities/' + id, this.httpOptions)
            .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
    }

    getUniversities(defaultErrorHandling: boolean = true): Observable<universitie[]> {
        return this.http.get<universitie[]>(this.mainUrl + 'universities', this.httpOptions)
            .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
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
        return this.http.post<any>(this.mainUrl + 'login', user, this.httpOptions)
            .pipe(RestErrorHandler.getErrorHandling(defaultErrorHandling));
    }
}
