import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { Disc } from '../interfaces/disc/disc';
import { LocalStorageData } from './types';

@Injectable({
  providedIn: 'root',
})
export class DiscoService {
  existingDiscService = signal<Disc>(this.getInitialExistingDiscValue());
  desiredDiscService = signal<Disc>(this.getInitialDesiredDiscValue());
  constructor() {
    effect(() => {
      const disc = this.existingDiscService();
      if (disc) {
        localStorage.setItem(LocalStorageData.EXISTING_DISC, JSON.stringify(disc));
      } else {
        localStorage.removeItem(LocalStorageData.EXISTING_DISC);
      }
    });
    effect(() => {
      const disc = this.desiredDiscService();
      if (disc) {
        localStorage.setItem(LocalStorageData.DESIRED_DISC, JSON.stringify(disc));
      } else {
        localStorage.removeItem(LocalStorageData.DESIRED_DISC);
      }
    });
  }

  private getInitialExistingDiscValue(): Disc {
    const discString = localStorage.getItem(LocalStorageData.EXISTING_DISC);
    try {
      return discString ? JSON.parse(discString) : ({} as Disc);
    } catch {
      return {} as Disc;
    }
  }
  private getInitialDesiredDiscValue(): Disc {
    const discString = localStorage.getItem(LocalStorageData.DESIRED_DISC);
    try {
      return discString ? JSON.parse(discString) : ({} as Disc);
    } catch {
      return {} as Disc;
    }
  }

  matchDiscs(discoExistente: Disc, discoDeseado: Partial<Disc>) {
    const discoModificado: Disc = { ...discoExistente };
    (Object.entries(discoDeseado) as [keyof Disc, string | number][]).forEach(([key, valor]) => {
      if (valor != 0 && valor !== null && valor !== undefined && valor !== '') {
        discoModificado[key] = valor;
      }
    });
    return discoModificado;
  }
  saveExistingDisc(disc: Disc) {
    this.existingDiscService.set(disc);
  }
  saveDesiredDisc(disc: Disc) {
    this.desiredDiscService.set(disc);
  }

  getExistingDisc(): Disc {
    return this.existingDiscService();
  }
  getResiredDisc(): Disc {
    return this.desiredDiscService();
  }
}
