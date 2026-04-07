import { DiscClean } from '../interfaces/disc.clean';

export function mapperDiscoToDataBaseSearch(disco: DiscClean): any {
  const searchDisc: any = {};

  if (disco.position) searchDisc.position = disco.position;
  if (disco.holes) searchDisc.holes = disco.holes;
  if (disco.style) searchDisc.style = disco.style;
  if (disco.diameter) searchDisc.diameter = disco.diameter;
  if (disco.height) searchDisc.height = disco.height;
  if (disco.thickness) searchDisc.thickness = disco.thickness;
  if (disco.centerBore) searchDisc.center_bore = disco.centerBore;
  if (disco.pcd) searchDisc.pcd = disco.pcd;

  return searchDisc;
}
