import { z } from "zod";
import { genderFieldSchema, userCreateSchema, userSchema, userUpdateSchema } from "@/schemas/user";

export type Genders = z.infer<typeof genderFieldSchema>;

export type User = z.infer<typeof userSchema>;
export type UserList = User[];

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export type UserCreateFormInput = z.input<typeof userCreateSchema>;
export type UserCreateFormOutput = z.output<typeof userCreateSchema>;

export type UserUpdateFormInput = z.input<typeof userUpdateSchema>;
export type UserUpdateFormOutput = z.output<typeof userUpdateSchema>;
