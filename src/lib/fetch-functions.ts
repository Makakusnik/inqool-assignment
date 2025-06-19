import { User, UserCreate, UserList, UserUpdate } from "@/types/user";
import apiFetch from "./api";

export const userGetAll = async () => apiFetch<UserList>("/users", { method: "GET" });
export const userGet = async (id: string) => apiFetch<User>(`/users/${id}`, { method: "GET" });
export const userPost = async (body: UserCreate) => apiFetch<User, UserCreate>(`/users`, { method: "POST" }, body);
export const userPatch = async (id: string, body: UserUpdate) => apiFetch<User, UserUpdate>(`/users/${id}`, { method: "PATCH" }, body);
export const userDelete = async (id: string) => apiFetch<User>(`/users/${id}`, { method: "DELETE" });
