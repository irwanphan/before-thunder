import NextAuth from 'next-auth';

export interface User {
  name: ReactNode;
  id?: number;
  code: string;
  email?: string;
  isActive: boolean;
  firstName: string;
  lastName?: string;
  dateOfBirth: Date;
  phone?: string;
  lastAccess?: Date;
  image?: string;
  addedById?: number;
  role: string;
}

declare module 'next-auth' {
  type Session = {
    user: User;
  };
}
