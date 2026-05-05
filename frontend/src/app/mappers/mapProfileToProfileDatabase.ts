import { ProfileEditForDatabase } from '../interfaces/database.request/profile.edit.for.database';
import { ProfileEdit } from '../interfaces/users/profile.edit';

export function mapProfileEditToProfileEditDatabase(
  profileEdit: ProfileEdit,
): ProfileEditForDatabase {
  return {
    country: profileEdit.country,
    flag: profileEdit.flag,
    fav_pads: profileEdit.favPads,
    fav_circuit: profileEdit.favCircuit,
  };
}
