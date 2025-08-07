// import { connectS } from '../lib/mongoDB'

// import Company, { type ICompany } from "../models/Company"
import { connect } from "@/lib/mongoDB";
import Company from "@/models/Company";

export async function getLatestStartups(): Promise<any[]> {
  try {
    await connect();

    const startups = await Company.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // Convert MongoDB ObjectId to string
    return startups.map((startup: any) => ({
      ...startup,
      _id: startup._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching startups:", error);
    return [];
  }
}
