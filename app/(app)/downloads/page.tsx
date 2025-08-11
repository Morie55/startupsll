import { getResources } from "@/app/actions/resource-actions";
import { DownloadsPage } from "@/components/downloads-page";
import { get } from "lodash";

export default async function Downloads() {
  const reports = await getResources();
  return <DownloadsPage reports={reports} />;
}
