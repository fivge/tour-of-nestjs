import { z } from "zod";
import { IsString, IsInt } from "class-validator";

export interface Cat {
  id: string;
  name: string;
  age: number;
  breed?: string;
}

export interface CatDO extends Cat {
  uid: number;

  valid: boolean;
}

export const createCatSchema = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string().optional(),
});

export type CreateCatDto = z.infer<typeof createCatSchema>;

export class CreateCatDto2 {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed?: string;
}

// export type CreateCatDto = Omit<Cat, "id">;

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }
