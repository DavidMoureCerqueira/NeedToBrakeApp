import { ProfileFromDatabase } from '../interfaces/database.responses/profile.from.dataBase';
import { Profile } from '../interfaces/users/profile';
export function mapProfileDatabaseToProfile(user: ProfileFromDatabase): Profile {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.is_admin,
    isOwner: user.is_owner,
    city: user.city,
    country: user.country,
    favPads: user.fav_pads,
    favCircuit: user.fav_circuit,
    numCars: user.cars,
    numComments: user.comments,
    numPosts: user.posts,
    urlAvatar: user.url_avatar,
  };
}
