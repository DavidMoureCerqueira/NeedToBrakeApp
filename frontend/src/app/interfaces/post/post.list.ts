import { CarClean } from '../cars/car';
import { Post } from './post';
export interface PostList extends Post {
  author?: {
    id: number | undefined;
    username: string | undefined;
  };
  comment_count: number;
  car?: CarClean;
}
