import { AnimalCreateFormInput, AnimalCreateFormOutput, AnimalUpdateFormInput, AnimalUpdateFormOutput } from "@/types/animal";
import { useForm } from "react-hook-form";

interface CommonFormProps {
  form:
    | ReturnType<typeof useForm<AnimalCreateFormInput, any, AnimalCreateFormOutput>>
    | ReturnType<typeof useForm<AnimalUpdateFormInput, any, AnimalUpdateFormOutput>>;
  isLoading: boolean;
}

export function CommonFormFields({ form, isLoading }: CommonFormProps) {
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
