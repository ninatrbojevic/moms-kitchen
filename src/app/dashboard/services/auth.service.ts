import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultRequest } from '../../models/default-request';
import { AuthResponse } from '../../models/auth-response';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'https://localhost:7121/api/Authentication/';

  constructor(private http: HttpClient, private router: Router){

  }

  isLoggedIn(): boolean {
    const token = this.getAuthTokenFromLocalStorage();
    const now = Date.now().valueOf() / 1000;
    return token.exp >= now;
  }

  private getAuthTokenFromLocalStorage(): AuthResponse {
    const tokenStorageValue = localStorage.getItem("token");

    if (!tokenStorageValue) {
        this.router.navigateByUrl("/login").then();
        return new AuthResponse();
    } else {
        return jwtDecode(tokenStorageValue) as AuthResponse;
    }
  }

  login = (loginRequest: DefaultRequest) => this.http.post<AuthResponse>(this.apiUrl + 'login', loginRequest);

  logout() {
    localStorage.removeItem('token');
  }

}
