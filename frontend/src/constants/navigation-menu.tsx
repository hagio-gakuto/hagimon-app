import type { ReactNode } from "react";
import type { UserRole } from "@/types/user";
import {
  DashboardIcon,
  ApplicantIcon,
  UserIcon,
  UserManagementIcon,
  RecruitYearIcon,
} from "@/components/ui/icons";

export type NavigationMenuItem = {
  label: string;
  href: string;
  icon: ReactNode;
  requiredRole: UserRole;
};

export const navigationMenuItems: NavigationMenuItem[] = [
  {
    label: "ダッシュボード",
    href: "/",
    icon: <DashboardIcon />,
    requiredRole: "user",
  },
  {
    label: "応募者一覧",
    href: "/applicants",
    icon: <ApplicantIcon />,
    requiredRole: "user",
  },
  {
    label: "マイページ",
    href: "/mypage",
    icon: <UserIcon />,
    requiredRole: "user",
  },
  {
    label: "ユーザー管理",
    href: "/master/user-management",
    icon: <UserManagementIcon />,
    requiredRole: "master",
  },
  {
    label: "年度管理",
    href: "/master/recruit-year-management",
    icon: <RecruitYearIcon />,
    requiredRole: "master",
  },
];

