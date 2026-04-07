import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CarsDiscDatabase } from '../interfaces/cars.discs.database';
import { CarDisc } from '../interfaces/car.disc';
import { mapperDiscoToBDSearch } from '../mappers/mapDiscToDatabaseDisc';
import { mapperCarDiscDatabaseToCarDiscCleanArray } from '../mappers/mapCarDiscDatabaseToCarDiscClean';

import { DiscClean } from '../interfaces/disc.clean';
import { DiscDatabase } from '../interfaces/disc.database';
import { mapDiscDataBaseToDisc } from '../mappers/mapDiscDatabaseToDisc';

const API_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class DiscoService {
  private http = inject(HttpClient);

  constructor() {}

  discByFilter(disc: DiscClean): Observable<CarDisc[]> {
    const url = `${API_URL}/filter/disc`;
    const discBD = mapperDiscoToBDSearch(disc);
    console.log(discBD);

    return this.http
      .post<CarsDiscDatabase[]>(url, discBD)
      .pipe(map((resp) => mapperCarDiscDatabaseToCarDiscCleanArray(resp)));
  }
  getDiscByID(id: number): Observable<DiscClean> {
    const url = `${API_URL}/disc/${id}`;
    return this.http.get<DiscDatabase>(url).pipe(map((resp) => mapDiscDataBaseToDisc(resp)));
  }

  matchDiscs(discoExistente: DiscClean, discoDeseado: Partial<DiscClean>) {
    const discoModificado: DiscClean = { ...discoExistente };
    (Object.entries(discoDeseado) as [keyof DiscClean, string | number][]).forEach(
      ([key, valor]) => {
        if (valor != 0) {
          discoModificado[key] = valor;
        }
      },
    );
    return discoModificado;
  }
}
