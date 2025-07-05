import { FilterInputObject } from "@/types/filter";
import { ColumnFiltersState } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formToFilterData<TData extends FilterInputObject>(formData: TData): ColumnFiltersState {
  return Object.entries(formData).map(([id, value]) => {
    return {
      id,
      value: value !== undefined && value !== null ? String(value) : "",
    };
  });
}
