import Image from "next/image";
import { Calendar, ExternalLink, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// const newCompanies = [
//   {
//     id: 1,
//     name: "TechInnovate",
//     logo: "/placeholder.svg?height=40&width=40",
//     description: "Software development and IT consulting services",
//     location: "Freetown",
//     founded: "May 2024",
//     employees: "10-20",
//   },
//   {
//     id: 2,
//     name: "GreenFarms",
//     logo: "/placeholder.svg?height=40&width=40",
//     description: "Organic farming and sustainable agriculture",
//     location: "Bo",
//     founded: "April 2024",
//     employees: "5-10",
//   },
//   {
//     id: 3,
//     name: "UrbanMobility",
//     logo: "/placeholder.svg?height=40&width=40",
//     description: "Transportation and logistics solutions",
//     location: "Freetown",
//     founded: "April 2024",
//     employees: "10-20",
//   },
//   {
//     id: 4,
//     name: "EduLearn",
//     logo: "/placeholder.svg?height=40&width=40",
//     description: "Educational technology and e-learning platforms",
//     location: "Kenema",
//     founded: "March 2024",
//     employees: "5-10",
//   },
// ];

export function NewCompaniesList({ newCompany }: { newCompany: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {newCompany?.map((company) => (
        <Card key={company._id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-md bg-muted">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold">{company.name}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {company.description}
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-3.5 w-3.5" />
                {company.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-3.5 w-3.5" />
                Founded {company.founded}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="mr-2 h-3.5 w-3.5" />
                {company.employees} employees
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Profile <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
