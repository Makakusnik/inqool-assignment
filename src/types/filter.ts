import { filterSchema } from "@/schemas/filter";
import { z } from "zod";

export type FilterSchema = z.infer<typeof filterSchema>;
