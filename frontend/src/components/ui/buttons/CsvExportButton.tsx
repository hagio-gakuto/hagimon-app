"use client";

import { useState } from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

type CsvExportButtonProps = Omit<ButtonProps, "onClick"> & {
  onExport: () => Promise<void>;
};

const DownloadIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

export const CsvExportButton = ({
  onExport,
  children = "CSV出力",
  disabled,
  ...buttonProps
}: CsvExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleClick = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      disabled={isExporting || disabled}
      className={`bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 ${
        buttonProps.className || ""
      }`}
    >
      <div className="flex items-center gap-2">
        <DownloadIcon />
        <span>{isExporting ? "出力中..." : children}</span>
      </div>
    </Button>
  );
};
