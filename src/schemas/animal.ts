import { z } from "zod";

export const animalTypeFieldSchema = z.enum(["cat", "dog", "other"], {
  message: 'Animal type is required. Possible options are "Cat", "Dog", "Other".',
});

export const animalSchema = z.object({
  id: z.string(),
  name: z.string({ message: "Name is required." }).min(2, { message: "Name must be at least 2 character long." }),
  type: animalTypeFieldSchema,
  age: z
    .string({ message: "Age is required." })
    .transform((val) => {
      if (val === "") {
        return NaN;
      }
      const num = Number(val);

      return isFinite(num) ? num : NaN;
    })
    .refine((val) => !isNaN(val) && val >= 0, { message: "Age must be a positive number." }),
});

export const animalCreateSchema = animalSchema.omit({ id: true });
export const animalUpdateSchema = animalCreateSchema.partial();
