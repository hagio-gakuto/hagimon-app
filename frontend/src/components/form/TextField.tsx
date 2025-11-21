"use client";

import { Input } from "../ui/Input";
import { FormField } from "./FormField";
import { useFormContext } from "react-hook-form";

type TextFieldProps = {
  name: string;
  label?: string;
  rules?: Parameters<ReturnType<typeof useFormContext>["register"]>[1];
  placeholder?: string;
  type?: string;
  className?: string;
};

export const TextField = ({
  name,
  label,
  rules,
  placeholder,
  type = "text",
  className,
}: TextFieldProps) => {
  const { register, formState } = useFormContext();
  const errors = formState.errors;

  return (
    <FormField name={name} label={label} rules={rules}>
      <Input
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        error={!!errors[name]}
        className={className}
      />
    </FormField>
  );
};
