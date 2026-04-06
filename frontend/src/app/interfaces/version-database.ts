import { ModelDatabase } from './model-database';

export interface VersionDatabase {
  id: number;
  name: string;
  engine: number;
  bhp: number;
  year: string;
  model_id: number;
  model: ModelDatabase;
}
