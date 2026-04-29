import { CommentFromDatabase } from '../interfaces/database.responses/comment.from.database';
import { Comment } from '../interfaces/post/comment';

export function mapCommentDatabaseToComment(comment: CommentFromDatabase): Comment {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.created_at,
    author: {
      id: comment.author.id,
      username: comment.author.username,
    },
  };
}
export function mapCommentDatabaseToCommentArray(comments: CommentFromDatabase[]): Comment[] {
  return comments.map((comment) => mapCommentDatabaseToComment(comment));
}
