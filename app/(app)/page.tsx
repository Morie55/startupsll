import { HomePage } from "@/components/home-page";
import { geDashboardStats } from "../actions/dashboardStat";
import { fetchEvents } from "../actions/event-actions";
import { getAllRounds } from "../actions/round-actions";

export default async function Home() {
  const stats = await geDashboardStats();
  const upcomingEvents =
    (await fetchEvents({ type: "upcoming" })).events?.slice(0, 4) || [];

  return <HomePage stats={stats} upcomingEvents={upcomingEvents} />;
}
