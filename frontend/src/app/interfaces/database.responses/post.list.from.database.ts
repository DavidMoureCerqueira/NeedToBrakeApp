import { PostFromDatabase } from './post.from.database';
import { VersionDatabase } from './version.database';

export interface PostListDatabase extends PostFromDatabase {
  comment_count: number;
  version?: VersionDatabase;
}
