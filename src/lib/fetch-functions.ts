import { User, UserCreate, UserList, UserUpdate } from "@/types/user";
import apiFetch from "./api";
import { Animal, AnimalCreate, AnimalList, AnimalUpdate } from "@/types/animal";

export const userGetAll = async () => apiFetch<UserList>("/users", { method: "GET" });
export const userGet = async (id: string) => apiFetch<User>(`/users/${id}`, { method: "GET" });
export const userPost = async (body: UserCreate) => apiFetch<User, UserCreate>(`/users`, { method: "POST" }, body);
export const userPatch = async (id: string, body: UserUpdate) => apiFetch<User, UserUpdate>(`/users/${id}`, { method: "PATCH" }, body);
export const userDelete = async (id: string) => apiFetch<User>(`/users/${id}`, { method: "DELETE" });

export const animalGetAll = async () => apiFetch<AnimalList>("/animals", { method: "GET" });
export const animalGet = async (id: string) => apiFetch<Animal>(`/animals/${id}`, { method: "GET" });
export const animalPost = async (body: AnimalCreate) => apiFetch<Animal, AnimalCreate>(`/animals`, { method: "POST" }, body);
export const animalPatch = async (id: string, body: AnimalUpdate) => apiFetch<Animal, AnimalUpdate>(`/animals/${id}`, { method: "PATCH" }, body);
export const animalDelete = async (id: string) => apiFetch<Animal>(`/animals/${id}`, { method: "DELETE" });

export const reseedPost = async () => apiFetch("/seed", { method: "POST" });
