export interface UserStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  communitiesCount: number;
}

export interface UserDestination {
  country: string;
  cities: string[];
}

export interface User {
  uid: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  university: string;
  country: string;
  gender: string;
  joinedDate: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  groups?: UserDestination[];
  stats?: UserStats;
}
