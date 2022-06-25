export interface User {
  id: string;
  role: Role;
  name: string;
  age: number;
  ctime: Date | string;
}

export enum Role {
  ROOT = 0,
  ADMIN = 1,
  STAFF = 2,
}
