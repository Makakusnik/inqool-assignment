import { z } from "zod";
import {
  animalTypeFieldSchema,
  animalCreateSchema,
  animalSchema,
  animalUpdateSchema,
} from "@/schemas/animal";

export type AnimalType = z.infer<typeof animalTypeFieldSchema>;

export type Animal = z.infer<typeof animalSchema>;
export type AnimalList = Animal[];

export type AnimalCreate = z.infer<typeof animalCreateSchema>;
export type AnimalUpdate = z.infer<typeof animalUpdateSchema>;
