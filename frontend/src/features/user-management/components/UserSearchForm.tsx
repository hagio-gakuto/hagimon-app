"use client";

import { useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui";
import { TextField, SelectField } from "@/components/form";
import { roleOptions, genderOptions } from "../constants/user.constants";
import type { UserRole, Gender } from "@/types/user";

type UserSearchFormData = {
  search: string;
  role: UserRole | "";
  gender: Gender | "";
};

type UserSearchFormProps = {
  onSearch: (data: UserSearchFormData) => void;
  onReset: () => void;
  searchParams: UserSearchFormData;
};

export const UserSearchForm = ({
  onSearch,
  onReset,
  searchParams,
}: UserSearchFormProps) => {
  const methods = useForm<UserSearchFormData>({
    defaultValues: searchParams,
    mode: "onBlur",
  });

  const prevSearchParamsRef = useRef<UserSearchFormData>(searchParams);

  useEffect(() => {
    if (
      JSON.stringify(prevSearchParamsRef.current) !==
      JSON.stringify(searchParams)
    ) {
      methods.reset(searchParams);
      prevSearchParamsRef.current = searchParams;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = methods.handleSubmit((data) => {
    onSearch(data);
  });

  const handleReset = () => {
    methods.reset({ search: "", role: "", gender: "" });
    onReset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <TextField
              name="search"
              label="検索"
              placeholder="メールアドレス、名前で検索"
            />
          </div>
          <div className="w-40">
            <SelectField name="role" label="権限" options={roleOptions} />
          </div>
          <div className="w-40">
            <SelectField name="gender" label="性別" options={genderOptions} />
          </div>
          <Button type="submit">検索</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            リセット
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
