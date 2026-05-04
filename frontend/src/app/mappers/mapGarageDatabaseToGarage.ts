import { Garage } from '../interfaces/cars/garage';
import { GarageDatabase } from '../interfaces/database.responses/garage.database';
import { mapVersionCompleteToCarClean } from './mapVersionCompleteToCarClean';

export function mapGarageDatabaseToGarage(garageItem: GarageDatabase): Garage {
  return {
    userId: garageItem.user_id,
    isFavourite: garageItem.is_favourite,
    car: mapVersionCompleteToCarClean(garageItem.version),
  };
}

export function mapGarageDatabaseToGarageArray(garage: GarageDatabase[]): Garage[] {
  return garage.map((garageItem) => mapGarageDatabaseToGarage(garageItem));
}
