import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ModelRespAuth } from '../interfaces/modelResp';
import { AuthForm } from '../interfaces/authForm';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:8000';
  token = signal<string | null>(localStorage.getItem('token'));
  currentUser = signal<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  );

  constructor() {
    this.checkSessionValidity();
  }
  checkSessionValidity() {
    const token = this.token();
    if (!token || this.isTokenExpired(token)) {
      console.log('Token expired');
      this.logout();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = JSON.parse(atob(payloadBase64));
      const expiry = payloadJson.exp;
      const now = Math.floor(Date.now() / 1000);
      return now >= expiry;
    } catch (e) {
      return true;
    }
  }

  setSession(newToken: string, user: User) {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(user));
    this.token.set(newToken);
    this.currentUser.set(user);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token.set(null);
    this.currentUser.set(null);
  }
  isAuthenticated(): boolean {
    return !!this.token();
  }

  register(data: AuthForm) {
    return this.http.post<ModelRespAuth>(`${this.URL}/user/register`, data);
  }
  signin(data: AuthForm) {
    return this.http.post<ModelRespAuth>(`${this.URL}/user/sign-in`, data);
  }
}
