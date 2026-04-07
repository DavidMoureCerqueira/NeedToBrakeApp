import { HttpClient, HttpParams } from '@angular/common/http';
import { Disc } from '../interfaces/disco';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarsDiscDatabase } from '../interfaces/cars.discs.database';
import { CarDisc } from '../interfaces/car-disc';
import { mapperDiscoToBDSearch } from '../mappers/mapDiscToDatabaseDisc';
import { mapperCarDiscDatabaseToCarDiscCleanArray } from '../mappers/mapCarDiscDatabaseToCarDiscClean';
import { log } from 'console';

const API_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class DiscoService {
  private http = inject(HttpClient);

  constructor() {}

  buscarPorMedidas(disco: Disc): Observable<CarDisc[]> {
    const url = `${API_URL}/filter/disc`;
    const discBD = mapperDiscoToBDSearch(disco);
    console.log(discBD);

    return this.http
      .post<CarsDiscDatabase[]>(url, discBD)
      .pipe(map((resp) => mapperCarDiscDatabaseToCarDiscCleanArray(resp)));
  }
  igualarDatos(discoExistente: Disc, discoDeseado: Partial<Disc>) {
    const discoModificado: Disc = { ...discoExistente };
    (Object.entries(discoDeseado) as [keyof Disc, string | number][]).forEach(([key, valor]) => {
      if (valor != 0) {
        discoModificado[key] = valor;
      }
    });
    return discoModificado;
  }
}
