"use client";

import { useFormContext, useFormState } from "react-hook-form";

type FormFieldProps = {
  name: string;
  label?: string;
  children?: React.ReactNode;
};

export const FormField = ({ name, label, children }: FormFieldProps) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const fieldError = errors[name];
  const errorMessage =
    typeof fieldError?.message === "string" ? fieldError.message : undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-medium text-sm text-gray-700">{label}</label>
      )}

      {children}

      {errorMessage && (
        <p className="text-red-500 text-xs" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
