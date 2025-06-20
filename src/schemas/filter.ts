import { z } from "zod";

export const filterSchema = z.object({
  name: z.string().optional(),
});
