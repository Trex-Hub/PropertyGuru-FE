export interface MenuItem {
  id: number;
  name: string;
  href: string;
}

export enum ResponseStatusEnum {
  SUCCESS = 200,
  ERROR = 400,
  UNAUTHORIZED = 401,
}
