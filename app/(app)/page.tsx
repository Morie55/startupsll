import { HomePage } from "@/components/home-page";
import { geDashboardStats } from "../actions/dashboardStat";

export default async function Home() {
  const stats = await geDashboardStats();
  return <HomePage stats={stats} />;
}
