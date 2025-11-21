"use client";

import {
  useForm,
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
} from "react-hook-form";
import type { FormHTMLAttributes } from "react";

export type FormProps<T extends FieldValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "children"
> &
  Omit<UseFormProps<T>, "resolver"> & {
    onSubmit: (data: T) => void | Promise<void>;
    children: (methods: UseFormReturn<T>) => React.ReactNode;
  };

export const Form = <T extends FieldValues>({
  onSubmit,
  children,
  className,
  mode = "onBlur",
  ...formOptions
}: FormProps<T>) => {
  const methods = useForm<T>({
    mode,
    reValidateMode: "onChange",
    ...formOptions,
  });

  const handleSubmit = methods.handleSubmit(
    async (data) => {
      await onSubmit(data);
    },
    (errors) => {
      // バリデーションエラーがある場合、最初のエラーフィールドにフォーカス
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(
          `[name="${firstErrorField}"]`
        ) as HTMLElement;
        element?.focus();
      }
    }
  );

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {children(methods)}
    </form>
  );
};
