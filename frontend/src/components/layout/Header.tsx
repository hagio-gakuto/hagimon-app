"use client";

import Link from "next/link";
import Image from "next/image";
import { useRecruitYear } from "@/contexts/RecruitYearContext";
import { useUser } from "@/contexts/UserContext";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { themeColors } from "@/constants/theme";
import { Select } from "@/components/ui";
import { Breadcrumb } from "./Breadcrumb";
import { HamburgerMenu } from "./HamburgerMenu";

export const Header = () => {
  const {
    recruitYears,
    selectedRecruitYear,
    setSelectedRecruitYear,
    isLoading,
  } = useRecruitYear();
  const { user } = useUser();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = recruitYears.find(
      (y) => y.recruitYear === Number(event.target.value)
    );
    setSelectedRecruitYear(year || null);
  };

  const backgroundColor =
    selectedRecruitYear?.themeColor || themeColors.primary;
  const { items: breadcrumbItems } = useBreadcrumb();

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{
          backgroundColor,
          color: "#ffffff",
        }}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HamburgerMenu />
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/atsys_logo.svg"
                  alt="Atsys"
                  width={150}
                  height={50}
                  className="h-15 w-auto object-contain"
                  loading="eager"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                {isLoading || !selectedRecruitYear ? (
                  <div className="text-sm">読み込み中...</div>
                ) : (
                  <div className="w-48">
                    <Select
                      id="recruit-year-select"
                      value={selectedRecruitYear.recruitYear}
                      onChange={handleYearChange}
                      options={recruitYears.map((year) => ({
                        value: year.recruitYear,
                        label: year.displayName,
                      }))}
                      className="bg-white text-gray-900"
                      style={{
                        borderColor: themeColors.border,
                      }}
                    />
                  </div>
                )}

                {user && (
                  <Link
                    href="/mypage"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-col"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden"
                      style={{
                        backgroundColor: user.imageUrl
                          ? "transparent"
                          : "rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {user.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="sticky z-40 w-full bg-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-end">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
    </>
  );
};
