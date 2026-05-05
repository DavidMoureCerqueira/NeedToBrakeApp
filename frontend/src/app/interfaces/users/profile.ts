export interface Profile {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  isOwner: boolean;
  country: string;
  flag: string;
  favCircuit: string;
  favPads: string;
  numCars: number;
  numPosts: number;
  numComments: number;
  urlAvatar: string;
}
