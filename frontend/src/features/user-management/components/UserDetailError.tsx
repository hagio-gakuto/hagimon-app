"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { errorMessages } from "@/constants/error-messages";

type UserDetailErrorProps = {
  error: string | null;
};

export const UserDetailError = ({ error }: UserDetailErrorProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800 text-sm">
          {error || errorMessages.userNotFound}
        </p>
      </div>
      <div className="mt-4">
        <Button
          variant="outline"
          onClick={() => router.push("/master/user-management")}
        >
          一覧に戻る
        </Button>
      </div>
    </div>
  );
};
