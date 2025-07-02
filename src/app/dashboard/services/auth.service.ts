import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultRequest } from '../../models/default-request';
import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'https://localhost:7121/api/Authentication/';

  constructor(private http: HttpClient){

  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login = (loginRequest: DefaultRequest) => this.http.post<AuthResponse>(this.apiUrl + 'login', loginRequest);

  logout() {
    localStorage.removeItem('token');
  }
}
