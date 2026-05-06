import { CarClean } from '../cars/car';
import { Post } from './post';
export interface PostList extends Post {
  car?: CarClean;
}
