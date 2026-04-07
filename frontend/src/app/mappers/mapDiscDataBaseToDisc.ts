import { DiscClean } from '../interfaces/disc.clean';
import { DiscDatabase } from '../interfaces/disc.database';

export function mapDiscDataBaseToDisc(disc: DiscDatabase): DiscClean {
  return {
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
