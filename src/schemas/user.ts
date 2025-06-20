import { z } from "zod";

export const genderFieldSchema = z.enum(["female", "male", "other"], {
  message:
    'Gender is required. Possible options are "Male", "Female", "Other".',
});

export const userSchema = z.object({
  id: z.string(),
  name: z
    .string({ message: "Name is required." })
    .min(3, { message: "Name must be at least 3 character long." }),
  gender: genderFieldSchema,
  banned: z.boolean(),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userUpdateSchema = userCreateSchema.partial();
