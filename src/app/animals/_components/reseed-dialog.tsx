import AlertDialog from "@/components/dialogs/alert-dialog";
import Button from "@/components/ui/button";
import { useConfirmationDialog } from "@/hooks/useConfirmation";
import { reseedPost } from "@/lib/fetch-functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export function ReseedAnimalDialog() {
  const { confirm, confirmationDialogProps } = useConfirmationDialog();

  const queryClient = useQueryClient();

  const reseedMutation = useMutation({
    mutationFn: reseedPost,
    onSuccess: () => {
      toast.success("Database reseeded successfully");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
  });

  const reseedDB = async () => {
    const result = await confirm({
      acceptButtonVariant: "destructive",
      acceptButtonText: "Reseed",
      message: "Are you sure you want to reseed the database? This will delete all existing data.",
      title: "Reseed Database",
    });

    if (result) {
      reseedMutation.mutate();
    }
  };

  return (
    <>
      <Button variant={"destructive"} onClick={reseedDB}>
        <TriangleAlert className="w-5 h-5 mr-2" />
        Reseed DB
      </Button>
      {confirmationDialogProps.isOpen && <AlertDialog {...confirmationDialogProps} />}
    </>
  );
}
