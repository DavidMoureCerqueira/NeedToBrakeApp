import { ModelComplete } from './model.complete';
import { Version } from './version';

export interface VersionComplete extends Version {
  model: ModelComplete;
}
