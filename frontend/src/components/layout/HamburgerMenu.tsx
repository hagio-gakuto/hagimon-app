"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { navigationMenuItems } from "@/constants/navigation-menu";
import type { UserRole } from "@/types/user";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasRole } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const visibleMenuItems = navigationMenuItems.filter((item) =>
    hasRole(item.requiredRole)
  );

  const menuItemsByRole = visibleMenuItems.reduce((acc, item) => {
    if (!acc[item.requiredRole]) {
      acc[item.requiredRole] = [];
    }
    acc[item.requiredRole].push(item);
    return acc;
  }, {} as Record<UserRole, typeof navigationMenuItems>);

  const roleLabels: Record<UserRole, string> = {
    user: "一般ユーザー",
    admin: "管理者",
    master: "マスター",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="メニューを開く"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-gray-200/60 z-90"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-100 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  メニュー
                </h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                  aria-label="メニューを閉じる"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ul className="py-4">
                  {(Object.keys(menuItemsByRole) as UserRole[]).map((role) => (
                    <li key={role}>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {roleLabels[role]}
                      </div>
                      {menuItemsByRole[role].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-gray-600">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
