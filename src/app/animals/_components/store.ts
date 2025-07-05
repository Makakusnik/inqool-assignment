import { formToFilterData } from "@/lib/utils";
import { Animal } from "@/types/animal";
import { AnimalFilter } from "@/types/filter";
import { ColumnFiltersState } from "@tanstack/react-table";
import { create } from "zustand";

type AnimalStoreState = {
  selectedAnimal: Animal | null;
  filterState: ColumnFiltersState;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
};

type AnimalStoreActions = {
  updateFilterState: (data: AnimalFilter) => void;
  resetFilterState: () => void;
  selectAnimal: (data: Animal) => void;
  resetAnimal: () => void;
  toggleCreateDialog: (shouldOpen?: boolean) => void;
  toggleEditDialog: (shouldOpen?: boolean) => void;
  toggleDeleteDialog: (shouldOpen?: boolean) => void;
};

type AnimalStore = AnimalStoreState & AnimalStoreActions;

export const useAnimalStore = create<AnimalStore>()((set) => ({
  isCreateDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,
  selectedAnimal: null,
  filterState: [],
  updateFilterState: (newFilterState) => set((state) => ({ ...state, filterState: formToFilterData(newFilterState) })),
  resetFilterState: () => set((state) => ({ ...state, filterState: [] })),
  selectAnimal: (newAnimalData) => set((state) => ({ ...state, selectedAnimal: newAnimalData })),
  resetAnimal: () => set((state) => ({ ...state, selectedAnimal: null })),
  toggleCreateDialog: (shouldOpen) => set((state) => ({ ...state, isCreateDialogOpen: shouldOpen != undefined ? shouldOpen : !state.isCreateDialogOpen })),
  toggleEditDialog: (shouldOpen) => set((state) => ({ ...state, isEditDialogOpen: shouldOpen != undefined ? shouldOpen : !state.isEditDialogOpen })),
  toggleDeleteDialog: (shouldOpen) => set((state) => ({ ...state, isDeleteDialogOpen: shouldOpen != undefined ? shouldOpen : !state.isDeleteDialogOpen })),
}));
