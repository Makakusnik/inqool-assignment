import { z } from "zod";
import { animalTypeFieldSchema, animalCreateSchema, animalSchema, animalUpdateSchema } from "@/schemas/animal";

export type AnimalType = z.infer<typeof animalTypeFieldSchema>;

export type Animal = z.infer<typeof animalSchema>;
export type AnimalList = Animal[];

export type AnimalCreate = z.infer<typeof animalCreateSchema>;
export type AnimalUpdate = z.infer<typeof animalUpdateSchema>;

export type AnimalCreateFormInput = z.input<typeof animalCreateSchema>;
export type AnimalCreateFormOutput = z.output<typeof animalCreateSchema>;

export type AnimalUpdateFormInput = z.input<typeof animalUpdateSchema>;
export type AnimalUpdateFormOutput = z.output<typeof animalUpdateSchema>;
