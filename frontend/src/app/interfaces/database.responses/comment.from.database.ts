export interface CommentFromDatabase {
  id: number;
  content: string;
  created_at: string;
  author: {
    id: number;
    username: string;
  };
}
