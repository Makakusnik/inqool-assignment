import AlertDialog from "@/components/dialogs/alert-dialog";
import { useAnimalStore } from "./store";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { animalDelete } from "@/lib/fetch-functions";

export function DeleteAnimalDialog() {
  const selectedAnimalData = useAnimalStore((state) => state.selectedAnimal);
  const isOpen = useAnimalStore((state) => state.isDeleteDialogOpen);
  const toggleDialog = useAnimalStore((state) => state.toggleDeleteDialog);
  const resetData = useAnimalStore((state) => state.resetAnimal);

  const queryClient = useQueryClient();

  const animalDeleteMutation = useMutation({
    mutationFn: (data: { id: string }) => animalDelete(data.id),
    onSuccess: () => {
      toast.success("Animal deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
  });

  const onDelete = async () => {
    try {
      if (!selectedAnimalData) {
        throw new Error("Something went wrong. ID of animal was not supplied properly.");
      }

      await animalDeleteMutation.mutateAsync({ id: selectedAnimalData.id });
    } catch (error) {
      console.error("Error deleting animal:", error);
      toast.error("Something went wrong, animal wasn't deleted.");
    } finally {
      resetData();
    }
  };

  const onCancel = () => {
    toggleDialog(false);
    resetData();
  };

  return (
    <>
      <AlertDialog
        onAccept={onDelete}
        onCancel={onCancel}
        isOpen={isOpen}
        onOpenChange={toggleDialog}
        message={`Are you sure you want to delete animal ${selectedAnimalData?.name || ""}?`}
        title="Delete Animal"
        acceptButtonText="Delete"
        acceptButtonVariant="destructive"
        cancelButtonText="Cancel"
        cancelButtonVariant="outline"
      ></AlertDialog>
    </>
  );
}
