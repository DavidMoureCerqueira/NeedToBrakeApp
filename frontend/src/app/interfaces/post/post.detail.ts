import { CarClean } from '../cars/car';
import { Post } from './post';

export interface PostDetail {
  title: string;
  content: string;
  id: number;
  date: string;
  isOwner: boolean;
  commentCount: number;
  author: {
    id: number;
    username: string;
  };
  car?: CarClean;
}
