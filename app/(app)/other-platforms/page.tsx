"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Globe,
  Lightbulb,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Briefcase,
  Newspaper,
  Video,
  Filter,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function OtherPlatforms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const platforms = [
    {
      id: 1,
      name: "Awansabi",
      description: "Central hub for online education and mentorship.",
      url: "http://awansabi.com/",
      category: "Education",
      icon: <Lightbulb className="w-5 h-5" />,
      status: "Active",
      features: ["Startup Incubation", "Mentorship", "Funding Support"],
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: 2,
      name: "Innosl digital",
      description: "Innovation Sl portfolio for all IT stuffs.",
      url: "https://innosldigital.com/",
      category: "Community",
      icon: <Users className="w-5 h-5" />,
      status: "Active",
      features: ["Networking", "Events", "Job Board"],
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "Innosl",
      description: "Official Innovation SL Website.",
      url: "https://www.innosl.com/",
      category: "",
      icon: <BookOpen className="w-5 h-5" />,
      status: "Active",
      features: ["Event", "Innovation", "Pitch", "Workshops"],
      color: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      name: "Freetown Pitchnight",
      description:
        "Monthly pitch event connecting startups with investors and mentors.",
      url: "https://www.freetownpitchnight.com/",
      category: "Events",
      icon: <Calendar className="w-5 h-5" />,
      status: "Active",
      features: ["Pitch Competition", "Networking"],
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 5,
      name: "Freetown Innovation Week",
      description:
        "Annual event celebrating innovation and entrepreneurship in Sierra Leone.",
      url: "https://freetowninnovationweek.com/",
      category: "Events",
      icon: <MessageSquare className="w-5 h-5" />,
      status: "Active",
      features: ["Innovation", "Entrepreneurship", "Knowledge Sharing"],
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 8,
      name: "Salone Crowdfunder",
      description:
        "Crowdfunding platform empowering startups and innovative projects to secure funding.",
      url: "https://salonecrowdfunder.com/",
      category: "Funding",
      icon: <Video className="w-5 h-5" />,
      status: "Active",
      features: ["Campaign Management", "Investor Network", "Project Showcase"],
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const categories = [
    "All",
    "Innovation",
    "Community",
    "Education",
    "Events",
    "Jobs",
    "News",
    "Funding",
  ];

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white border-b dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
              Innovation Salone
              <span className="block text-blue-600 dark:text-blue-400">
                Ecosystem
              </span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed sm:text-xl text-slate-600 dark:text-slate-300">
              Discover our comprehensive suite of platforms and services
              designed to accelerate innovation, foster entrepreneurship, and
              build a thriving tech community in Sierra Leone.
            </p>

            {/* Enhanced Search */}
            <div className="relative max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-slate-400" />
                <Input
                  placeholder="Search platforms and services..."
                  className="py-3 pl-12 pr-4 text-base shadow-sm border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12">
        {/* Enhanced Category Filter */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Filter by Category
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 ${
                  category === selectedCategory
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Showing {filteredPlatforms.length} of {platforms.length} platforms
          </p>
        </div>

        {/* Enhanced Platforms Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 xl:grid-cols-3 lg:gap-8 lg:mb-16">
          {filteredPlatforms.map((platform) => (
            <Card
              key={platform.id}
              className="relative overflow-hidden transition-all duration-300 bg-white group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50 hover:-translate-y-1 border-slate-200 dark:border-slate-700 dark:bg-slate-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${platform.color} transition-transform group-hover:scale-110`}
                  >
                    {platform.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge
                      className={`${getStatusColor(
                        platform.status
                      )} font-medium`}
                    >
                      {platform.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {platform.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold transition-colors text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {platform.name}
                </CardTitle>
                <CardDescription className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {platform.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs transition-colors bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0 mr-3 text-sm text-slate-500 dark:text-slate-400">
                        <Globe className="flex-shrink-0 w-4 h-4 mr-2" />
                        <span className="truncate">
                          {platform.url.replace("https://", "")}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        disabled={platform.status === "Coming Soon"}
                        asChild={platform.status === "Active"}
                        className={`flex-shrink-0 ${
                          platform.status === "Active"
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                            : ""
                        }`}
                      >
                        {platform.status === "Active" ? (
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            Visit
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </a>
                        ) : (
                          <span className="flex items-center">Coming Soon</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Footer CTA */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 dark:border-blue-800">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold lg:text-3xl text-slate-900 dark:text-white">
                Join the Innovation Salone Ecosystem
              </CardTitle>
              <CardDescription className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Connect with our growing network of platforms and services
                designed to accelerate innovation and entrepreneurship in Sierra
                Leone. Be part of the digital transformation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="text-white transition-all bg-blue-600 shadow-lg hover:bg-blue-700 hover:shadow-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/50"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Get Support
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 mt-8 border-t border-blue-200 md:grid-cols-4 dark:border-blue-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    8+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Platforms
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    1000+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    50+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Startups
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Support
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
