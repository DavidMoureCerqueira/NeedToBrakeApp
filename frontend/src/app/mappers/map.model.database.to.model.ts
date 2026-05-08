import { Model } from '../interfaces/cars/model';
import { ModelDatabase } from '../interfaces/database.responses/model.database';

export function mapModelDatabaseToModel(model: ModelDatabase): Model {
  return {
    id: model.id,
    name: model.name,
  };
}
export function mapModelDatabaseToModelArray(models: ModelDatabase[]): Model[] {
  return models.map((model) => mapModelDatabaseToModel(model));
}
