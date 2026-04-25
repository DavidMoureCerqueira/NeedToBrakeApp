import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap, throwError, Observable } from 'rxjs';
import { mapProfileDataBaseToProfile } from '../mappers/mapProfileDataBaseToProfile';
import { ModelRespComplete } from '../interfaces/database.responses/modelResp';
import { REQUIRES_AUTH } from '../auth/auth.context';
import { Profile } from '../interfaces/users/profile';
import { environment } from '../../environments/environment';
import { ProfileFromDataBase } from '../interfaces/database.responses/profileFromDataBase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private URL = environment.apiUrl;
  private http = inject(HttpClient);

  getProfile(id: string): Observable<Profile> {
    console.log('Getting profile....');

    const url = `${this.URL}/user/profile/${id}`;
    return this.http
      .get<ModelRespComplete<ProfileFromDataBase>>(url, {
        context: new HttpContext().set(REQUIRES_AUTH, true),
      })
      .pipe(
        tap((data) => console.log('Recibido desde el servidor:', data)),
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error || 'Authenticate failed');
          }
          console.log('res->', res);
          return mapProfileDataBaseToProfile(res.data);
        }),
        catchError((err) => {
          console.error('Error in service', err);
          return throwError(() => err);
        }),
      );
  }
}
