import { inject, Injectable, signal } from '@angular/core';
import { Disc } from '../interfaces/disc/disc';
import { catchError, map, Observable, of } from 'rxjs';
import { CarDisc } from '../interfaces/disc/car.disc';
import { HttpClient } from '@angular/common/http';
import { CarsDiscDatabase } from '../interfaces/database.responses/cars.discs.database';
import { DiscDatabase } from '../interfaces/database.responses/disc.database';
import { environment } from './../../environments/environment';
import { mapperDiscoToDatabaseSearch } from '../mappers/map.disc.to.database.disc';
import { mapperCarDiscDatabaseToCarDiscArray } from '../mappers/map.car.disc.database.to.car.disc';
import { mapDiscDatabaseToDisc } from '../mappers/map.disc.database.to.disc';
import { rxResource } from '@angular/core/rxjs-interop';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class DiscApiService {
  private http = inject(HttpClient);
  desiredDisc = signal<Disc>({} as Disc);

  constructor() {}

  discByFilter(disc: Disc): Observable<CarDisc[]> {
    console.log(disc);
    const url = `${API_URL}/filter/disc`;
    const discBD = mapperDiscoToDatabaseSearch(disc);
    console.log(discBD);

    return this.http
      .post<CarsDiscDatabase[]>(url, discBD)
      .pipe(map((resp) => mapperCarDiscDatabaseToCarDiscArray(resp)));
  }

  filteredDiscResource = rxResource<CarDisc[], { disc: Disc }>({
    defaultValue: [] as CarDisc[],
    params: () => ({
      disc: this.desiredDisc(),
    }),
    stream: ({ params }) => {
      if (this.hasAnyValue(params.disc)) {
        return of([]);
      }

      return this.discByFilter(params.disc);
    },
  });

  hasAnyValue(disc: Disc): boolean {
    return Object.values(disc).every(
      (param) => param === undefined || param === null || param === 0 || param === '',
    );
  }

  getDiscByID(id: number): Observable<Disc> {
    const url = `${API_URL}/disc/${id}`;
    return this.http.get<DiscDatabase>(url).pipe(map((resp) => mapDiscDatabaseToDisc(resp)));
  }
  getDiscsByVersionID(id: number): Observable<CarDisc[]> {
    const url = `${API_URL}/parent-selector/disc-by-version/${id}`;
    return this.http
      .get<CarsDiscDatabase[]>(url)
      .pipe(map((res) => mapperCarDiscDatabaseToCarDiscArray(res)));
  }
}
