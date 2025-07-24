"use server";

import { notFound } from "next/navigation";
import { getCompany } from "@/app/actions/company-actions";
import CompanyEditForm from "@/components/company-edit-form";

export default async function CompanyEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // Fetch the company data server-side
  const companyData = await getCompany(id);

  // If company not found, show 404
  // if (!companyData || !companyData.success) {
  //   notFound();
  // }

  return <CompanyEditForm company={companyData} />;
}
