"use client";

import { useParams } from "next/navigation";
import { UserDetail } from "@/features/user-management/components/UserDetail";
import { UserForm } from "@/features/user-management/components/UserForm";

export default function UserDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return null;
  }

  if (id === "new") {
    return <UserForm />;
  }

  return <UserDetail userId={id} />;
}
