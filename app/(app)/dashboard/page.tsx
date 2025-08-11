import { geDashboardStats } from "@/app/actions/dashboardStat";
import { getAllRounds } from "@/app/actions/round-actions";
import { DashboardPage } from "@/components/dashboard-page";

export default async function Dashboard() {
  const stats = await geDashboardStats();
  const rounds = (await getAllRounds()).slice(0, 4) || [];

  // console.log(rounds);
  return <DashboardPage stats={stats} rounds={rounds} />;
}
