"use client";

import { useState, useRef, useCallback } from "react";

interface FileUploadZoneProps {
  accept: "pdf" | "csv";
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  progress?: number;
}

export default function FileUploadZone({
  accept,
  onFileSelect,
  isLoading = false,
  progress = 0,
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptMime = accept === "pdf" ? ".pdf,application/pdf" : ".csv,text/csv";
  const acceptLabel = accept === "pdf" ? "PDF" : "CSV";

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={acceptMime}
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload ${acceptLabel} file`}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="border-2 border-dashed border-emerald/40 rounded-card bg-emerald/5 p-10">
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-emerald animate-spin" />
            <p className="text-sm font-medium text-charcoal">
              Parsing your {acceptLabel} file...
            </p>
            {progress > 0 && (
              <div className="w-full max-w-xs">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-emerald transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate text-center">{progress}%</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected file display */}
      {!isLoading && selectedFile && (
        <div className="border-2 border-solid border-emerald/30 rounded-card bg-emerald/5 p-6">
          <div className="flex items-center gap-4">
            {/* File icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-emerald/10">
              {accept === "pdf" ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="16" y2="17" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate mt-0.5">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="shrink-0 rounded-btn p-2 text-slate hover:text-danger hover:bg-danger/10 transition-colors"
              aria-label="Remove file"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Drop zone */}
      {!isLoading && !selectedFile && (
        <button
          type="button"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-full border-2 border-dashed rounded-card p-10 cursor-pointer
            transition-colors duration-200 text-left
            ${
              isDragOver
                ? "border-emerald bg-emerald/5"
                : "border-gray-300 bg-white hover:border-emerald/50 hover:bg-gray-50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-3">
            {/* Upload icon */}
            <div
              className={`
                flex h-14 w-14 items-center justify-center rounded-full
                ${isDragOver ? "bg-emerald/10" : "bg-gray-100"}
              `}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDragOver ? "#10B981" : "#64748B"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-charcoal">
                Drag &amp; drop your 1099-DA {acceptLabel} here
              </p>
              <p className="mt-1 text-xs text-slate">
                or click to browse
              </p>
            </div>
            <span className="inline-block mt-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-slate">
              Accepts .{accept.toLowerCase()} files
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
