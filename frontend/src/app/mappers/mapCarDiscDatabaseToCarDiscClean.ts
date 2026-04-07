import { CarDisc } from '../interfaces/car-disc';
import { CarsDiscDatabase } from '../interfaces/cars.discs.database';

export function mapperCarDiscDatabaseToCarDiscClean(db: CarsDiscDatabase): CarDisc {
  const car = {
    brand: {
      id: db.version.model.brand.id,
      name: db.version.model.brand.name,
    },
    model: {
      id: db.version.model.id,
      name: db.version.model.name,
    },
    version: {
      id: db.version.id,
      name: db.version.name,
      engine: db.version.engine,
      bhp: db.version.bhp,
      year: db.version.year,
    },
  };
  const disc = {
    position: db.position,
    holes: db.holes,
    style: db.style,
    diameter: db.diameter,
    height: db.height,
    thickness: db.thickness,
    centerBore: db.center_bore,
    pcd: db.pcd,
  };
  return { car, disc };
}
export function mapperCarDiscDatabaseToCarDiscCleanArray(data: CarsDiscDatabase[]): CarDisc[] {
  return data.map((singleData) => mapperCarDiscDatabaseToCarDiscClean(singleData));
}
