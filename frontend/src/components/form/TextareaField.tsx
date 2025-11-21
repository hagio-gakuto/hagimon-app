"use client";

import { Textarea } from "../ui/Textarea";
import { FormField } from "./FormField";
import { useFormContext } from "react-hook-form";

type TextareaFieldProps = {
  name: string;
  label?: string;
  rules?: Parameters<ReturnType<typeof useFormContext>["register"]>[1];
  placeholder?: string;
};

export const TextareaField = ({
  name,
  label,
  rules,
  placeholder,
}: TextareaFieldProps) => {
  const { register, formState } = useFormContext();
  const errors = formState.errors;

  return (
    <FormField name={name} label={label} rules={rules}>
      <Textarea
        {...register(name, rules)}
        placeholder={placeholder}
        error={errors[name]?.message as string | undefined}
      />
    </FormField>
  );
};
