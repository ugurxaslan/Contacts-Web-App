import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddUserRequestDTO } from '../models/addUserRequestDTO';
import { User } from '../models/user';
import { LoginRequestDTO } from '../models/loginRequestDTO';

@Injectable({
  providedIn: 'root',
}) //one instance
export class UserService {
  private apiUrl = 'https://localhost:44377/api/User';

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  addUser(userDTO: AddUserRequestDTO): Observable<User> {
    return this.http.post<User>(this.apiUrl, userDTO);
  }
  deleteUser(userId: string): Observable<boolean> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }
  updateUser(userId: string, userDTO: AddUserRequestDTO): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userDTO);
  }
}
