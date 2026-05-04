import { VersionDatabase } from './version.database';

export interface GarageDatabase {
  user_id: number;
  version_id: number;
  is_favourite: number;
  version: VersionDatabase;
}
