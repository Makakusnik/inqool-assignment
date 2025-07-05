import { Filter } from "@/components/ui/filter";
import { animalFilterSchema } from "@/schemas/filter";
import { AnimalFilter } from "@/types/filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useAnimalStore } from "./store";
import { toast } from "sonner";

export default function AnimalFilterComponent() {
  const updateFilterState = useAnimalStore((state) => state.updateFilterState);
  const resetFilterState = useAnimalStore((state) => state.resetFilterState);

  const filterForm = useForm<AnimalFilter>({
    resolver: zodResolver(animalFilterSchema),
    defaultValues: {
      name: "",
    },
  });

  const onFilterReset = () => {
    filterForm.reset();
    resetFilterState();
  };

  const onFilterError = (error: FieldErrors) => {
    toast.error("Error in filter form, more information in console");
    console.error("Error submitting form:", error);
  };

  return (
    <Filter form={filterForm} onError={onFilterError} onSubmit={updateFilterState} onReset={onFilterReset}>
      <div className="flex flex-col gap-1 w-fit basis-[calc(33%-1rem)]">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" className="bg-neutral-600/20 border-1" {...filterForm.register("name")}></input>
      </div>
    </Filter>
  );
}
