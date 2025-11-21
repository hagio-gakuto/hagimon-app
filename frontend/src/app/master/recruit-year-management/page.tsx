"use client";

import { useEffect } from "react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { RecruitYearManagement } from "@/features/recruit-year-management/components/RecruitYearManagement";

export default function RecruitYearManagementPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ label: "ホーム", href: "/" }, { label: "年度管理" }]);
  }, [setItems]);

  return <RecruitYearManagement />;
}
