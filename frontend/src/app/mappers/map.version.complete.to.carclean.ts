import { CarClean } from '../interfaces/cars/car';
import { VersionComplete } from '../interfaces/cars/version.complete';

export function mapVersionCompleteToCarClean(version: VersionComplete): CarClean {
  return {
    brand: {
      id: version.model.brand.id,
      name: version.model.brand.name,
    },
    model: {
      id: version.model.id,
      name: version.model.name,
    },
    version: {
      id: version.id,
      name: version.name,
      engine: version.engine,
      bhp: version.bhp,
      year: version.year,
    },
  };
}
