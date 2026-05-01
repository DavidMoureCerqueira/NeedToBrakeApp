import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { Disc } from '../interfaces/disc/disc';
import { LocalStorageData } from './types';

@Injectable({
  providedIn: 'root',
})
export class DiscoService {
  existingDiscService = signal<Disc | null>(this.getInitialValue());
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

  private getInitialValue(): Disc | null {
    const discString = localStorage.getItem(LocalStorageData.EXISTING_DISC);
    try {
      return discString ? JSON.parse(discString) : null;
    } catch {
      return null;
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

  getExistingDisc(): Disc | null {
    return this.existingDiscService();
  }
}
