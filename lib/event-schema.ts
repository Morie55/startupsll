import { z } from "zod";

// Enums for select fields
export const EventCategory = z.enum([
  "networking",
  "workshop",
  "meetup",
  "conference",
  "investment",
  "training",
  "other",
]);

export const EventType = z.enum(["free", "paid", "donation"]);

export const SponsorTier = z.enum(["platinum", "gold", "silver", "bronze"]);

// Speaker schema
export const SpeakerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Speaker name is required"),
  title: z.string().min(1, "Speaker title is required"),
  company: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().nullable().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

// Agenda item schema
export const AgendaItemSchema = z.object({
  id: z.string(),
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  speaker: z.string().optional(),
});

// Sponsor schema
export const SponsorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Sponsor name is required"),
  logo: z.string().nullable().optional(),
  website: z.string().url().optional().or(z.literal("")),
  tier: SponsorTier,
});

// FormData-compatible schema for Server Actions
export const CreateEventFormSchema = z
  .object({
    // Basic Information
    title: z.string().min(1, "Event title is required"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(200, "Description must be 200 characters or less"),
    fullDescription: z.string().optional(),
    category: EventCategory,

    // Date & Time
    date: z.string().min(1, "Event date is required"),
    time: z.string().min(1, "Start time is required"),
    endTime: z.string().optional(),

    // Location
    location: z.string().min(1, "Venue name is required"),
    address: z.string().optional(),

    // Capacity
    maxAttendees: z.coerce
      .number()
      .min(1, "Maximum attendees must be at least 1"),

    // Event Type & Pricing
    eventType: EventType,
    ticketPrice: z.coerce.number().min(0).optional(),
    registrationDeadline: z
      .string()
      .min(1, "Registration deadline is required"),

    // Contact & Requirements
    contactEmail: z
      .string()
      .min(1, "Contact email is required")
      .email("Please enter a valid email address"),
    contactPhone: z.string().optional(),
    requirements: z.string().optional(),
    accessibility: z.string().optional(),

    // Social Media & Links
    website: z.string().url().optional().or(z.literal("")),
    socialMedia: z.string().optional(),

    // File upload
    banner: z.instanceof(File).optional(),

    // JSON strings for complex data (from hidden inputs)
    speakers: z
      .string()
      .optional()
      .transform((str) => {
        if (!str) return [];
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
      .pipe(z.array(SpeakerSchema)),

    agenda: z
      .string()
      .optional()
      .transform((str) => {
        if (!str) return [];
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
      .pipe(z.array(AgendaItemSchema)),

    sponsors: z
      .string()
      .optional()
      .transform((str) => {
        if (!str) return [];
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
      .pipe(z.array(SponsorSchema)),

    tags: z
      .string()
      .optional()
      .transform((str) => {
        if (!str) return [];
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
      .pipe(z.array(z.string())),
  })
  .refine(
    (data) => {
      if (
        data.eventType === "paid" &&
        (!data.ticketPrice || data.ticketPrice <= 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Ticket price is required for paid events",
      path: ["ticketPrice"],
    }
  );

// Type inference
export type CreateEventFormInput = z.infer<typeof CreateEventFormSchema>;
export type Speaker = z.infer<typeof SpeakerSchema>;
export type AgendaItem = z.infer<typeof AgendaItemSchema>;
export type Sponsor = z.infer<typeof SponsorSchema>;

export const CreateEventSchema = CreateEventFormSchema;
export type CreateEventInput = CreateEventFormInput;
