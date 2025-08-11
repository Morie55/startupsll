import mongoose, { Schema, Document, Model } from "mongoose";

const ResourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    default: "PDF",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);

export default Resource;
