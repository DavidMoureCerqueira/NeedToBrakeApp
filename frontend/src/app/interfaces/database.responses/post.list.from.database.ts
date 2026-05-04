import { PostFromDatabase } from './post.from.database';

export interface PostListDatabase extends PostFromDatabase {
  author?: {
    id: number;
    username: string;
  };
  comment_count: number;
}
