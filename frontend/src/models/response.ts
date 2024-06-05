export interface ApiRespMulti<T> {
  [x: string]: any;
  data: T[];
}
  
  export type ApiRespMultiPaginated<T> = ApiRespMulti<T> & {
    pagination: Pagination;
  };
  
  export type ApiRespSingle<T> = {
    item: T;
    message?: string;
  };
  
  export type Pagination = {
    currentPage: number;
    totalPages: number;
  };
  