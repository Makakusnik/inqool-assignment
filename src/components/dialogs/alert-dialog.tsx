import Button, { ButtonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  message: string;
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
  acceptButtonVariant?: ButtonVariants;
  cancelButtonVariant?: ButtonVariants;
  onAccept: () => void;
  onCancel: () => void;
} & React.PropsWithChildren;

export default function AlertDialog({
  isOpen,
  message,
  title,
  children,
  onOpenChange,
  onAccept,
  onCancel,
  acceptButtonText,
  acceptButtonVariant,
  cancelButtonText,
  cancelButtonVariant,
}: Props) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}
        <DialogContent className="sm:max-w-[425px] p-6 space-y-4" showCloseButton={false}>
          <DialogHeader className="gap-y-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-x-2">
            <Button
              variant={cancelButtonVariant || "outline"}
              onClick={() => {
                onCancel();
                onOpenChange(false);
              }}
            >
              {cancelButtonText || "Cancel"}
            </Button>
            <Button
              variant={acceptButtonVariant || "default"}
              onClick={() => {
                onAccept();
                onOpenChange(false);
              }}
            >
              {acceptButtonText || "Accept"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
