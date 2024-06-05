export type User = {
    id: number;
    email: string;
    displayName: string;
    passwordHash: string;
    createdOn: string;
    role: string;
  };
  
  export type UserBasic = Omit<User, 'id' | 'createdOn'>;
  