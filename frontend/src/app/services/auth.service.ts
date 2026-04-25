import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DataRespDatabase, ModelRespComplete } from '../interfaces/database.responses/modelResp';
import { AuthForm } from '../interfaces/auth/authForm';
import { User } from '../interfaces/users/user';
import { UserForDataBase } from '../interfaces/database.request/user.for.database';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { mapProfileDataBaseToProfile } from '../mappers/mapProfileDataBaseToProfile';
import { SessionData } from '../interfaces/auth/session.data';
import { mapUserDataBaseToUser } from '../mappers/mapUserDataBaseToUserDataBase';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private URL = environment.apiUrl;
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

  register(data: UserForDataBase): Observable<SessionData> {
    return this.http
      .post<ModelRespComplete<DataRespDatabase>>(`${this.URL}/user/register`, data)
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error || 'Authenticate failed');
          }
          return {
            token: res.data!.token,
            user: mapUserDataBaseToUser(res.data!.user),
          };
        }),
      );
  }
  signin(data: AuthForm): Observable<SessionData> {
    return this.http
      .post<ModelRespComplete<DataRespDatabase>>(`${this.URL}/user/sign-in`, data)
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error || 'Authenticate failed');
          }
          return {
            token: res.data!.token,
            user: mapUserDataBaseToUser(res.data!.user),
          };
        }),
      );
  }
  get currentUserId(): number | null {
    const user = this.currentUser();
    return user ? user.id : null;
  }
}
