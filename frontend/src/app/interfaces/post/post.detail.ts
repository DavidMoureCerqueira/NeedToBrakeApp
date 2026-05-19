import { CarClean } from '../cars/car';

export interface PostDetail {
  title: string;
  content: string;
  id: number;
  date: string;
  isOwner: boolean;
  commentCount: number;
  author?: {
    id: number | undefined;
    username: string | undefined;
    urlAvatar: string | undefined;
  };
  car?: CarClean;
  likes?: number;
  isLiked?: boolean;
}
