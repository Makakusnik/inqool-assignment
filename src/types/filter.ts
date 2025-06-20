import { animalFilterSchema, userFilterSchema } from "@/schemas/filter";
import { z } from "zod";

export type UserFilter = z.infer<typeof userFilterSchema>;
export type AnimalFilter = z.infer<typeof animalFilterSchema>;
