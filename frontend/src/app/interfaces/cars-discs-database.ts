import { VersionDatabase } from './version-database';

export interface CarsDiscDatabase {
  position: string;
  holes: number;
  style: string;
  diameter: number;
  height: number;
  thickness: string;
  center_bore: number;
  pcd: number;
  version_id: number;
  id: number;
  version: VersionDatabase;
}
