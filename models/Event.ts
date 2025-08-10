import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fullDescription: { type: String },
    category: {
      type: String,
      enum: [
        "networking",
        "workshop",
        "meetup",
        "conference",
        "investment",
        "training",
        "other",
      ],
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    endTime: { type: String },
    location: { type: String },
    address: { type: String },
    maxAttendees: { type: Number },
    eventType: {
      type: String,
      enum: ["free", "paid", "donation"],
      required: true,
    },
    ticketPrice: { type: Number, default: 0 },
    registrationDeadline: { type: Date },
    contactEmail: { type: String },
    contactPhone: { type: String },
    requirements: { type: String },
    accessibility: { type: String },
    website: { type: String },
    socialMedia: { type: String },
    tags: [{ type: String }],

    speakers: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        title: { type: String },
        company: { type: String },
        bio: { type: String },
        image: { type: String, default: null },
        linkedin: { type: String },
        twitter: { type: String },
      },
    ],

    agenda: [
      {
        id: { type: String, required: true },
        time: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        speaker: { type: String },
      },
    ],

    sponsors: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        logo: { type: String, default: null },
        website: { type: String },
        tier: {
          type: String,
          enum: ["platinum", "gold", "silver", "bronze"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
