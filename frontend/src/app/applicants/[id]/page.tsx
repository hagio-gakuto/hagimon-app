"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { ApplicantDetail } from "@/features/applicant/components/ApplicantDetail";

export default function ApplicantDetailPage() {
  const params = useParams();
  const { setItems } = useBreadcrumb();
  const applicantId = params?.id as string;

  useEffect(() => {
    setItems([
      { label: "ホーム", href: "/" },
      { label: "応募者検索・一覧", href: "/applicants" },
      { label: "応募者詳細" },
    ]);
  }, [setItems]);

  return <ApplicantDetail applicantId={applicantId} />;
}
