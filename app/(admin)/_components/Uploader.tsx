"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { uploadResource } from "@/app/actions/resource-actions"; // Assuming this path is correct
import { Uploader } from "@/components/Uploader"; // Assuming this path is correct
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Assuming useToast is available
import { useRouter } from "next/navigation";
import { AlarmCheckIcon, AlertCircle, Check } from "lucide-react";
import { sendResourceUploadNotification } from "@/app/actions/mailSender";

const initialState = {
  success: false,
  message: "",
};

export function UploadForm() {
  const [uploadState, setUploadState] = useState(initialState);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [resetUploader, setResetUploader] = useState(false);
  // const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const uploaderRef = useRef<{ reset: () => void }>(null);
  const router = useRouter(); // Assuming you are using Next.js or similar
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Add fileUrl and fileType to formData
    formData.append("fileUrl", fileUrl);
    formData.append("fileType", fileType);

    try {
      setUploading(true);
      setUploadState(initialState);
      const result = await uploadResource(formData);
      await sendResourceUploadNotification("", formData.get("title") as string);
      if (result.success) {
        formRef.current?.reset();
        resetUploaderFiles();
        setResetUploader(false); // Reset the uploader state
        setUploadState({
          success: true,
          message: "Resource uploaded successfully!",
        });

        router.refresh(); // Refresh the page to show the new resource

        setUploading(false);
      } else {
        setUploadState({
          success: false,
          message: result.message || "Failed to upload resource.",
        });
        setUploading(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadState({
        success: false,
        message: "An error occurred while uploading the resource.",
      });
      setUploading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (uploadState.success || !uploadState.message) {
        setUploadState(initialState);
      }
    }, 3000); // Reset state after 5 seconds
  }, [uploadState]);

  // Reset form and state when resetSignal changes
  function resetUploaderFiles() {
    // toggle resetSignal to true, then false to allow repeated resets
    setResetUploader(true);

    if (uploaderRef.current) {
      uploaderRef.current.reset();
    }
    // setTimeout(() => setResetUploader(false), 0);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="title"
        placeholder="Document Title"
        required
        aria-label="Document Title"
      />
      <Textarea
        name="description"
        placeholder="Document Description"
        required
        rows={4}
        aria-label="Document Description"
      />
      <Input
        type="text"
        name="category"
        placeholder="Category (e.g., Reports, Marketing)"
        aria-label="Document Category"
      />
      <Uploader
        ref={uploaderRef}
        multiple={false}
        className="!h-[200px] !w-[300px]"
        accept={{
          "application/pdf": [".pdf"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
            ".xlsx",
          ],
          "application/vnd.ms-excel": [".xls"],
          "application/msword": [".doc", ".docx"],
        }}
        resetSignal={resetUploader}
        maxSizeMB={20}
        uploadTitle="Drag & drop your file here, or click to browse (Max 20MB)"
        onUploadComplete={(urls: string | string[]) => {
          const uploadedUrl = Array.isArray(urls) ? urls[0] ?? "" : urls;
          setFileUrl(uploadedUrl);
          // Attempt to derive file type from extension only
          let detectedFileType = "Other";
          if (uploadedUrl) {
            const ext = uploadedUrl.split(".").pop()?.toLowerCase();
            if (ext === "pdf") detectedFileType = "PDF";
            else if (ext === "xlsx" || ext === "xls")
              detectedFileType = "Excel";
            else if (ext === "docx" || ext === "doc") detectedFileType = "Word";
          }
          setFileType(detectedFileType);
        }}
      />
      {fileUrl && (
        <p className="text-sm text-muted-foreground">
          File selected:{" "}
          <span className="font-medium">{fileUrl.split("/").pop()}</span> (
          {fileType})
        </p>
      )}
      <input type="hidden" name="fileUrl" value={fileUrl} />
      <input type="hidden" name="fileType" value={fileType} />

      {uploadState.message && (
        <div
          className={` h-14 p-2 gap-2 w-full rounded-md flex items-center ${
            uploadState.success ? "bg-green-200" : "bg-red-100"
          }`}
        >
          {uploadState.success ? (
            <Check className="text-green-500" />
          ) : (
            <AlertCircle className="text-red-500" />
          )}
          <p
            className={`text-sm ${
              uploadState.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {uploadState.message}
          </p>
          {/* </div> */}
        </div>
      )}
      <Button
        type="submit"
        className="w-full py-6 md:w-[30%]"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Resource"}
      </Button>
    </form>
  );
}
