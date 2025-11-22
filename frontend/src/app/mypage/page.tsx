"use client";

import { useEffect } from "react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { MyPage as MyPageComponent } from "@/features/mypage/components/MyPage";

export default function MyPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ label: "ホーム", href: "/" }, { label: "マイページ" }]);
  }, [setItems]);

  return <MyPageComponent />;
}
