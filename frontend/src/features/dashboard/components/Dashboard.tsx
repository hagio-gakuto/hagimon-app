"use client";

import Link from "next/link";
import { useRecruitYear } from "@/contexts/RecruitYearContext";
import { useAuth } from "@/hooks/useAuth";
import { Title, PageContainer } from "@/components/ui";
import type { UserRole } from "@/types/user";

type DashboardLink = {
  href: string;
  label: string;
  description: string;
  requiredRole: UserRole;
};

const dashboardLinks: DashboardLink[] = [
  {
    href: "/applicants",
    label: "応募者検索",
    description: "応募者情報を検索・閲覧します",
    requiredRole: "user",
  },
  {
    href: "/mail/management",
    label: "メール管理",
    description: "メールの送信・管理を行います",
    requiredRole: "user",
  },
  {
    href: "/admin/bulk-processing",
    label: "一括処理",
    description: "一括での処理を実行します",
    requiredRole: "admin",
  },
  {
    href: "/master/recruit-year-management",
    label: "年度管理",
    description: "年度の追加・編集を行います",
    requiredRole: "master",
  },
  {
    href: "/master/user-management",
    label: "ユーザー管理",
    description: "ユーザーの追加・編集を行います",
    requiredRole: "master",
  },
];

export const Dashboard = () => {
  const { selectedRecruitYear } = useRecruitYear();
  const { hasRole } = useAuth();

  const visibleLinks = dashboardLinks.filter((link) =>
    hasRole(link.requiredRole)
  );

  return (
    <PageContainer>
      <Title>ダッシュボード</Title>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">機能一覧</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {link.label}
              </h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
        {visibleLinks.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            表示できるリンクがありません
          </p>
        )}
      </div>
    </PageContainer>
  );
};
