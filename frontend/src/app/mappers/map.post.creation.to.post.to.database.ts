import { PostToDatabase } from '../interfaces/database.request/post.for.database';
import { postCreation } from '../interfaces/post/post.creation';

export function mapPostCreationToPostToDatabase(post: postCreation): PostToDatabase {
  return {
    content: post.content,
    title: post.title,
    version_id: post.versionId,
  };
}
