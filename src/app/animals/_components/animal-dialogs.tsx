"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animalUpdateSchema, animalCreateSchema } from "@/schemas/animal";
import { PropsWithChildren, useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import Button from "@/components/ui/button";
import {
  AnimalUpdate,
  AnimalCreate,
  Animal,
  AnimalUpdateFormInput,
  AnimalUpdateFormOutput,
  AnimalCreateFormInput,
  AnimalCreateFormOutput,
} from "@/types/animal";

type EditAnimalDialogProps = {
  animalData?: Animal;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AnimalUpdate, onSuccess: () => void) => void;
} & PropsWithChildren;

export function EditAnimalDialog({ ...props }: EditAnimalDialogProps) {
  return props.isOpen ? <EditAnimalDialogCore {...props} /> : null;
}

function EditAnimalDialogCore({ animalData, children, isOpen, onOpenChange, onSubmit: onUpdateAnimalSubmit }: EditAnimalDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AnimalUpdateFormInput, any, AnimalUpdateFormOutput>({
    resolver: zodResolver(animalUpdateSchema),
    defaultValues: {
      name: animalData?.name,
      age: animalData?.age ? String(animalData.age) : "",
      type: animalData?.type,
    },
  });

  const onSubmit = async (data: AnimalUpdate) => {
    try {
      setIsLoading(true);
      onUpdateAnimalSubmit(data, () => {
        form.reset();
        setIsLoading(false);
        onOpenChange(false);
      });
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <div className="relative space-y-4 p-6">
          {isLoading && (
            <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-transparent text-center text-gray-300 flex flex-col items-center justify-center gap-y-4">
              <LoaderIcon className="animate-spin w-8 h-8" />
              <p>Saving changes...</p>
            </div>
          )}
          <DialogHeader className="gap-y-2">
            <DialogTitle>Edit Animal</DialogTitle>
            <DialogDescription>Use this form to edit animal details. Make sure to save your changes.</DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 ">
            <CommonFormFields form={form} isLoading={isLoading} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="success">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type CreateAnimalDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AnimalCreate, onSuccess: (data: Animal) => void) => void;
} & PropsWithChildren;

export function CreateAnimalDialog({ children, isOpen, onOpenChange, onSubmit: onCreateAnimalSubmit }: CreateAnimalDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AnimalCreateFormInput, any, AnimalCreateFormOutput>({
    resolver: zodResolver(animalCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AnimalCreate) => {
    try {
      setIsLoading(true);
      onCreateAnimalSubmit(data, () => {
        console.log("Animal created successfully");
        onOpenChange(false);
        setIsLoading(false);
        form.reset();
      });
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]" showCloseButton={!isLoading}>
        <div className="relative space-y-4 p-6">
          {isLoading && (
            <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-transparent text-center text-gray-300 flex flex-col items-center justify-center gap-y-4">
              <LoaderIcon className="animate-spin w-8 h-8" />
              <p>Creating new record...</p>
            </div>
          )}
          <DialogHeader className="gap-y-2">
            <DialogTitle>Create New Animal</DialogTitle>
            <DialogDescription>Use this form to create new animal record.</DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 ">
            <CommonFormFields form={form} isLoading={isLoading} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="success">
                Create
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CommonFormProps {
  form:
    | ReturnType<typeof useForm<AnimalCreateFormInput, any, AnimalCreateFormOutput>>
    | ReturnType<typeof useForm<AnimalUpdateFormInput, any, AnimalUpdateFormOutput>>;
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
        <label htmlFor="type" className="text-sm font-medium">
          Type
        </label>
        <select
          id="type"
          disabled={isLoading}
          {...form.register("type")}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-white [&_option]:bg-background"
        >
          <option value=""></option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
        {form.formState.errors.type && <p className="text-sm text-red-400">{form.formState.errors.type.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="age" className="text-sm font-medium">
          Age
        </label>
        <input id="age" disabled={isLoading} type="number" {...form.register("age")} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
        {form.formState.errors.age && <p className="text-sm text-red-400">{form.formState.errors.age.message}</p>}
      </div>
    </div>
  );
}
