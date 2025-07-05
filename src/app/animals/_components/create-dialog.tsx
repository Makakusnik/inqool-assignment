"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog-noportal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animalCreateSchema } from "@/schemas/animal";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import Button from "@/components/ui/button";
import { AnimalCreate, AnimalCreateFormInput, AnimalCreateFormOutput } from "@/types/animal";
import { useAnimalStore } from "./store";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { animalPost } from "@/lib/fetch-functions";
import { CommonFormFields } from "./common-fields";

export function CreateAnimalDialog() {
  const isCreateDialogOpen = useAnimalStore((state) => state.isCreateDialogOpen);
  const toggleCreateDialog = useAnimalStore((state) => state.toggleCreateDialog);

  const queryClient = useQueryClient();

  const form = useForm<AnimalCreateFormInput, any, AnimalCreateFormOutput>({
    resolver: zodResolver(animalCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const animalsCreateMutation = useMutation({
    mutationFn: (data: { body: AnimalCreate }) => animalPost(data.body),
    onSuccess: () => {
      toast.success("Animal created successfully");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      toggleCreateDialog(false);
    },
  });

  const onSubmit = async (data: AnimalCreate) => {
    try {
      await animalsCreateMutation.mutateAsync({ body: data });
      form.reset();
    } catch (error) {
      console.error("Error creating animal:", error);
      toast.error("Error creating animal.");
    } finally {
      toggleCreateDialog(false);
    }
  };

  useEffect(() => {
    if (!isCreateDialogOpen) {
      form.reset();
    }
  }, [isCreateDialogOpen]);

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={toggleCreateDialog}>
      <DialogTrigger asChild>
        <Button> Create Animal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={!animalsCreateMutation.isPending}>
        <div className="relative space-y-4 p-6">
          {animalsCreateMutation.isPending && (
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
            <CommonFormFields form={form} isLoading={animalsCreateMutation.isPending} />
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
