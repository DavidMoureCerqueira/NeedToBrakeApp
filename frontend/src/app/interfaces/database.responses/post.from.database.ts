import { VersionDatabase } from './version.database';

export interface PostFromDatabase {
  title: string;
  content: string;
  user_id?: number;
  version_id?: number;
  id: number;
  author?: {
    id: number;
    url_avatar: string;
    username: string;
  };
  date: string;
  version?: VersionDatabase;
  comment_count: number;
  likes_count?: number;
  is_liked?: boolean;
}
