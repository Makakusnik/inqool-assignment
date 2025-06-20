"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema, userCreateSchema } from "@/schemas/user";
import { PropsWithChildren, useState } from "react";
import { UserUpdate, UserCreate, User, UserUpdateFormInput, UserUpdateFormOutput, UserCreateFormInput, UserCreateFormOutput } from "@/types/user";
import EntityDialog from "@/components/dialogs/entity-dialog";

type EditUserDialogProps = {
  userData?: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserUpdate, onSuccess: () => void) => void;
  entityLabel?: string;
} & PropsWithChildren;

export function EditUserDialog({ ...props }: EditUserDialogProps) {
  return props.isOpen ? <EditUserDialogCore {...props} /> : null;
}

function EditUserDialogCore({ userData, children, isOpen, onOpenChange, onSubmit: onUpdateUserSubmit, entityLabel = "User" }: EditUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserUpdateFormInput, any, UserUpdateFormOutput>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: userData?.name,
      banned: userData?.banned,
      gender: userData?.gender,
    },
  });

  const onSubmit = async (data: UserUpdate) => {
    try {
      setIsLoading(true);
      onUpdateUserSubmit(data, () => {
        form.reset();
        setIsLoading(false);
        onOpenChange(false);
      });
    } catch (error) {
      console.error(`Error updating ${entityLabel.toLowerCase()}:`, error);
    }
  };

  return (
    <EntityDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={isLoading}
      entityLabel={entityLabel}
      handleSubmit={form.handleSubmit(onSubmit)}
      commonFields={<CommonFormFields form={form} isLoading={isLoading} />}
      type="edit"
    >
      {children}
    </EntityDialog>
  );
}

type CreateUserDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserCreate, onSuccess: (data: User) => void) => void;
  entityLabel?: string;
} & PropsWithChildren;

export function CreateUserDialog({ children, isOpen, onOpenChange, onSubmit: onCreateUserSubmit, entityLabel = "Animal" }: CreateUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserCreateFormInput, any, UserCreateFormOutput>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: "",
      banned: false,
    },
  });

  const onSubmit = async (data: UserCreate) => {
    try {
      setIsLoading(true);
      onCreateUserSubmit(data, () => {
        onOpenChange(false);
        setIsLoading(false);
        form.reset();
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <EntityDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={isLoading}
      entityLabel={entityLabel}
      handleSubmit={form.handleSubmit(onSubmit)}
      commonFields={<CommonFormFields form={form} isLoading={isLoading} />}
      type="create"
    >
      {children}
    </EntityDialog>
  );
}

interface CommonFormProps {
  form: ReturnType<typeof useForm<UserCreateFormInput, any, UserCreateFormOutput>> | ReturnType<typeof useForm<UserUpdateFormInput, any, UserUpdateFormOutput>>;
  isLoading: boolean;
}

function CommonFormFields({ form, isLoading }: CommonFormProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" type="text" {...form.register("name")} className="rounded-md border border-gray-300 px-3 py-2 text-sm" disabled={isLoading} />
        {form.formState.errors.name && <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>}
      </div>

      <div className="grid gap-2">
        <label htmlFor="gender" className="text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          disabled={isLoading}
          {...form.register("gender")}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-white [&_option]:bg-background"
        >
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {form.formState.errors.gender && <p className="text-sm text-red-400">{form.formState.errors.gender.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input id="banned" disabled={isLoading} type="checkbox" {...form.register("banned")} className="h-4 w-4 rounded border-gray-300" />
        <label htmlFor="banned" className="text-sm font-medium">
          Banned
        </label>
        {form.formState.errors.banned && <p className="text-sm text-red-400">{form.formState.errors.banned.message}</p>}
      </div>
    </div>
  );
}
