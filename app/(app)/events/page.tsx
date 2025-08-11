import { fetchEvents } from "@/app/actions/event-actions";
import EventsPage from "@/components/events-page";

export default async function Page() {
  const upcomingEvents = await fetchEvents({
    type: "upcoming",
    status: "approved",
  });
  const pastEvents = await fetchEvents({ type: "past", status: "approved" });

  return (
    <EventsPage
      upcomingEvents={upcomingEvents.events}
      pastEvents={pastEvents.events}
    />
  );
}
