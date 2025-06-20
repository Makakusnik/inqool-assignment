import Button from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type Props<TSchema extends z.ZodType<any, any>> = {
  form: UseFormReturn<z.infer<TSchema>>;
  onSubmit: (data: z.infer<TSchema>) => void;
  onError: (error: FieldErrors<z.infer<TSchema>>) => void;
  onReset: () => void;
} & PropsWithChildren;

export const Filter = <TSchema extends z.ZodType<any, any>>({
  form,
  onError,
  onSubmit,
  onReset,
  children,
}: Props<TSchema>) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Filters</h2>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col flex-1"
      >
        <div className="flex flex-wrap gap-4">{children}</div>
        <div className="flex justify-end gap-x-4">
          <Button type="button" variant="destructive" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit" variant="success">
            Apply
          </Button>
        </div>
      </form>
    </>
  );
};
