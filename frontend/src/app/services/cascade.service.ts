import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../interfaces/cars/brand';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Model } from '../interfaces/cars/model';
import { ModelDatabase } from '../interfaces/database.responses/model.database';
import { mapModelDatabaseToModelArray } from '../mappers/mapModelDatabaseToModel';
import { VersionDatabase } from '../interfaces/database.responses/version.database';
import { mapVersionDatabaseToVersionArray } from '../mappers/mapVersionDatabaseToVersion';
import { Version } from '../interfaces/cars/version';

@Injectable({
  providedIn: 'root',
})
export class CascadeService {
  constructor() {}
  private API_URL = environment.apiUrl;
  private http = inject(HttpClient);
  brands = signal<Brand[]>([]);

  getBrands(): Observable<Brand[]> {
    const URL = `${this.API_URL}/cascade/brands`;
    return this.http.get<Brand[]>(URL).pipe(
      tap((data) => this.brands.set(data)),
      catchError((err) => {
        console.error('Error loading brands', err);
        return of([]);
      }),
    );
  }
  getModels(id: number): Observable<Model[]> {
    const URL = `${this.API_URL}/cascade/models/${id}`;
    return this.http
      .get<ModelDatabase[]>(URL)
      .pipe(map((data) => mapModelDatabaseToModelArray(data)));
  }
  getVersions(id: number): Observable<Version[]> {
    const URL = `${this.API_URL}/cascade/versions/${id}`;
    return this.http
      .get<VersionDatabase[]>(URL)
      .pipe(map((data) => mapVersionDatabaseToVersionArray(data)));
  }
}
