"use client";

import { useRef, useState } from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

type CsvUploadButtonProps = Omit<ButtonProps, "onClick"> & {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
};

const UploadIcon = () => (
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
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export const CsvUploadButton = ({
  onUpload,
  accept = ".csv",
  children = "CSVアップロード",
  disabled,
  ...buttonProps
}: CsvUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await onUpload(file);
    } catch (error) {
      console.error("CSVアップロードエラー:", error);
      throw error;
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        {...buttonProps}
        onClick={handleClick}
        disabled={isUploading || disabled}
        className={`bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 ${
          buttonProps.className || ""
        }`}
      >
        <div className="flex items-center gap-2">
          <UploadIcon />
          <span>{isUploading ? "アップロード中..." : children}</span>
        </div>
      </Button>
    </>
  );
};
