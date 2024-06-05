export type Category = {
  id: number;
  name: string;
};

export type CategoryBasic = Omit<Category, 'id'>;
