"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Eye,
  UserCheck,
  DollarSign,
  BarChart3,
  CalendarDays,
  Star,
  ArrowRight,
  ExternalLink,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import EventRegistration from "./EventRegistration";
// Analytics data
const analyticsData = {
  totalEvents: 12,
  totalAttendees: 1250,
  upcomingEvents: 4,
  revenue: 2850,
  avgRating: 4.7,
  growthRate: 23,
};

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  dietaryRequirements: string;
  specialRequests: string;
}

export default function EventsPage({ upcomingEvents, pastEvents }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredUpcomingEvents = upcomingEvents?.filter((event: any) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredPastEvents = pastEvents?.filter((event: any) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getAttendancePercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "networking":
        return "🤝";
      case "meetup":
        return "☕";
      case "workshop":
        return "🛠️";
      case "conference":
        return "🎤";
      case "training":
        return "📚";
      case "investment":
        return "💰";
      default:
        return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="events/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>
      </div>
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10 border-2 border-slate-200 rounded-xl focus:border-blue-500"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full h-12 border-2 sm:w-48 border-slate-200 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="networking">🤝 Networking</SelectItem>
                <SelectItem value="meetup">☕ Meetup</SelectItem>
                <SelectItem value="workshop">🛠️ Workshop</SelectItem>
                <SelectItem value="conference">🎤 Conference</SelectItem>
                <SelectItem value="training">📚 Training</SelectItem>
                <SelectItem value="investment">💰 Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full h-12 grid-cols-2 border lg:w-96 bg-white/80 backdrop-blur-sm border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
            <TabsTrigger value="upcoming" className="h-10">
              <Clock className="w-4 h-4 mr-2" />
              Upcoming Events ({filteredUpcomingEvents?.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="h-10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Past Events ({filteredPastEvents?.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl dark:bg-green-900/30">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Upcoming Events
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Don't miss out on these exciting opportunities
                </p>
              </div>
            </div>

            {filteredUpcomingEvents?.length === 0 ? (
              <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                    No events found
                  </h3>
                  <p className="mb-6 text-slate-600 dark:text-slate-400">
                    {searchTerm || categoryFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "No upcoming events at the moment. Check back soon!"}
                  </p>
                  <SignedIn>
                    <Link href="events/create">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Event
                      </Button>
                    </Link>
                  </SignedIn>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredUpcomingEvents?.map((event: any) => (
                  <Card
                    key={event._id}
                    className={`border-0 border-none  bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-all duration-300 ${
                      event.featured ? "ring-2 ring-blue-500/50" : ""
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={event.banner || "/images/pholder2.png"}
                        alt={event.title}
                        className="object-cover w-full h-48 rounded-2xl"
                      />
                      {event.featured && (
                        <Badge className="absolute text-white bg-blue-600 top-3 left-3">
                          Featured
                        </Badge>
                      )}
                      <Badge className="absolute top-3 right-3 bg-white/90 text-slate-700">
                        {getCategoryIcon(event.category)}{" "}
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                      <p className="mb-4 text-slate-600 dark:text-slate-400 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          at {event.time}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <MapPin className="w-4 h-4 text-green-600" />
                          {event.location}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Users className="w-4 h-4 text-purple-600" />
                          {event.attendees.length}/{event.maxAttendees}{" "}
                          attendees
                          <div className="flex-1 h-2 ml-2 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                              style={{
                                width: `${getAttendancePercentage(
                                  event.attendees.length,
                                  event.maxAttendees
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          {event.eventType === "free"
                            ? "FREE"
                            : `$${event.price}`}
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/events/${event._id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>

                          {/* <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => handleRegistrationClick(event)}
                          >
                            Register
                          </Button> */}

                          <EventRegistration event={event} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-100 rounded-xl dark:bg-slate-700/30">
                <BarChart3 className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Past Events
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Explore our successful events and their impact
                </p>
              </div>
            </div>

            {filteredPastEvents?.length === 0 ? (
              <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                    No past events found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {searchTerm || categoryFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "No past events to display yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPastEvents?.map((event: any) => (
                  <Card
                    key={event._id}
                    className="transition-all duration-300 border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl"
                  >
                    <div className="relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="object-cover w-full h-48 rounded-t-2xl"
                      />
                      <Badge className="absolute text-white top-3 right-3 bg-slate-600">
                        {getCategoryIcon(event.category)}{" "}
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                      <p className="mb-4 text-slate-600 dark:text-slate-400 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <MapPin className="w-4 h-4 text-green-600" />
                          {event.location}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Users className="w-4 h-4 text-purple-600" />
                          {event.attendees.length} attendees
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          {event.rating} rating
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          Completed
                        </Badge>
                        <Link href={`/events/${event._id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
