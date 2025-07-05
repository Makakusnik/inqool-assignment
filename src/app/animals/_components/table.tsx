import Button from "@/components/ui/button";
import { TableComponent } from "@/components/ui/table";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit, X } from "lucide-react";
import { Animal, AnimalList } from "@/types/animal";
import { useAnimalStore } from "./store";

type Props = {
  data: AnimalList;
};

const columnHelper = createColumnHelper<Animal>();

const columns = [
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
    cell: (info) => <TableItemActions data={info.row.original} />,
  }),
];

export default function AnimalTable({ data }: Props) {
  const filterState = useAnimalStore((state) => state.filterState);

  return <TableComponent title="Animals List" data={data} columns={columns} filterState={filterState} />;
}

export const TableItemActions = ({ data }: { data: Animal }) => {
  const toggleEditDialog = useAnimalStore((state) => state.toggleEditDialog);
  const toggleDeleteDialog = useAnimalStore((state) => state.toggleDeleteDialog);
  const setData = useAnimalStore((state) => state.selectAnimal);

  const initiateEdit = (animalData: Animal) => {
    setData(animalData);

    toggleEditDialog(true);
  };

  const initiateDelete = (animalData: Animal) => {
    setData(animalData);

    toggleDeleteDialog(true);
  };

  return (
    <div className="inline-flex gap-x-2 items-center">
      <Button className="p-1 w-8 h-8" variant="outline" onClick={() => initiateEdit(data)}>
        <Edit />
      </Button>
      <Button className="p-1 w-8 h-8" variant="outline" onClick={() => initiateDelete(data)}>
        <X />
      </Button>
    </div>
  );
};
