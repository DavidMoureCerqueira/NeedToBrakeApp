import { inject, Injectable } from '@angular/core';
import { DiscClean } from '../interfaces/disc/disc.clean';
import { map, Observable } from 'rxjs';
import { CarDisc } from '../interfaces/disc/car.disc';
import { HttpClient } from '@angular/common/http';
import { CarsDiscDatabase } from '../interfaces/database.responses/cars.discs.database';
import { mapperCarDiscDatabaseToCarDiscCleanArray } from '../mappers/mapCarDiscDatabaseToCarDiscClean';
import { DiscDatabase } from '../interfaces/database.responses/disc.database';

import { environment } from './../../environments/environment';
import { mapperDiscoToDatabaseSearch } from '../mappers/mapDiscToDatabaseDisc';
import { mapDiscDatabaseToDisc } from '../mappers/mapDiscDatabaseToDisc';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class DiscApiService {
  private http = inject(HttpClient);
  constructor() {}

  discByFilter(disc: DiscClean): Observable<CarDisc[]> {
    console.log(disc);
    const url = `${API_URL}/filter/disc`;
    const discBD = mapperDiscoToDatabaseSearch(disc);
    console.log(discBD);

    return this.http
      .post<CarsDiscDatabase[]>(url, discBD)
      .pipe(map((resp) => mapperCarDiscDatabaseToCarDiscCleanArray(resp)));
  }
  getDiscByID(id: number): Observable<DiscClean> {
    const url = `${API_URL}/disc/${id}`;
    return this.http.get<DiscDatabase>(url).pipe(map((resp) => mapDiscDatabaseToDisc(resp)));
  }
}
