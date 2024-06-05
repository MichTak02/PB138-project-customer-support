export type Customer = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
  };
  
  export type CustomerBasic = Omit<Customer, 'id'>;
  