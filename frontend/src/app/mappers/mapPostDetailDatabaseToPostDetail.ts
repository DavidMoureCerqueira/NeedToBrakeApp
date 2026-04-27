import { PostDetailFromDatabase } from '../interfaces/database.responses/post.detail.from.database';
import { PostDetail } from '../interfaces/post/post.detail';
import { mapVersionCompleteToCarClean } from './mapVersionCompleteToCarClean';

export function mapPostDetailDatabaseToPostDetail(post: PostDetailFromDatabase): PostDetail {
  if (post.version) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date,
      author: {
        id: post.author.id,
        username: post.author.username,
      },
      commentCount: post.comment_count,
      isOwner: post.is_owner,
      car: mapVersionCompleteToCarClean(post.version),
    };
  }
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    date: post.date,
    author: {
      id: post.author.id,
      username: post.author.username,
    },
    commentCount: post.comment_count,
    isOwner: post.is_owner,
  };
}
