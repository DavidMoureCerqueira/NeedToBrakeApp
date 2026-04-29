export interface ProfileFromDatabase {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  is_owner: boolean;
  country: string;
  fav_circuite: string;
  city: string;
  cars: number;
  posts: number;
  comments: number;
  driver_skill: string;
}
