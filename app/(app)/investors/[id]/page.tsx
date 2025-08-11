import { getInvestorByIdAction } from "@/app/actions/investor-actions";
import InvestorDetails from "@/components/investor-details";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function InvestorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await currentUser();

  // Find investor by ID from the params
  const { investor } = await getInvestorByIdAction(id);
  if (!investor) {
    redirect("/investors");
  }

  if (user?.id !== investor.userId && investor.status !== "approved") {
    redirect("/investors");
  }

  console.log(investor);
  return (
    <div>
      <InvestorDetails investor={investor} />
    </div>
  );
}
