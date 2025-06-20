import { z } from "zod";

export const userFilterSchema = z.object({
  name: z.string().optional(),
});

export const animalFilterSchema = z.object({
  name: z.string().optional(),
});
