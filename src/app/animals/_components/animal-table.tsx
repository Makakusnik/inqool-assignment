import Button from "@/components/ui/button";
import { TableComponent } from "@/components/ui/table";
import { createColumnHelper, ColumnFiltersState } from "@tanstack/react-table";
import { Edit, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { animalPatch } from "@/lib/fetch-functions";
import { Animal, AnimalList, AnimalUpdate } from "@/types/animal";
import { EditAnimalDialog } from "./animal-dialogs";

type Props = {
  data: AnimalList;
  onDelete: (data: Animal) => void;
  onUpdateSuccess?: () => void;
  filterState: ColumnFiltersState;
};

const columnHelper = createColumnHelper<Animal>();

export default function AnimalTable({ data, filterState = [], onDelete, onUpdateSuccess }: Props) {
  const [animalData, setAnimalData] = useState<Animal>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const animalEditMutation = useMutation({
    mutationFn: (data: { id: string; body: AnimalUpdate }) => animalPatch(data.id, data.body),
    onSuccess: () => {
      toast.success("Animal updated successfully");
      onUpdateSuccess?.();
    },
    onError: (error) => {
      console.error("Error updating animal:", error);
      toast.error("Failed to update animal, more information in console");
    },
  });

  const onAnimalEditDialogChange = (value: boolean, animalData?: Animal) => {
    setIsEditDialogOpen((prev) => !prev);

    if (!value) {
      setAnimalData(undefined);
    } else if (value && animalData) {
      setAnimalData(animalData);
    }
  };

  const onAnimalEditSubmit = async (data: AnimalUpdate, onSuccess: (data: Animal) => void) => {
    if (!animalData) return;

    animalEditMutation.mutate({ id: animalData.id, body: data }, { onSuccess });

    setAnimalData(undefined);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Id",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("age", {
        header: "Age",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        header: "Actions",
        id: "actions",
        cell: (info) => (
          <div className="inline-flex gap-x-2 items-center">
            <Button className="p-1 w-8 h-8" variant="outline" onClick={() => onAnimalEditDialogChange(true, info.row.original)}>
              <Edit />
            </Button>
            <Button className="p-1 w-8 h-8" variant="outline" onClick={() => onDelete(info.row.original)}>
              <X />
            </Button>
          </div>
        ),
      }),
    ],
    []
  );

  return (
    <>
      <TableComponent title="Animals List" data={data} columns={columns} filterState={filterState} />
      <EditAnimalDialog
        isOpen={isEditDialogOpen}
        onOpenChange={onAnimalEditDialogChange}
        onSubmit={onAnimalEditSubmit}
        animalData={animalData}
      ></EditAnimalDialog>
    </>
  );
}
