"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronRight,
  Download,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import CompanyProfileSkeletonWithSidebar from "./CompanyProfileSkeletonWithSidebar";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestStartups } from "@/app/actions/lastest-startups";
// Fix: Import the TypeScript interface instead of the Mongoose model
import type { Company } from "@/types/company";

export function HomePage({
  stats,
  upcomingEvents,
}: {
  stats: any;
  upcomingEvents: any;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(true);
  // Now this will work correctly with the TypeScript interface
  const [startups, setStartups] = useState<Company[]>([]);

  useEffect(() => {
    async function fetchStartups() {
      const latestStartups = await getLatestStartups();
      setStartups(latestStartups);
    }
    fetchStartups();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (user && !user?.publicMetadata?.onboardingCompleted) {
      if (pathname !== "/onboarding") {
        router.push("/onboarding");
        return;
      }
    } else if (user && user?.publicMetadata?.onboardingCompleted) {
      if (pathname === "/onboarding") {
        const role = user?.publicMetadata?.role;
        const companyId = user?.publicMetadata?.companyId;
        if (role === "investor") {
          router.push(`/investors/${companyId}`);
        } else {
          router.push(`/companies/${companyId}`);
        }
        return;
      }
    }
    setRedirecting(false);
  }, [isLoaded, pathname, user, router]);

  if (!isLoaded || redirecting) {
    return <CompanyProfileSkeletonWithSidebar />;
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg bg-primary text-primary-foreground">
        <div className="relative z-10 px-6 py-12 md:px-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              Welcome to StartUpSL
            </h1>
            <p className="mb-8 text-lg md:text-xl">
              Your gateway to Sierra Leone's thriving startup ecosystem
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/companies">Explore Startups</Link>
              </Button>
              <Button
                className="text-gray-400"
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        <Image
          src="/images/placeholder-logo.jpg?height=720&width=1280"
          alt="StartUpSL Hero"
          width={1280}
          height={720}
          className="absolute inset-0 object-cover w-full h-full opacity-55"
        />
      </section>

      {/* Key Statistics */}
      <section>
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          Ecosystem Overview
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Companies"
            value={stats.companies.total.toLocaleString()}
            description={`${stats.companies.change > 0 ? "+" : ""}${
              stats.companies.change
            }% from last month`}
            icon={<Building2 className="w-4 h-4" />}
            trend={stats.companies.change > 0 ? "up" : "down"}
          />
          <StatCard
            title="Rounds"
            value={stats.rounds.total?.toLocaleString()}
            description={`${stats.rounds.change > 0 ? "+" : ""}${
              stats.rounds.change
            }% from last month`}
            icon={<TrendingUp className="w-4 h-4" />}
            trend={stats.rounds.change > 0 ? "up" : "down"}
          />
          <StatCard
            title="Employees"
            value={` ${stats.employees.range}`}
            description={`${stats.employees.change > 0 ? "+" : ""}${
              stats.employees.change
            }% from last month`}
            icon={<Users className="w-4 h-4" />}
            trend={stats.employees.change > 0 ? "up" : "down"}
          />
          <StatCard
            title="VC Investment"
            value={`$${stats.vcInvestment.total.toFixed(1)}M`}
            description={`${stats.vcInvestment.change > 0 ? "+" : ""}${
              stats.vcInvestment.change
            }% from last month`}
            icon={<BarChart3 className="w-4 h-4" />}
            trend={stats.vcInvestment.change > 0 ? "up" : "down"}
          />
        </div>
      </section>

      {/* Featured Sections */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Latest Startups</CardTitle>
            <CardDescription>
              Discover new companies in the ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stats.newCompany.length > 0 ? (
                stats.newCompany.map((startup: any) => (
                  <li
                    key={startup._id}
                    className="flex items-center justify-between"
                  >
                    <span>{startup.name}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/companies/${startup._id}`}>
                        View <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground">
                  No startups found. Please check back later please.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Connect with the community</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event: any) => (
                  <li
                    key={event._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/events/${event._id}`}>
                        Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground">
                  No upcoming events found.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Resources</CardTitle>
            <CardDescription>Access reports and guides</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Startup Ecosystem Report 2024</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/downloads">
                    Download <Download className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Funding Trends Q1 2024</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/downloads">
                    Download <Download className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="p-6 rounded-lg bg-muted md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Join the StartUpSL Community
          </h2>
          <p className="mb-6 text-muted-foreground">
            Whether you're a founder, investor, or startup enthusiast, there's a
            place for you in our ecosystem.
          </p>
          <Button size="lg" asChild>
            <Link href="/about">
              Get Involved <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
