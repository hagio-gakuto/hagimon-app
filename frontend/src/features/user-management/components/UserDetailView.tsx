"use client";

import { Button } from "@/components/ui";
import { formatDateToJST } from "@/libs/date-utils";
import { roleLabelMap, genderLabelMap } from "../constants/user.constants";
import type { UserResponseDto } from "@/types/user";

type UserDetailViewProps = {
  user: UserResponseDto;
  onEdit: () => void;
  onBack: () => void;
};

export const UserDetailView = ({
  user,
  onEdit,
  onBack,
}: UserDetailViewProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">ID</div>
          <p className="text-sm text-gray-900">{user.id}</p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </div>
          <p className="text-sm text-gray-900">{user.email}</p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">姓</div>
          <p className="text-sm text-gray-900">{user.lastName}</p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">名</div>
          <p className="text-sm text-gray-900">{user.firstName}</p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            権限
          </div>
          <p className="text-sm text-gray-900">{roleLabelMap[user.role]}</p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            性別
          </div>
          <p className="text-sm text-gray-900">
            {user.gender ? genderLabelMap[user.gender] : "-"}
          </p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            作成日時
          </div>
          <p className="text-sm text-gray-900">
            {formatDateToJST(user.createdAt)}
          </p>
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            更新日時
          </div>
          <p className="text-sm text-gray-900">
            {formatDateToJST(user.updatedAt)}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          一覧に戻る
        </Button>
        <Button variant="primary" onClick={onEdit}>
          編集
        </Button>
      </div>
    </>
  );
};
