export interface Profile {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  isOwner: boolean;
  country: string;
  city: string;
  favCircuit: string;
  favPads: string;
  numCars: number;
  numPosts: number;
  numComments: number;
  urlAvatar: string;
}
