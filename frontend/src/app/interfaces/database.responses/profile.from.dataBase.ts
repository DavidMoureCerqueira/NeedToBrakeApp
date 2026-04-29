export interface ProfileFromDatabase {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  is_owner: boolean;
  country: string;
  city: string;
  fav_circuit: string;
  fav_pads: string;
  cars: number;
  posts: number;
  comments: number;
  url_avatar: string;
}
