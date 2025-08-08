import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { events, userRegisteredEvents } from "@/lib/mock-data";

export default function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = events.find((e) => e.id === Number.parseInt(params.id));

  if (!event || event.approvalStatus !== "approved") {
    notFound();
  }

  const isUpcoming = event.status === "upcoming";
  const eventDate = new Date(event.date);
  const isRegistered = userRegisteredEvents.includes(event.id);
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Events</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
              <span className="sr-only">Save event</span>
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:py-8 lg:py-12">
        {/* Event Hero Section */}
        <div className="mb-8 lg:mb-12">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <Badge
              variant={isUpcoming ? "default" : "secondary"}
              className="text-xs font-medium sm:text-sm"
            >
              {event.category}
            </Badge>
            <Badge
              variant={isUpcoming ? "outline" : "secondary"}
              className={`text-xs sm:text-sm font-medium ${
                isUpcoming
                  ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                  : "border-slate-200 text-slate-600 bg-slate-50"
              }`}
            >
              {isUpcoming ? "Upcoming" : "Completed"}
            </Badge>
            {isRegistered && (
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Registered
              </Badge>
            )}
          </div>

          {/* Event Title */}
          <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl xl:text-5xl text-slate-900 sm:mb-6">
            {event.title}
          </h1>

          {/* Event Meta Information */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-8">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100">
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">Date</p>
                <p className="text-sm truncate text-slate-600">
                  {eventDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100">
                <Clock className="w-5 h-5 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">Time</p>
                <p className="text-sm truncate text-slate-600">
                  {event.time} - {event.endTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100">
                <MapPin className="w-5 h-5 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">Location</p>
                <p className="text-sm truncate text-slate-600">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100">
                <Users className="w-5 h-5 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">Attendees</p>
                <p className="text-sm text-slate-600">
                  {event.attendees}/{event.maxAttendees}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            {isUpcoming && (
              <Button
                size="lg"
                className={`w-full sm:w-auto font-semibold ${
                  isRegistered
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                {isRegistered ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Registered
                  </>
                ) : (
                  "Register for Event"
                )}
              </Button>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="space-y-6 lg:space-y-8 lg:col-span-2">
            {/* Description */}
            <Card className="shadow-sm border-slate-200/60">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  About This Event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-slate-700">
                  {event.description}
                </p>
                {event.fullDescription && (
                  <>
                    <Separator className="my-4" />
                    <p className="leading-relaxed text-slate-600">
                      {event.fullDescription}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <Card className="shadow-sm border-slate-200/60">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Speakers & Panelists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {event.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 transition-colors rounded-xl bg-slate-50/80 hover:bg-slate-100/80"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={
                              speaker.avatar ||
                              "/placeholder.svg?height=48&width=48"
                            }
                            alt={speaker.name}
                          />
                          <AvatarFallback className="font-medium bg-slate-200 text-slate-700">
                            {speaker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate text-slate-900">
                            {speaker.name}
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <Card className="shadow-sm border-slate-200/60">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Topics & Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="transition-colors bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details */}
            <Card className="shadow-sm border-slate-200/60">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    Date & Time
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-slate-700">
                      {eventDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-slate-600">
                      {event.time} - {event.endTime}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    Location
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-slate-700">
                      {event.location}
                    </p>
                    {event.address && (
                      <p className="text-slate-600">{event.address}</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-slate-600 hover:text-slate-900"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View on map
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="flex items-center gap-2 mb-3 font-semibold text-slate-900">
                    <Users className="w-4 h-4 text-slate-500" />
                    Capacity
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Registered</span>
                      <span className="font-medium text-slate-900">
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          attendancePercentage >= 90
                            ? "bg-red-500"
                            : attendancePercentage >= 70
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{
                          width: `${Math.min(attendancePercentage, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {attendancePercentage >= 90
                        ? "Nearly full"
                        : attendancePercentage >= 70
                        ? "Filling up fast"
                        : "Spots available"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card className="shadow-sm border-slate-200/60">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Organizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        event.organizer.avatar ||
                        "/placeholder.svg?height=48&width=48"
                      }
                      alt={event.organizer.name}
                    />
                    <AvatarFallback className="font-medium bg-slate-200 text-slate-700">
                      {event.organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 font-semibold text-slate-900">
                      {event.organizer.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {event.organizer.bio}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 mt-2 text-slate-600 hover:text-slate-900"
                    >
                      View profile
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
