import { ButtonVariants } from "@/components/ui/button";
import { useCallback, useRef, useState } from "react";

interface ConfirmOptions {
  title?: string;
  message: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
  acceptButtonVariant?: ButtonVariants;
  cancelButtonVariant?: ButtonVariants;
}

export function useConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [acceptBtnText, setAcceptBtnText] = useState("Accept");
  const [cancelBtnText, setCancelBtnText] = useState("Cancel");
  const [acceptBtnVariant, setAcceptBtnVariant] = useState<ButtonVariants>("default");
  const [cancelBtnVariant, setCancelBtnVariant] = useState<ButtonVariants>("outline");

  const resolvePromiseRef = useRef<(value: boolean) => void | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    setDialogTitle(options.title || "Confirm Action");
    setDialogMessage(options.message);
    setAcceptBtnText(options.acceptButtonText || "Accept");
    setCancelBtnText(options.cancelButtonText || "Cancel");
    setAcceptBtnVariant(options.acceptButtonVariant || "default");
    setCancelBtnVariant(options.cancelButtonVariant || "outline");
    setIsOpen(true);

    return new Promise((resolve) => {
      resolvePromiseRef.current = resolve;
    });
  }, []);

  const handleAccept = useCallback(() => {
    if (resolvePromiseRef.current) {
      resolvePromiseRef.current(true);
    }
    setIsOpen(false);
    resolvePromiseRef.current = null;
  }, []);

  const handleCancel = useCallback(() => {
    if (resolvePromiseRef.current) {
      resolvePromiseRef.current(false);
    }
    setIsOpen(false);
    resolvePromiseRef.current = null;
  }, []);

  const confirmationDialogProps = {
    isOpen: isOpen,
    title: dialogTitle,
    message: dialogMessage,
    onOpenChange: setIsOpen,
    acceptButtonText: acceptBtnText,
    cancelButtonText: cancelBtnText,
    acceptButtonVariant: acceptBtnVariant,
    cancelButtonVariant: cancelBtnVariant,
    onAccept: handleAccept,
    onCancel: handleCancel,
  };

  return { confirm, confirmationDialogProps };
}
