import { HttpClient, HttpParams } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CarsDiscDatabase } from '../interfaces/cars.discs.database';
import { CarDisc } from '../interfaces/car.disc';
import { mapperCarDiscDatabaseToCarDiscCleanArray } from '../mappers/mapCarDiscDatabaseToCarDiscClean';
import { DiscClean } from '../interfaces/disc.clean';
import { DiscDatabase } from '../interfaces/disc.database';
import { mapperDiscoToDataBaseSearch } from './../mappers/mapDiscToDataBaseDisc';
import { mapDiscDataBaseToDisc } from './../mappers/mapDiscDataBaseToDisc';
import { LocalStorageData } from './types';

@Injectable({
  providedIn: 'root',
})
export class DiscoService {
  existingDiscService = signal<DiscClean | null>(this.getInitialValue());
  constructor() {
    effect(() => {
      const disc = this.existingDiscService();
      if (disc) {
        localStorage.setItem(LocalStorageData.EXISTING_DISC, JSON.stringify(disc));
      } else {
        localStorage.removeItem(LocalStorageData.EXISTING_DISC);
      }
    });
  }

  private getInitialValue(): DiscClean | null {
    const discString = localStorage.getItem(LocalStorageData.EXISTING_DISC);
    try {
      return discString ? JSON.parse(discString) : null;
    } catch {
      return null;
    }
  }

  matchDiscs(discoExistente: DiscClean, discoDeseado: Partial<DiscClean>) {
    const discoModificado: DiscClean = { ...discoExistente };
    (Object.entries(discoDeseado) as [keyof DiscClean, string | number][]).forEach(
      ([key, valor]) => {
        if (valor != 0 && valor !== null && valor !== undefined && valor !== '') {
          discoModificado[key] = valor;
        }
      },
    );
    return discoModificado;
  }
  saveExistingDisc(disc: DiscClean) {
    this.existingDiscService.set(disc);
  }

  getExistingDisc(): DiscClean | null {
    return this.existingDiscService();
  }
}
