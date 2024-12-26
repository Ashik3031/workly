export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
  }
  
  export type Role = 'admin' | 'super-admin' | 'user';
  