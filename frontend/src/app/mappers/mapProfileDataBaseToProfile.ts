import { ProfileFromDataBase } from '../interfaces/database.responses/profile.from.dataBase';
import { Profile } from '../interfaces/users/profile';
export function mapProfileDataBaseToProfile(user: ProfileFromDataBase): Profile {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.is_admin,
    isOwner: user.is_owner,
    city: user.city,
    country: user.country,
    driverSkill: user.driver_skill,
    favCircuit: user.fav_circuite,
    numCars: user.cars,
    numComments: user.comments,
    numPosts: user.posts,
  };
}
