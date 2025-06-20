import { userFilterSchema } from "@/schemas/filter";
import { z } from "zod";

export type UserFilter = z.infer<typeof userFilterSchema>;
