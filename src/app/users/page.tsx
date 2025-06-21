"use client";

import { reseedPost, userDelete, userGetAll, userPatch, userPost } from "@/lib/fetch-functions";
import { userFilterSchema } from "@/schemas/filter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldErrors, useForm } from "react-hook-form";
import { formToFilterData } from "@/lib/utils";
import { useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserCreate, UserUpdate } from "@/types/user";
import Button from "@/components/ui/button";
import { UserFilter } from "@/types/filter";
import { CreateUserDialog } from "./_components/user-dialogs";
import { Filter } from "@/components/ui/filter";
import AlertDialog from "@/components/dialogs/alert-dialog";
import { useConfirmationDialog } from "@/hooks/useConfirmation";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/ui/table";
import UserTable from "./_components/user-table";
import { TriangleAlert } from "lucide-react";

export default function UsersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);

  const { confirm, confirmationDialogProps: alertDialogProps } = useConfirmationDialog();
  const { confirm: reseedConfirm, confirmationDialogProps: reseedDialogProps } = useConfirmationDialog();

  const queryClient = useQueryClient();

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userGetAll,
  });

  const reseedMutation = useMutation({
    mutationFn: reseedPost,
    onSuccess: () => {
      toast.success("Database reseeded successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const reseedDB = async () => {
    const result = await reseedConfirm({
      acceptButtonVariant: "destructive",
      acceptButtonText: "Reseed",
      message: "Are you sure you want to reseed the database? This will delete all existing data.",
      title: "Reseed Database",
    });

    if (result) {
      reseedMutation.mutate();
    }
  };

  // Edit User Handlers

  const userBanMutation = useMutation({
    mutationFn: (data: { id: string; body: Pick<UserUpdate, "banned"> }) => userPatch(data.id, { banned: data.body.banned }),
    onSuccess: () => {
      toast.success("User ban updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user, more information in console");
    },
  });

  const userDeleteMutation = useMutation({
    mutationFn: (data: { id: string }) => userDelete(data.id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user, more information in console");
    },
  });

  const onUserEditSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const onUserBanToggle = async (id: string, currentValue: boolean) => {
    userBanMutation.mutate({ id, body: { banned: !currentValue } });
  };

  const onUserDelete = async (userData: User) => {
    const shouldDelete = await confirm({
      message: `Are you sure you want to delete user ${userData.name}?`,
      title: "Delete User",
      acceptButtonText: "Delete",
      acceptButtonVariant: "destructive",
      cancelButtonText: "Cancel",
      cancelButtonVariant: "outline",
    });

    if (shouldDelete) {
      userDeleteMutation.mutate({ id: userData.id });
    }
  };

  // Create User Handlers

  const userCreateMutation = useMutation({
    mutationFn: (data: { body: UserCreate }) => userPost(data.body),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsCreateDialogOpen(false);
    },
  });

  const onUserCreateSubmit = async (data: UserCreate, onSuccess: (data: User) => void) => {
    userCreateMutation.mutate({ body: data }, { onSuccess });
  };

  // Filter Form

  const filterForm = useForm<UserFilter>({
    resolver: zodResolver(userFilterSchema),
    defaultValues: {
      name: "",
    },
  });

  const onFilterSubmit = (data: UserFilter) => {
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
        {!isLoading && allUsers ? (
          <UserTable
            data={allUsers}
            filterState={filterState}
            onBanToggle={onUserBanToggle}
            onDelete={onUserDelete}
            onUpdateSuccess={onUserEditSuccess}
          ></UserTable>
        ) : (
          <TableSkeleton />
        )}
        <AlertDialog {...alertDialogProps}></AlertDialog>
        <AlertDialog {...reseedDialogProps}></AlertDialog>
        <div className="flex justify-between mt-8">
          <Button variant={"destructive"} onClick={reseedDB}>
            <TriangleAlert className="w-5 h-5 mr-2" />
            Reseed DB
          </Button>
          <CreateUserDialog isOpen={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onSubmit={onUserCreateSubmit}>
            <Button> Create User</Button>
          </CreateUserDialog>
        </div>
      </main>
    </div>
  );
}
