import { PostFromDatabase } from './post.from.database';
import { VersionDatabase } from './version.database';

export interface PostDetailFromDatabase extends PostFromDatabase {
  // TODO actualizar cuando se implementen imagenes de perfil
  is_owner: boolean;
  comment_count: number;
  author: {
    id: number;
    username: string;
  };
  version?: VersionDatabase;
}
