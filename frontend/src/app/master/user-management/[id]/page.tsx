"use client";

import { useParams } from "next/navigation";
import { UserDetail } from "@/features/user-management/components/UserDetail";

export default function UserDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return null;
  }

  return <UserDetail userId={id} />;
}
