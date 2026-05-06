import { Disc } from '../interfaces/disc/disc';
import { DiscDatabase } from '../interfaces/database.responses/disc.database';

export function mapDiscDataBaseToDisc(disc: DiscDatabase): Disc {
  return {
    id: disc.id,
    position: disc.position,
    holes: disc.holes,
    centerBore: disc.center_bore,
    diameter: disc.diameter,
    height: disc.height,
    pcd: disc.pcd,
    style: disc.style,
    thickness: disc.thickness,
  };
}
