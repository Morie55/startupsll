import { fetchEventById } from "@/app/actions/event-actions";
import EventDetailPage from "@/components/event-detail-page";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const event = await fetchEventById(id);
  if (!event.success) {
    return <div>Error: {event.error}</div>;
  }

  return <EventDetailPage event={event.event} />;
}
