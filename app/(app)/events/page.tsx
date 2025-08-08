"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Clock,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

function EventCard({ event }: { event: (typeof events)[0] }) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const isUpcoming = event.status === "upcoming";
  const eventDate = new Date(event.date);
  const isToday = eventDate.toDateString() === new Date().toDateString();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsRegistered(true);

    // Close modal after success
    setTimeout(() => {
      setIsRegistrationOpen(false);
      // Reset after modal closes
      setTimeout(() => setIsRegistered(false), 300);
    }, 2000);
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 bg-white border-0 shadow-md group hover:shadow-xl hover:-translate-y-1 dark:bg-slate-900">
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 group-hover:opacity-100" />

      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="mb-3 text-xl font-bold transition-colors text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {event.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={isUpcoming ? "default" : "secondary"}
                className={`${
                  isUpcoming
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : ""
                } font-medium`}
              >
                {event.category}
              </Badge>
              <Badge
                variant={isUpcoming ? "outline" : "secondary"}
                className={`${
                  isToday
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200"
                    : ""
                } font-medium`}
              >
                {isToday ? "Today" : isUpcoming ? "Upcoming" : "Completed"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pt-0">
        <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
          {event.description}
        </p>

        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium">
              {eventDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at {event.time}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30">
              <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium">
              {event.attendees}/{event.maxAttendees} attendees
            </span>
            <div className="ml-auto">
              <div className="w-16 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{
                    width: `${(event.attendees / event.maxAttendees) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link href={`/events/${event.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full transition-all duration-200 border-slate-200 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/30"
            >
              View Details
            </Button>
          </Link>
          {isUpcoming && (
            <Dialog
              open={isRegistrationOpen}
              onOpenChange={setIsRegistrationOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex-1 transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                  Register
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    Register for Event
                  </DialogTitle>
                  <div className="mt-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {eventDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {event.time}
                    </p>
                  </div>
                </DialogHeader>

                {!isRegistered ? (
                  <form
                    onSubmit={handleRegistration}
                    className="mt-6 space-y-6"
                  >
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                        <User className="w-4 h-4" />
                        Personal Information
                      </h4>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            placeholder="John"
                            className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            placeholder="Doe"
                            className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john.doe@example.com"
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                        <Building className="w-4 h-4" />
                        Professional Information
                      </h4>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Acme Inc."
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          placeholder="Software Engineer"
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select name="experience">
                          <SelectTrigger className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="entry">
                              Entry Level (0-2 years)
                            </SelectItem>
                            <SelectItem value="mid">
                              Mid Level (3-5 years)
                            </SelectItem>
                            <SelectItem value="senior">
                              Senior Level (6-10 years)
                            </SelectItem>
                            <SelectItem value="executive">
                              Executive (10+ years)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                        <MessageSquare className="w-4 h-4" />
                        Additional Information
                      </h4>

                      <div className="space-y-2">
                        <Label htmlFor="interests">
                          What interests you most about this event?
                        </Label>
                        <Textarea
                          id="interests"
                          name="interests"
                          placeholder="I'm interested in learning about..."
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dietary">
                          Dietary Restrictions or Special Requirements
                        </Label>
                        <Input
                          id="dietary"
                          name="dietary"
                          placeholder="Vegetarian, wheelchair access, etc."
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          name="terms"
                          required
                          className="mt-1"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-blue-600 underline hover:text-blue-700"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-blue-600 underline hover:text-blue-700"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox id="newsletter" name="newsletter" />
                        <Label
                          htmlFor="newsletter"
                          className="text-sm leading-relaxed"
                        >
                          I would like to receive updates about future events
                          and opportunities
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsRegistrationOpen(false)}
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                            Registering...
                          </div>
                        ) : (
                          "Complete Registration"
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full dark:bg-green-900/30">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                      Registration Successful!
                    </h3>
                    <p className="mb-4 text-slate-600 dark:text-slate-300">
                      You've been successfully registered for this event. A
                      confirmation email has been sent to your inbox.
                    </p>
                    <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950/30 dark:text-blue-200">
                      <strong>Next Steps:</strong>
                      <ul className="mt-2 space-y-1 text-left">
                        <li>
                          • Check your email for event details and calendar
                          invite
                        </li>
                        <li>• Add the event to your calendar</li>
                        <li>• Join our event community for updates</li>
                      </ul>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  const approvedEvents = events.filter(
    (event) => event.approvalStatus === "approved"
  );

  const upcomingEvents = approvedEvents.filter(
    (event) => event.status === "upcoming"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-800/60">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-transparent sm:text-4xl bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text">
                  Events
                </h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                  Discover and join startup ecosystem events
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="items-center hidden gap-3 sm:flex">
                <div className="relative">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                  <Input
                    placeholder="Search events..."
                    className="w-64 pl-10 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-200 dark:border-slate-700"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <Link href="/events/create">
                <Button className="text-white transition-all duration-200 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Create Event</span>
                  <span className="sm:hidden">Create</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-4 sm:hidden">
            <div className="relative">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
              <Input
                placeholder="Search events..."
                className="w-full pl-10 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8 sm:py-12">
        {/* Upcoming Events */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 shadow-lg rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl text-slate-900 dark:text-white">
                Upcoming Events
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Don't miss out on these exciting opportunities
              </p>
            </div>
            <Badge
              variant="secondary"
              className="px-3 py-1 ml-auto text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-200"
            >
              {upcomingEvents.length}
            </Badge>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card className="relative overflow-hidden bg-white border-0 shadow-xl dark:bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
              <CardContent className="relative p-12 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                  <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                  No upcoming events
                </h3>
                <p className="max-w-md mx-auto mb-8 leading-relaxed text-slate-600 dark:text-slate-300">
                  Be the first to create an event for the community and bring
                  people together!
                </p>
                <Link href="/events/create">
                  <Button className="px-8 py-3 transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
