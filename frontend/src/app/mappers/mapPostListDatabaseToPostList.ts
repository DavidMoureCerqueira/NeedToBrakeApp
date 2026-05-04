import { PostListDatabase } from '../interfaces/database.responses/post.list.from.database';
import { PostList } from '../interfaces/post/post.list';

export function mapPostListDatabaseToPostList(postDB: PostListDatabase): PostList {
  return {
    content: postDB.content,
    date: postDB.date,
    id: postDB.id,
    title: postDB.title,
    userId: postDB.user_id,
    versionId: postDB.version_id,
    author: {
      id: postDB.author?.id,
      username: postDB.author?.username,
    },
    comment_count: postDB.comment_count,
  };
}
export function mapPostListDatabaseToPostListArray(postsDB: PostListDatabase[]): PostList[] {
  return postsDB.map((postDB) => mapPostListDatabaseToPostList(postDB));
}
