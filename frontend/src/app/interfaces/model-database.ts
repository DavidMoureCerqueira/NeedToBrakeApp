import { Brand } from './brand';

export interface ModelDatabase {
  id: number;
  name: string;
  brand_id: number;
  brand: Brand;
}
