"use client";

import { useQuery } from "@tanstack/react-query";
import { TableSkeleton } from "@/components/ui/table";
import { animalGetAll } from "@/lib/fetch-functions";
import AnimalTable from "./_components/table";
import AnimalFilterComponent from "./_components/filter";
import { CreateAnimalDialog } from "./_components/create-dialog";
import { EditAnimalDialog } from "./_components/edit-dialog";
import { DeleteAnimalDialog } from "./_components/delete-dialog";
import { ReseedAnimalDialog } from "./_components/reseed-dialog";

export default function AnimalsPage() {
  const { data: allAnimals, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: animalGetAll,
  });

  return (
    <div className="flex flex-col py-12 min-h-[calc(100vh-6rem)] max-w-[64rem] mx-auto items-center gap-y-12">
      <header className="flex flex-col bg-neutral-900 h-fit w-full px-4 py-2 gap-y-6">
        <AnimalFilterComponent />
      </header>
      <main className="flex-1 max-w-5xl w-full">
        {!isLoading && allAnimals ? <AnimalTable data={allAnimals} /> : <TableSkeleton />}

        <div className="flex justify-between mt-8">
          <ReseedAnimalDialog />
          <CreateAnimalDialog />
        </div>
        <EditAnimalDialog />
        <DeleteAnimalDialog />
      </main>
    </div>
  );
}
