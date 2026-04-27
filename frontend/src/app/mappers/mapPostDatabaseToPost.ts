import { PostFromDatabase } from '../interfaces/database.responses/post.from.database';
import { Post } from '../interfaces/post/post';

export function mapPostDatabaseToPost(postDB: PostFromDatabase): Post {
  return {
    content: postDB.content,
    date: postDB.date,
    id: postDB.id,
    title: postDB.title,
    userId: postDB.user_id,
    versionId: postDB.version_id,
  };
}

export function mapPostDatabaseToPostArray(postDB: PostFromDatabase[]): Post[] {
  return postDB.map((post) => mapPostDatabaseToPost(post));
}
