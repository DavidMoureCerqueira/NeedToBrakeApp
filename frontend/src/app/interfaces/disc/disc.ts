export interface Disc {
  [key: string]: number | string;
  id: number;
  position: string;
  holes: number;
  style: string;
  diameter: number;
  height: number;
  thickness: number;
  centerBore: number;
  pcd: number;
}
