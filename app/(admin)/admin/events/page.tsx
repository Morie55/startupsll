import { fetchEvents } from "@/app/actions/event-actions";
import React from "react";
import EventTableComponent from "../../_components/events-table";

const page = async () => {
  const { events } = await fetchEvents({});

  return (
    <div>
      <EventTableComponent events={events} />
    </div>
  );
};

export default page;
