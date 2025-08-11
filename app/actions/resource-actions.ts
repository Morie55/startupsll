"use server";

import { connect } from "@/lib/mongoDB";
import Resource from "@/models/Resources";

export async function uploadResource(formData: FormData) {
  // Extract form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const fileType = formData.get("fileType") as string | undefined;

  try {
    // Connect to DB
    await connect();
    // Check if resource already exists

    // Save resource document
    const resource = new Resource({
      title,
      description,
      category,
      fileUrl,
      fileType,
      date: new Date(),
    });

    await resource.save();

    return {
      success: true,
      message: "Resource uploaded and saved successfully.",
    };
  } catch (error) {
    console.error("Failed to save resource:", error);
    return {
      success: false,
      message: "Failed to upload resource due to server error.",
    };
  }
}

export async function getResources() {
  try {
    // Connect to DB
    await connect();

    // Fetch all resources
    const resources = await Resource.find().sort({ date: -1 });

    return JSON.parse(JSON.stringify(resources));
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}

export async function deleteResource(id: string) {
  try {
    // Connect to DB
    await connect();

    // Find and delete the resource by ID
    const result = await Resource.findByIdAndDelete(id);

    if (!result) {
      return { success: false, message: "Resource not found." };
    }

    return { success: true, message: "Resource deleted successfully." };
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return {
      success: false,
      message: "Failed to delete resource due to server error.",
    };
  }
}
