import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequestDTO } from '../models/loginRequestDTO';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private apiUrl = 'https://localhost:44377/api/User';

  constructor(private router: Router, private http: HttpClient) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(loginForm: LoginRequestDTO): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, loginForm).pipe(
      tap((user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  isTruePassword(loginForm: LoginRequestDTO): Observable<User> {
    console.log('loginform', loginForm);
    return this.http.post<User>(`${this.apiUrl}/login`, loginForm).pipe(
      map((response) => {
        console.log('response', response as User);
        return response as User;
      })
    );
  }

  logout(): void {
    const isConfirmed = window.confirm(
      'Oturum kapatılacaktır. Onaylıyor musunuz?'
    );
    if (isConfirmed) {
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
      this.userSubject.next(null);
    }
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }
}
