"use client";

import { Select } from "../ui/Select";
import { FormField } from "./FormField";
import { useFormContext, useFormState } from "react-hook-form";
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
  const { register, control } = useFormContext();
  const { errors } = useFormState({ control });

  return (
    <FormField name={name} label={label}>
      <Select
        {...register(name, rules)}
        options={options}
        error={errors[name]?.message as string | undefined}
      />
    </FormField>
  );
};
