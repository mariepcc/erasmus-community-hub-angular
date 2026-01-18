export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  university: string;
  country: string;
  city: string;
  bio?: string;
  isOnline?: boolean;
}