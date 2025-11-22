"use client";

import { useEffect } from "react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { ApplicantList } from "@/features/applicant/components/ApplicantList";

export default function ApplicantsPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ label: "ホーム", href: "/" }, { label: "応募者検索・一覧" }]);
  }, [setItems]);

  return <ApplicantList />;
}
