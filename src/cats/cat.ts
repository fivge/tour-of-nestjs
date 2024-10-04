export interface Cat {
  id: number | string;
  // readonly uid: string;
  name: string;
  age: number;
  breed?: string;
}

export type CatRequest = Omit<Cat, "id">;
