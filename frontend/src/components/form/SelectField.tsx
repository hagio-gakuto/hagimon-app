"use client";

import { Select } from "../ui/Select";
import { FormField } from "./FormField";
import { useFormContext } from "react-hook-form";
import type { SelectOption } from "../ui/Select";

type SelectFieldProps = {
  name: string;
  label?: string;
  rules?: Parameters<ReturnType<typeof useFormContext>["register"]>[1];
  options: SelectOption[];
};

export const SelectField = ({
  name,
  label,
  rules,
  options,
}: SelectFieldProps) => {
  const { register, formState } = useFormContext();
  const errors = formState.errors;

  return (
    <FormField name={name} label={label} rules={rules}>
      <Select
        {...register(name, rules)}
        options={options}
        error={errors[name]?.message as string | undefined}
      />
    </FormField>
  );
};
