import { computed, Injectable, InjectionToken, Signal, signal } from '@angular/core';
import { CarClean } from '../interfaces/cars/car';

export const DISC_CONTEXT = new InjectionToken<'desired' | 'existing'>('DISC_CONTEXT');

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}
  private cars = signal<Record<'desired' | 'existing', CarClean>>({
    desired: {} as CarClean,
    existing: {} as CarClean,
  });

  saveCar(type: 'desired' | 'existing', car: CarClean = {} as CarClean) {
    this.cars.update((state) => ({ ...state, [type]: car }));
    console.log('Guardado:', this.cars());
  }

  getCar(type: 'desired' | 'existing'): Signal<CarClean> {
    return computed(() => this.cars()[type]);
  }

  resetCar(type: 'desired' | 'existing') {
    this.saveCar(type, {} as CarClean);
  }

  matchCars() {
    const existingCar = this.cars().existing;
    this.cars.update((state) => ({
      ...state,
      desired: existingCar,
    }));
  }
}
