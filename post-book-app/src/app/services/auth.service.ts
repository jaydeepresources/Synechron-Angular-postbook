import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User
  isLoggedIn: boolean

  userSubject: Subject<User>
  user$: Observable<User>

  constructor(public http: HttpClient) {
    this.user = new User(0, '', '', '')
    this.isLoggedIn = false
    this.userSubject = new Subject<User>()
    this.user$ = this.userSubject.asObservable()
  }

  public signIn(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8081/users/signin', user)
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8081/users/add', user)
  }

}