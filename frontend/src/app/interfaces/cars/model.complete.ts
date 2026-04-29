import { Brand } from './brand';
import { Model } from './model';

export interface ModelComplete extends Model {
  brand: Brand;
}
