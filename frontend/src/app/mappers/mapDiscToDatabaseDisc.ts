import { Disco } from '../interfaces/disco';

export function mapperDiscoToBDSearch(disco: Disco): any {
  const searchDisc: any = {};

  if (disco.position) searchDisc.position = disco.position;
  if (disco.holes) searchDisc.holes = disco.holes;
  if (disco.style) searchDisc.style = disco.style;
  if (disco.diameter) searchDisc.diameter = disco.diameter;
  if (disco.height) searchDisc.height = disco.height;
  if (disco.thicknessNew) searchDisc.thickness = disco.thicknessNew;
  if (disco.centerbore) searchDisc.center_bore = disco.centerbore;
  if (disco.pcd) searchDisc.pcd = disco.pcd;
  console.log(searchDisc);
  return searchDisc;
}
