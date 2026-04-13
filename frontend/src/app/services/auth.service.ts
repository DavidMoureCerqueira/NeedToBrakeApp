import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ModelRespAuth } from '../interfaces/modelResp';
import { AuthForm } from '../interfaces/authForm';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:8000';
  token = signal<string | null>(localStorage.getItem('token'));
  currentUser = signal<string | null>(null);

  setToken(newToken: string) {
    localStorage.setItem('token', newToken);
    this.token.set(newToken);
  }
  logout() {
    localStorage.removeItem('token');
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
