import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap, throwError, Observable } from 'rxjs';
import { mapUserDataBaseToUser } from '../mappers/mapUserDataBaseToUserDataBase';
import { SessionData } from '../interfaces/auth/session.data';
import { User } from '../interfaces/users/user';
import { UserResp } from '../interfaces/database.responses/modelResp';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private URL = 'http://localhost:8000';
  http = inject(HttpClient);

  getProfile(): Observable<User> {
    console.log('Getting profile....');

    const url = `${this.URL}/user/profile`;
    return this.http.get<UserResp>(url).pipe(
      tap((data) => console.log('Recibido desde el servidor:', data)),
      map((res) => {
        if (!res.success || !res.data) {
          throw new Error(res.error || 'Authenticate failed');
        }
        console.log('res->', res);
        return mapUserDataBaseToUser(res.data);
      }),
      catchError((err) => {
        console.error('Error in service', err);
        return throwError(() => err);
      }),
    );
  }
}
