"use client";

import { animalFilterSchema } from "@/schemas/filter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldErrors, useForm } from "react-hook-form";
import { formToFilterData } from "@/lib/utils";
import { useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimalFilter } from "@/types/filter";
import { Filter } from "@/components/ui/filter";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/ui/table";
import { animalDelete, animalGetAll, animalPost } from "@/lib/fetch-functions";
import AnimalTable from "./_components/animal-table";
import { useConfirmationDialog } from "@/hooks/useConfirmation";
import AlertDialog from "@/components/dialogs/alert-dialog";
import { Animal, AnimalCreate } from "@/types/animal";
import { CreateAnimalDialog } from "./_components/animal-dialogs";
import Button from "@/components/ui/button";

export default function AnimalsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);

  const { confirm, confirmationDialogProps: alertDialogProps } = useConfirmationDialog();
  const queryClient = useQueryClient();

  const { data: allAnimals, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: animalGetAll,
  });

  // Edit Animal Handlers

  const animalDeleteMutation = useMutation({
    mutationFn: (data: { id: string }) => animalDelete(data.id),
    onSuccess: () => {
      toast.success("Animal deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
    onError: (error) => {
      console.error("Error deleting animal:", error);
      toast.error("Failed to delete animal, more information in console");
    },
  });

  const onAnimalEditSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["animals"] });
  };

  const onAnimalDelete = async (animalData: Animal) => {
    const shouldDelete = await confirm({
      message: `Are you sure you want to delete animal ${animalData.name}?`,
      title: "Delete Animal",
      acceptButtonText: "Delete",
      acceptButtonVariant: "destructive",
      cancelButtonText: "Cancel",
      cancelButtonVariant: "outline",
    });

    if (shouldDelete) {
      animalDeleteMutation.mutate({ id: animalData.id });
    }
  };

  // Create Animal Handlers

  const animalsCreateMutation = useMutation({
    mutationFn: (data: { body: AnimalCreate }) => animalPost(data.body),
    onSuccess: () => {
      toast.success("Animal created successfully");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      setIsCreateDialogOpen(false);
    },
  });

  const onAnimalCreateSubmit = async (data: AnimalCreate, onSuccess: (data: Animal) => void) => {
    animalsCreateMutation.mutate({ body: data }, { onSuccess });
  };

  // Filter Form

  const filterForm = useForm<AnimalFilter>({
    resolver: zodResolver(animalFilterSchema),
    defaultValues: {
      name: "",
    },
  });

  const onFilterSubmit = (data: AnimalFilter) => {
    setFilterState(formToFilterData(data));
  };

  const onFilterReset = () => {
    filterForm.reset();
    setFilterState([]);
  };

  const onFilterError = (error: FieldErrors) => {
    toast.error("Error in filter form, more information in console");
    console.error("Error submitting form:", error);
  };

  return (
    <div className="flex flex-col py-12 min-h-[calc(100vh-6rem)] max-w-[64rem] mx-auto items-center gap-y-12">
      <header className="flex flex-col bg-neutral-900 h-fit w-full px-4 py-2 gap-y-6">
        <Filter form={filterForm} onError={onFilterError} onSubmit={onFilterSubmit} onReset={onFilterReset}>
          <div className="flex flex-col gap-1 w-fit basis-[calc(33%-1rem)]">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="bg-neutral-600/20 border-1" {...filterForm.register("name")}></input>
          </div>
        </Filter>
      </header>
      <main className="flex-1 max-w-5xl w-full">
        {!isLoading && allAnimals ? (
          <AnimalTable data={allAnimals} filterState={filterState} onDelete={onAnimalDelete} onUpdateSuccess={onAnimalEditSuccess} />
        ) : (
          <TableSkeleton />
        )}
        <AlertDialog {...alertDialogProps}></AlertDialog>
        <div className="flex justify-end mt-8">
          <CreateAnimalDialog isOpen={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onSubmit={onAnimalCreateSubmit}>
            <Button> Create Animal</Button>
          </CreateAnimalDialog>
        </div>
      </main>
    </div>
  );
}
