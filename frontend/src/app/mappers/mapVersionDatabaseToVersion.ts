import { Version } from '../interfaces/cars/version';
import { VersionDatabase } from '../interfaces/database.responses/version.database';

export function mapVersionDatabaseToVersion(version: VersionDatabase): Version {
  return {
    id: version.id,
    bhp: version.bhp,
    engine: version.engine,
    name: version.name,
    year: version.year,
  };
}

export function mapVersionDatabaseToVersionArray(versions: VersionDatabase[]): Version[] {
  return versions.map((version) => mapVersionDatabaseToVersion(version));
}
