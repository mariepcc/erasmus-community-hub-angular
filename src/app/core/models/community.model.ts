export interface Country {
  code: string;
  name: string;
  flag: string;
  cities: City[];
  isExpanded?: boolean;
}

export interface City {
  id: string;
  name: string;
  country: string;
  memberCount: number;
  description?: string;
}