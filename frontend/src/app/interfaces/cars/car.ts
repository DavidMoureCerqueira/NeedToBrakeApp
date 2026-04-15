import { Brand } from './brand';
import { Model } from './model';
import { Version } from './version';

export interface CarClean {
  brand: Brand;
  model: Model;
  version: Version;
}
