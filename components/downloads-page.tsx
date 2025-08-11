"use client";

import { Download, FileText, Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";

const reports = [
  {
    id: 1,
    title: "Sierra Leone Startup Ecosystem Report 2024",
    description:
      "Comprehensive overview of the startup landscape in Sierra Leone",
    type: "PDF",
    size: "4.2 MB",
    date: "May 1, 2024",
    category: "Ecosystem Report",
  },
  {
    id: 2,
    title: "Funding Trends Q1 2024",
    description: "Analysis of investment activity in the first quarter of 2024",
    type: "PDF",
    size: "2.8 MB",
    date: "Apr 15, 2024",
    category: "Funding Report",
  },
  {
    id: 3,
    title: "Sector Analysis: Agriculture Tech",
    description:
      "Deep dive into the agricultural technology sector in Sierra Leone",
    type: "PDF",
    size: "3.5 MB",
    date: "Mar 30, 2024",
    category: "Sector Report",
  },
  {
    id: 4,
    title: "Investor Landscape 2024",
    description: "Overview of active investors in the Sierra Leone ecosystem",
    type: "PDF",
    size: "3.1 MB",
    date: "Mar 15, 2024",
    category: "Investor Report",
  },
  {
    id: 5,
    title: "Startup Founder Survey Results",
    description: "Insights from our annual survey of startup founders",
    type: "PDF",
    size: "2.5 MB",
    date: "Feb 28, 2024",
    category: "Survey Report",
  },
  {
    id: 6,
    title: "Startup Valuation Guide",
    description:
      "Methodology and benchmarks for startup valuations in Sierra Leone",
    type: "PDF",
    size: "1.8 MB",
    date: "Feb 15, 2024",
    category: "Guide",
  },
  {
    id: 7,
    title: "Funding Trends 2023 Annual Report",
    description: "Comprehensive analysis of funding activity in 2023",
    type: "PDF",
    size: "5.2 MB",
    date: "Jan 30, 2024",
    category: "Funding Report",
  },
  {
    id: 8,
    title: "Startup Ecosystem Database",
    description: "Complete database of startups in Sierra Leone (Excel format)",
    type: "XLSX",
    size: "8.4 MB",
    date: "Jan 15, 2024",
    category: "Database",
  },
];

export function DownloadsPage({ reports }: any) {
  return (
    <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Downloads</h1>
          <p className="text-muted-foreground">
            Access reports, guides, and resources
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Resources</CardTitle>
          <CardDescription>
            Download reports and data about the startup ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm" className="md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {reports.map((report: any) => (
                <Card key={report.id} className="flex">
                  <div className="flex items-start flex-1 p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 text-primary">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 ml-4">
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {report.fileType}
                        </Badge>
                        {/* <span className="text-xs text-muted-foreground">
                          {report.size}
                        </span> */}
                        <span className="text-xs text-muted-foreground">
                          {formatDate(report.date)}
                        </span>
                      </div>
                    </div>

                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={report.title}
                      className="inline-flex items-center justify-center text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      title={`Download ${report.title}`}
                    >
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Download className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
