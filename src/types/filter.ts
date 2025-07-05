import { animalFilterSchema, userFilterSchema } from "@/schemas/filter";
import { z } from "zod";

export type UserFilter = z.infer<typeof userFilterSchema>;
export type AnimalFilter = z.infer<typeof animalFilterSchema>;

export type FilterInputObject = {
  [key: string]: string | number | undefined | null;
};

export type FilterDataItem<TKey extends string> = {
  key: TKey;
  value: string;
};
