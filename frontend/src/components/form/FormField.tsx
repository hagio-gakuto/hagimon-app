"use client";

import { useFormContext } from "react-hook-form";

type FormFieldProps = {
  name: string;
  label?: string;
  children?: React.ReactNode;
  rules?: Parameters<ReturnType<typeof useFormContext>["register"]>[1];
};

export const FormField = ({ name, label, children, rules }: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-medium text-sm text-gray-700">{label}</label>
      )}

      {children || <input {...register(name, rules)} />}

      {errorMessage && (
        <p className="text-red-500 text-xs" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
