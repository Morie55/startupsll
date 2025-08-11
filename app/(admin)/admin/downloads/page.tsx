import { Download } from "lucide-react";
import React from "react";
import DownloadsPage from "../../_components/DownloadPage";
import { getResources } from "@/app/actions/resource-actions";

const page = async () => {
  const documents = await getResources();
  return (
    <div>
      <DownloadsPage documents={documents} />
    </div>
  );
};

export default page;
