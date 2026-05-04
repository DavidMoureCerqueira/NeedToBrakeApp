import { CarClean } from './car';
import { VersionComplete } from './version.complete';

export interface Garage {
  userId: number;
  isFavourite: number;
  car: CarClean;
}
