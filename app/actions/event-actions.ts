"use server";

import { connect } from "@/lib/mongoDB";
import Event from "@/models/Event";

// Define filters type
interface FetchEventsParams {
  type?: "upcoming" | "past";
  category?: string;
  search?: string;
}

// 1️⃣ Create Event
export async function createEvent(data: any) {
  await connect();

  try {
    const event = await Event.create({
      ...data,
      slug:
        data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
        new Date().getTime(), // Generate a unique slug
    });

    return JSON.parse(JSON.stringify({ success: true, event }));
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: (error as Error).message };
  }
}

// 2️⃣ Fetch Events with Filters
export async function fetchEvents({
  type,
  category,
  search,
}: FetchEventsParams): Promise<{
  success: boolean;
  events?: any[];
  error?: string;
}> {
  await connect();

  const query: Record<string, unknown> = {};

  // 📌 Search by title or description
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // 📌 Filter by category
  if (category && category !== "All Categories") {
    query.category = category.toLowerCase();
  }

  // 📌 Filter by upcoming or past
  const now = new Date();
  if (type === "upcoming") {
    query.date = { $gte: now };
  } else if (type === "past") {
    query.date = { $lt: now };
  }

  try {
    const events = await Event.find(query).sort({ date: 1 });
    return JSON.parse(JSON.stringify({ success: true, events }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, error: (error as Error).message };
  }
}

// 3️⃣ Fetch Event by ID
export async function fetchEventById(id: string): Promise<{
  success: boolean;
  event?: any;
  error?: string;
}> {
  await connect();

  try {
    const event = await Event.findById(id);
    if (!event) {
      return { success: false, error: "Event not found" };
    }
    return JSON.parse(JSON.stringify({ success: true, event }));
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return { success: false, error: (error as Error).message };
  }
}
