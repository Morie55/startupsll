"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Loader2, Trash2, Upload } from "lucide-react";

export function Uploader({
  multiple = false,
  accept = { "image/*": [] },
  onUploadComplete,
  className = "",
  uploadTitle = "Upload File",
  maxSizeMB = 10,
}: {
  multiple?: boolean;
  accept?: { [mime: string]: string[] };
  onUploadComplete: (urls: string[] | string) => void;
  className?: string;
  uploadTitle?: string;
  maxSizeMB?: number;
}) {
  const [files, setFiles] = useState<any[]>([]);

  const removeFile = async (fileId: string) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (!fileToRemove) return;

    const updatedFiles = files.filter((f) => f.id !== fileId);

    if (fileToRemove.key) {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, isDeleting: true } : f))
      );

      try {
        await fetch("/api/s3/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: fileToRemove.key }),
        });

        toast.success("File removed successfully");
      } catch {
        toast.error("Failed to remove file");
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, isDeleting: false, error: true } : f
          )
        );
        return;
      }
    } else {
      if (fileToRemove.objectUrl) URL.revokeObjectURL(fileToRemove.objectUrl);
    }

    setFiles(updatedFiles);

    if (multiple) {
      onUploadComplete(updatedFiles.map((f) => f.objectUrl));
    } else {
      onUploadComplete("");
    }
  };

  const uploadFile = async (file: File) => {
    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          const percent = (event.loaded / event.total) * 100;
          setFiles((prev) =>
            prev.map((f) =>
              f.file === file ? { ...f, progress: Math.round(percent), key } : f
            )
          );
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            const uploadedUrl = presignedUrl?.split("?")[0];

            if (uploadedUrl) {
              setFiles((prev) =>
                prev.map((f) =>
                  f.file === file
                    ? {
                        ...f,
                        progress: 100,
                        uploading: false,
                        error: false,
                        objectUrl: uploadedUrl,
                        key,
                      }
                    : f
                )
              );
              const updatedFiles = files.map((f) =>
                f.file === file ? { ...f, objectUrl: uploadedUrl, key } : f
              );
              onUploadComplete(
                multiple ? updatedFiles.map((f) => f.objectUrl) : uploadedUrl
              );
            }

            resolve();
          } else reject();
        };

        xhr.onerror = reject;
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch {
      toast.error("Upload failed");
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, uploading: false, error: true } : f
        )
      );
    }
  };

  const onDrop = useCallback(
    (accepted: File[]) => {
      const newFiles = accepted.map((file) => ({
        id: uuidv4(),
        file,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(file),
      }));

      const finalFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(finalFiles);
      accepted.forEach(uploadFile);
    },
    [multiple, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: multiple ? 5 : 1,
    multiple,
    maxSize: maxSizeMB * 1024 * 1024,
    accept,
    onDropRejected(rejections) {
      for (const r of rejections) {
        r.errors.forEach((e) => toast.error(e.message));
      }
    },
  });

  useEffect(() => {
    return () =>
      files.forEach((f) => f.objectUrl && URL.revokeObjectURL(f.objectUrl));
  }, [files]);

  return (
    <>
      {(multiple || files.length === 0) && (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed w-full cursor-pointer rounded-lg transition-all duration-200",
            "h-40 sm:h-48 md:h-56 lg:h-64", // Responsive height
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary",
            className
          )}
        >
          <CardContent className="flex items-center justify-center h-full">
            <input {...getInputProps()} />
            <div className="px-2 space-y-2 text-center">
              <p className="text-sm sm:text-base">{uploadTitle}</p>
              <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer h-9 bg-slate-900 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:text-slate-500">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!!files.length && (
        <div
          className={`grid gap-4 mt-6 ${
            multiple
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {files.map((f) => (
            <div key={f.id} className="flex flex-col gap-1">
              <div
                className={`relative w-full overflow-hidden rounded-lg aspect-square ${className}`}
              >
                {(() => {
                  if (f.file.type.startsWith("image/")) {
                    return (
                      <img
                        src={f.objectUrl}
                        alt={f.file.name}
                        className="object-cover w-full h-full"
                      />
                    );
                  } else if (f.file.type.startsWith("video/")) {
                    return (
                      <div className="flex items-center justify-center w-full h-full text-5xl text-gray-500 bg-gray-100">
                        🎬
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center justify-center w-full h-full text-5xl text-gray-500 bg-accent dark:bg-slate-600">
                        📄
                      </div>
                    );
                  }
                })()}

                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute z-20 top-2 right-2 sm:top-3 sm:right-3"
                  onClick={() => removeFile(f.id)}
                  disabled={f.isDeleting}
                >
                  {f.isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
                {f.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
                    {f.progress}%
                  </div>
                )}
                {f.error && (
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-red-500/50">
                    Error
                  </div>
                )}
              </div>
              <p className="px-1 text-xs truncate sm:text-sm text-muted-foreground">
                {f.file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
