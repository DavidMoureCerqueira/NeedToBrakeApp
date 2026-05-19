import { CarClean } from '../cars/car';

export interface Post {
  title: string;
  content: string;
  author?: {
    id?: number;
    username?: string;
    urlAvatar?: string;
  };
  userId?: number;
  id: number;
  date: string;
  car?: CarClean;
  comments: number;
  likes?: number;
  isLiked?: boolean;
}
