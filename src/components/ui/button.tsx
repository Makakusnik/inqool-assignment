import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const buttonVariants = cva("inline-flex items-center justify-center rounded-sm font-medium transition-colors px-3 py-1.5 cursor-pointer h-fit", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed",
      destructive: "bg-red-400 text-red-950 hover:bg-red-300/90 disabled:bg-red-400/50 disabled:cursor-not-allowed",
      success: "bg-green-400 text-green-950 hover:bg-green-300/90 disabled:bg-green-400/50 disabled:cursor-not-allowed",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground text-primary hover:bg-primary/10 disabled:bg-muted/50 disabled:cursor-not-allowed disabled:text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>["variant"];

type Props = {
  variant?: VariantProps<typeof buttonVariants>["variant"];
} & PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variant, children, className, ...props }: Props) {
  return (
    <button {...props} className={cn(buttonVariants({ variant, className }))}>
      {children}
    </button>
  );
}
