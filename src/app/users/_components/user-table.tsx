import Button from "@/components/ui/button";
import { TableComponent } from "@/components/ui/table";
import { User, UserList, UserUpdate } from "@/types/user";
import { createColumnHelper, ColumnFiltersState } from "@tanstack/react-table";
import { Edit, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EditUserDialog } from "./user-dialogs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userPatch } from "@/lib/fetch-functions";

type Props = {
  data: UserList;
  onBanToggle: (id: string, currentValue: boolean) => void;
  onDelete: (userData: User) => void;
  onUpdateSuccess?: () => void;
  filterState: ColumnFiltersState;
};

const columnHelper = createColumnHelper<User>();

export default function UserTable({ data, filterState = [], onBanToggle, onDelete, onUpdateSuccess }: Props) {
  const [userData, setUserData] = useState<User>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const userEditMutation = useMutation({
    mutationFn: (data: { id: string; body: UserUpdate }) => userPatch(data.id, data.body),
    onSuccess: () => {
      toast.success("User updated successfully");
      onUpdateSuccess?.();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error("Failed to update user, more information in console");
    },
  });

  const onUserEditDialogChange = (value: boolean, userData?: User) => {
    setIsEditDialogOpen((prev) => !prev);

    if (!value) {
      setUserData(undefined);
    } else if (value && userData) {
      setUserData(userData);
    }
  };

  const onUserEditSubmit = async (data: UserUpdate) => {
    if (!userData) return;

    await userEditMutation.mutateAsync({ id: userData.id, body: data });

    setUserData(undefined);
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
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("banned", {
        header: "Banned",
        cell: (info) => (info.getValue() ? <span className="text-red-500 font-bold uppercase">Ban</span> : null),
      }),
      columnHelper.display({
        header: "Actions",
        id: "actions",
        cell: (info) => (
          <div className="inline-flex gap-x-2 items-center">
            <Button className="p-1 w-14 h-8" variant="outline" onClick={() => onBanToggle(info.row.original.id, info.row.original.banned)}>
              {info.row.original.banned ? "Unban" : "Ban"}
            </Button>

            <Button className="p-1 w-8 h-8" variant="outline" onClick={() => onUserEditDialogChange(true, info.row.original)}>
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
      <TableComponent title="Users List" data={data} columns={columns} filterState={filterState} />
      <EditUserDialog isOpen={isEditDialogOpen} onOpenChange={onUserEditDialogChange} onSubmit={onUserEditSubmit} userData={userData}></EditUserDialog>
    </>
  );
}
