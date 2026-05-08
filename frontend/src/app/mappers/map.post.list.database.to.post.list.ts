import { PostListDatabase } from '../interfaces/database.responses/post.list.from.database';
import { PostList } from '../interfaces/post/post.list';
import { mapVersionCompleteToCarClean } from './map.version.complete.to.carclean';

export function mapPostListDatabaseToPostList(postDB: PostListDatabase): PostList {
  if (postDB.version) {
    return {
      content: postDB.content,
      date: postDB.date,
      id: postDB.id,
      title: postDB.title,
      userId: postDB.user_id,
      author: {
        id: postDB.author?.id,
        username: postDB.author?.username,
      },
      comments: postDB.comment_count,
      car: mapVersionCompleteToCarClean(postDB.version),
    };
  }
  return {
    content: postDB.content,
    date: postDB.date,
    id: postDB.id,
    title: postDB.title,
    userId: postDB.user_id,
    author: {
      id: postDB.author?.id,
      username: postDB.author?.username,
    },
    comments: postDB.comment_count,
  };
}
export function mapPostListDatabaseToPostListArray(postsDB: PostListDatabase[]): PostList[] {
  return postsDB.map((postDB) => mapPostListDatabaseToPostList(postDB));
}
