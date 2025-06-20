import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formToFilterData(formData: object) {
  return Object.entries(formData).map(([key, value]) => ({
    id: key,
    value: value,
  }));
}
