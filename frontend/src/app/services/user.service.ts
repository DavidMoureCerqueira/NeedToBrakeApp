import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError, Observable, EMPTY, filter, first } from 'rxjs';
import { ModelRespComplete } from '../interfaces/database.responses/modelResp';
import { REQUIRES_AUTH } from '../auth/auth.context';
import { Profile } from '../interfaces/users/profile';
import { GarageDatabase } from '../interfaces/database.responses/garage.database';
import { Garage } from '../interfaces/cars/garage';
import { mapGarageDatabaseToGarageArray } from '../mappers/map.garage.database.to.garage';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { RestCountry } from '../interfaces/restCountry';
import { Country } from '../interfaces/Country';
import { mapResCountryToCountryArray } from '../mappers/map.rest.country.to.country';
import { ProfileEdit } from './../interfaces/users/profile.edit';
import { mapProfileEditToProfileEditDatabase } from '../mappers/map.profile.to.profile.database';
import { environment } from '../../environments/environment';
import { mapProfileDatabaseToProfile } from '../mappers/map.profile.database.to.profile';
import { ProfileFromDatabase } from '../interfaces/database.responses/profile.from.database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private URL = environment.apiUrl;
  private http = inject(HttpClient);
  currentProfileId = signal<number | null>(null);
  profileResource = rxResource({
    params: () => ({ id: this.currentProfileId() }),
    stream: ({ params }) => {
      if (!params.id) return EMPTY;
      return this.getProfile(params.id.toString());
    },
  });

  getProfileResourceAsObservable(): Observable<Profile> {
    return toObservable(this.profileResource.value).pipe(
      filter((p): p is Profile => !!p),
      first(),
      catchError(() => EMPTY),
    );
  }
  getProfile(id: string): Observable<Profile> {
    console.log('Getting profile....');

    const url = `${this.URL}/user/profile/${id}`;
    return this.http
      .get<ModelRespComplete<ProfileFromDatabase>>(url, {
        context: new HttpContext().set(REQUIRES_AUTH, true),
      })
      .pipe(
        tap((data) => console.log('Recibido desde el servidor:', data)),
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error || 'Authenticate failed');
          }
          console.log('res->', res);
          return mapProfileDatabaseToProfile(res.data);
        }),
        catchError((err) => {
          console.error('Error in service', err);
          return throwError(() => err);
        }),
      );
  }
  getGarage(id: number): Observable<Garage[]> {
    const URL = `${this.URL}/garage/get-all-garage/${id}`;
    return this.http
      .get<ModelRespComplete<GarageDatabase[]>>(URL, {
        context: new HttpContext().set(REQUIRES_AUTH, true),
      })
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error);
          }
          return mapGarageDatabaseToGarageArray(res.data);
        }),
      );
  }
  addCarGarage(id: number): Observable<Garage[]> {
    const URL = `${this.URL}/garage/add`;
    return this.http
      .post<
        ModelRespComplete<GarageDatabase[]>
      >(URL, { version_id: id }, { context: new HttpContext().set(REQUIRES_AUTH, true) })
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error);
          }
          return mapGarageDatabaseToGarageArray(res.data);
        }),
      );
  }
  addCarFavourite(id: number): Observable<Garage[]> {
    const URL = `${this.URL}/garage/set-favourite`;
    return this.http
      .patch<
        ModelRespComplete<GarageDatabase[]>
      >(URL, { version_id: id }, { context: new HttpContext().set(REQUIRES_AUTH, true) })
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error);
          }
          return mapGarageDatabaseToGarageArray(res.data);
        }),
      );
  }
  removeCarFavourite(): Observable<String> {
    const URL = `${this.URL}/garage/unset-garage-fav`;
    return this.http
      .patch<
        ModelRespComplete<String>
      >(URL, {}, { context: new HttpContext().set(REQUIRES_AUTH, true) })
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error);
          }
          return res.data;
        }),
      );
  }
  addAvatar(file: File): Observable<ModelRespComplete<string>> {
    const URL = `${this.URL}/user/set-avatar`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.patch<ModelRespComplete<string>>(URL, formData, {
      context: new HttpContext().set(REQUIRES_AUTH, true),
    });
  }
  countriesResource = rxResource({
    stream: () => this.getCountries(),
  });

  getCountries(): Observable<Country[]> {
    return this.http
      .get<RestCountry[]>('https://restcountries.com/v3.1/all?fields=name,flags')
      .pipe(
        map((res) => {
          return mapResCountryToCountryArray(res);
        }),
      );
  }
  updateProfile(profileEdit: ProfileEdit): Observable<ModelRespComplete<string>> {
    const URL = `${this.URL}/user/update-profile`;
    const profileEditDatabase = mapProfileEditToProfileEditDatabase(profileEdit);
    console.log(profileEditDatabase);
    return this.http
      .patch<ModelRespComplete<string>>(URL, profileEditDatabase, {
        context: new HttpContext().set(REQUIRES_AUTH, true),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(
            () => err.error.error || err.message || 'Unexpected error updating profile',
          );
        }),
      );
  }
}
