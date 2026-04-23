export interface Profile {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  isOwner: boolean;
  country: string;
  city: string;
  favCircuit: string;
  numCars: number;
  numPosts: number;
  numComments: number;
  driverSkill: string;
}
