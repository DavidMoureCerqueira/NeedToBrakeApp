import { PostFromDatabase } from '../interfaces/database.responses/post.from.database';
import { Post } from '../interfaces/post/post';
import { mapVersionCompleteToCarClean } from './map.version.complete.to.carclean';

export function mapPostDatabaseToPost(postDB: PostFromDatabase): Post {
  if (postDB.version) {
    return {
      content: postDB.content,
      date: postDB.date,
      id: postDB.id,
      title: postDB.title,
      car: mapVersionCompleteToCarClean(postDB.version),
      author: {
        id: postDB.author?.id,
        username: postDB.author?.username,
        urlAvatar: postDB.author?.url_avatar,
      },
      comments: postDB.comment_count,
      likes: postDB.likes_count,
      isLiked: postDB.is_liked,
    };
  } else {
    return {
      content: postDB.content,
      date: postDB.date,
      id: postDB.id,
      title: postDB.title,
      author: {
        id: postDB.author?.id,
        username: postDB.author?.username,
        urlAvatar: postDB.author?.url_avatar,
      },
      comments: postDB.comment_count,
      likes: postDB.likes_count,
      isLiked: postDB.is_liked,
    };
  }
}

export function mapPostDatabaseToPostArray(postDB: PostFromDatabase[]): Post[] {
  return postDB.map((post) => mapPostDatabaseToPost(post));
}
