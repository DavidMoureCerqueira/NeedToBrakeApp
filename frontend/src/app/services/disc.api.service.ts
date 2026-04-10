import { inject, Injectable } from '@angular/core';
import { DiscClean } from '../interfaces/disc.clean';
import { map, Observable } from 'rxjs';
import { CarDisc } from '../interfaces/car.disc';
import { mapperDiscoToDataBaseSearch } from '../mappers/mapDiscToDataBaseDisc';
import { HttpClient } from '@angular/common/http';
import { CarsDiscDatabase } from '../interfaces/cars.discs.database';
import { mapperCarDiscDatabaseToCarDiscCleanArray } from '../mappers/mapCarDiscDatabaseToCarDiscClean';
import { DiscDatabase } from '../interfaces/disc.database';
import { mapDiscDataBaseToDisc } from '../mappers/mapDiscDataBaseToDisc';

const API_URL = 'http://localhost:8000';
@Injectable({
  providedIn: 'root',
})
export class DiscApiService {
  private http = inject(HttpClient);
  constructor() {}
  discByFilter(disc: DiscClean): Observable<CarDisc[]> {
    const url = `${API_URL}/filter/disc`;
    const discBD = mapperDiscoToDataBaseSearch(disc);
    console.log(discBD);

    return this.http
      .post<CarsDiscDatabase[]>(url, discBD)
      .pipe(map((resp) => mapperCarDiscDatabaseToCarDiscCleanArray(resp)));
  }
  getDiscByID(id: number): Observable<DiscClean> {
    const url = `${API_URL}/disc/${id}`;
    return this.http.get<DiscDatabase>(url).pipe(map((resp) => mapDiscDataBaseToDisc(resp)));
  }
}
