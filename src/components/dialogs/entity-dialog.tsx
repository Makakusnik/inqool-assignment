import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { PropsWithChildren } from "react";

type EntityDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  entityLabel: string;
  commonFields: React.ReactNode;
  isLoading: boolean;
  type: "create" | "edit";
} & PropsWithChildren;

export default function EntityDialog({ isOpen, onOpenChange, isLoading, entityLabel, children, commonFields, handleSubmit, type }: EntityDialogProps) {
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
            <DialogTitle>Edit {entityLabel}</DialogTitle>
            <DialogDescription>Use this form to edit {entityLabel.toLowerCase()} details. Make sure to save your changes.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 ">
            {commonFields}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="success">
                {type === "create" ? "Create" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
