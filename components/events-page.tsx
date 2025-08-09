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

// Mock data for events
const upcomingEvents = [
  {
    id: "1",
    title: "StartUp Pitch Night",
    description:
      "Join us for an evening of innovative startup pitches from Sierra Leone's most promising entrepreneurs.",
    category: "networking",
    date: "2024-02-15",
    time: "18:00",
    location: "Freetown Innovation Hub",
    currentAttendees: 45,
    maxAttendees: 100,
    price: 0,
    eventType: "free",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "StartUp-SL",
    featured: true,
  },
  {
    id: "2",
    title: "Tech Founders Meetup",
    description:
      "Monthly gathering for tech founders to share experiences, challenges, and opportunities.",
    category: "meetup",
    date: "2024-02-20",
    time: "19:00",
    location: "Impact Hub Freetown",
    currentAttendees: 32,
    maxAttendees: 50,
    price: 0,
    eventType: "free",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Tech Community SL",
    featured: false,
  },
  {
    id: "3",
    title: "Digital Marketing Workshop",
    description:
      "Learn the latest digital marketing strategies for growing your startup in the African market.",
    category: "workshop",
    date: "2024-02-25",
    time: "14:00",
    location: "Bintumani Conference Center",
    currentAttendees: 78,
    maxAttendees: 120,
    price: 15,
    eventType: "paid",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Digital SL",
    featured: false,
  },
  {
    id: "4",
    title: "Investment Readiness Bootcamp",
    description:
      "3-day intensive program to prepare your startup for investment opportunities.",
    category: "training",
    date: "2024-03-05",
    time: "09:00",
    location: "Freetown Business District",
    currentAttendees: 25,
    maxAttendees: 30,
    price: 50,
    eventType: "paid",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Investment Hub SL",
    featured: true,
  },
];

const pastEvents = [
  {
    id: "5",
    title: "Women in Tech Conference 2024",
    description:
      "Celebrating and empowering women entrepreneurs in Sierra Leone's tech ecosystem.",
    category: "conference",
    date: "2024-01-20",
    time: "09:00",
    location: "Radisson Blu Mammy Yoko Hotel",
    attendees: 150,
    maxAttendees: 150,
    price: 25,
    eventType: "paid",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Women Tech SL",
    rating: 4.8,
  },
  {
    id: "6",
    title: "Fintech Innovation Summit",
    description: "Exploring the future of financial technology in West Africa.",
    category: "conference",
    date: "2024-01-15",
    time: "10:00",
    location: "Sierra Leone Commercial Bank HQ",
    attendees: 200,
    maxAttendees: 200,
    price: 30,
    eventType: "paid",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "FinTech SL",
    rating: 4.6,
  },
];

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

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    dietaryRequirements: "",
    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const filteredUpcomingEvents = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredPastEvents = pastEvents.filter((event) => {
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

  const handleRegistrationClick = (event: any) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
    setRegistrationSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      dietaryRequirements: "",
      specialRequests: "",
    });
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Registration submitted:", {
        event: selectedEvent?.title,
        attendee: formData,
      });

      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof RegistrationFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const closeModal = () => {
    setIsRegistrationOpen(false);
    setSelectedEvent(null);
    setRegistrationSuccess(false);
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
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            Event Analytics
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                    <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Events
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {analyticsData.totalEvents}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-xl dark:bg-green-900/30">
                    <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Attendees
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {analyticsData.totalAttendees.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-xl dark:bg-purple-900/30">
                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Upcoming
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {analyticsData.upcomingEvents}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

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
              Upcoming Events ({filteredUpcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="h-10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Past Events ({filteredPastEvents.length})
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

            {filteredUpcomingEvents.length === 0 ? (
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
                {filteredUpcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={`border-0  bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-all duration-300 ${
                      event.featured ? "ring-2 ring-blue-500/50" : ""
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="object-cover w-full h-48 rounded-t-2xl"
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
                          {event.currentAttendees}/{event.maxAttendees}{" "}
                          attendees
                          <div className="flex-1 h-2 ml-2 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                              style={{
                                width: `${getAttendancePercentage(
                                  event.currentAttendees,
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
                          <Link href={`/events/${event.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>

                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => handleRegistrationClick(event)}
                          >
                            Register
                          </Button>
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

            {filteredPastEvents.length === 0 ? (
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
                {filteredPastEvents.map((event) => (
                  <Card
                    key={event.id}
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
                          {event.attendees} attendees
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
                        <Link href={`/events/${event.id}`}>
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

      {/* Registration Modal */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              {registrationSuccess
                ? "Registration Successful!"
                : "Event Registration"}
            </DialogTitle>
            <DialogDescription>
              {registrationSuccess
                ? `You've successfully registered for ${selectedEvent?.title}. Check your email for confirmation details.`
                : `Register for ${selectedEvent?.title}`}
            </DialogDescription>
          </DialogHeader>

          {registrationSuccess ? (
            <div className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full dark:bg-green-900/30">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                You're all set!
              </h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                We've sent a confirmation email with event details and next
                steps.
              </p>
              <div className="flex justify-center gap-3">
                <Button onClick={closeModal} variant="outline">
                  Close
                </Button>
                <Link href={`/events/${selectedEvent?.id}`}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    View Event Details
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRegistration} className="space-y-6">
              {/* Event Summary */}
              <div className="p-4 bg-slate-50 rounded-xl dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedEvent?.image || "/placeholder.svg"}
                    alt={selectedEvent?.title}
                    className="object-cover w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {selectedEvent?.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedEvent &&
                        new Date(selectedEvent.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                      at {selectedEvent?.time}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedEvent?.location}
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {selectedEvent?.eventType === "free"
                        ? "FREE"
                        : `$${selectedEvent?.price}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={`mt-2 ${
                      formErrors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your first name"
                  />
                  {formErrors.firstName && (
                    <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={`mt-2 ${
                      formErrors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your last name"
                  />
                  {formErrors.lastName && (
                    <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`mt-2 ${
                      formErrors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`mt-2 ${
                      formErrors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && (
                    <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company/Organization
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="mt-2"
                    placeholder="Enter your company"
                  />
                </div>

                <div>
                  <Label htmlFor="jobTitle" className="text-sm font-medium">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                    className="mt-2"
                    placeholder="Enter your job title"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="dietaryRequirements"
                  className="text-sm font-medium"
                >
                  Dietary Requirements
                </Label>
                <Textarea
                  id="dietaryRequirements"
                  value={formData.dietaryRequirements}
                  onChange={(e) =>
                    handleInputChange("dietaryRequirements", e.target.value)
                  }
                  className="mt-2"
                  placeholder="Any dietary restrictions or requirements"
                  rows={2}
                />
              </div>

              <div>
                <Label
                  htmlFor="specialRequests"
                  className="text-sm font-medium"
                >
                  Special Requests
                </Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) =>
                    handleInputChange("specialRequests", e.target.value)
                  }
                  className="mt-2"
                  placeholder="Any special accommodations or requests"
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
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
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
