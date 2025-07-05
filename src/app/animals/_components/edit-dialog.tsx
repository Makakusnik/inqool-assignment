"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog-noportal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animalUpdateSchema } from "@/schemas/animal";
import { PropsWithChildren } from "react";
import { LoaderIcon } from "lucide-react";
import Button from "@/components/ui/button";
import { AnimalUpdate, AnimalUpdateFormInput, AnimalUpdateFormOutput } from "@/types/animal";
import { useAnimalStore } from "./store";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { animalPatch } from "@/lib/fetch-functions";
import { CommonFormFields } from "./common-fields";

type DialogProps = {
  isOpen: boolean;
  onOpenChange: (value?: boolean) => void;
} & PropsWithChildren;

export function EditAnimalDialog() {
  const toggleDialog = useAnimalStore((state) => state.toggleEditDialog);
  const isDialogOpen = useAnimalStore((state) => state.isEditDialogOpen);

  return isDialogOpen && <EditAnimalDialogCore isOpen={isDialogOpen} onOpenChange={toggleDialog} />;
}

export function EditAnimalDialogCore({ children, isOpen, onOpenChange }: DialogProps) {
  const selectedAnimalData = useAnimalStore((state) => state.selectedAnimal);

  const queryClient = useQueryClient();

  const form = useForm<AnimalUpdateFormInput, any, AnimalUpdateFormOutput>({
    resolver: zodResolver(animalUpdateSchema),
    defaultValues: {
      name: selectedAnimalData?.name,
      age: selectedAnimalData?.age ? String(selectedAnimalData.age) : "",
      type: selectedAnimalData?.type,
    },
  });

  const animalEditMutation = useMutation({
    mutationFn: (data: { id: string; body: AnimalUpdate }) => animalPatch(data.id, data.body),
    onSuccess: () => {
      toast.success("Animal updated successfully");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
  });

  const onSubmit = async (data: AnimalUpdate) => {
    try {
      if (!selectedAnimalData) {
        throw new Error("Something went wrong. ID of animal was not supplied properly.");
      }

      await animalEditMutation.mutateAsync({ body: data, id: selectedAnimalData.id });

      form.reset();
    } catch (error) {
      console.error("Error editing animal:", error);
      toast.error("Error editing animal.");
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <div className="relative space-y-4 p-6">
          {animalEditMutation.isPending && (
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
            <CommonFormFields form={form} isLoading={animalEditMutation.isPending} />
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
