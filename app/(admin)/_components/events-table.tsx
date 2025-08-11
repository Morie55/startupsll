"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Edit,
  Check,
  X,
  Pause,
  Mail,
  Phone,
  ExternalLink,
  ArrowUpDown,
  Info,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  User,
  Users,
  Tag,
  Link,
  Globe,
} from "lucide-react";
import { handleStatusChangeWithReason } from "@/app/actions/event-actions";
import { useRouter } from "next/navigation";

// Mock data based on your schema
const mockEvents = [
  {
    _id: "1",
    title: "Tech Startup Networking Night",
    description: "Connect with fellow entrepreneurs and investors",
    category: "networking",
    date: new Date("2024-02-15"),
    time: "18:00",
    endTime: "21:00",
    location: "San Francisco",
    address: "123 Tech Street, San Francisco, CA",
    maxAttendees: 100,
    eventType: "free",
    ticketPrice: 0,
    status: "approved",
    contactEmail: "contact@techhub.com",
    contactPhone: "+1-555-0123",
    statusReason: "",
    createdAt: new Date("2024-01-10"),
    organizer: {
      name: "John Smith",
      avatar: "/professional-man.png",
      company: "TechHub Inc",
    },
    attendees: Array(45)
      .fill(null)
      .map((_, i) => ({
        id: `att-${i}`,
        firstName: `User${i}`,
        email: `user${i}@example.com`,
      })),
    speakers: [
      { id: "sp1", name: "John Doe", title: "CEO", company: "TechCorp" },
    ],
  },
  {
    _id: "2",
    title: "AI Workshop: Building LLM Applications",
    description: "Hands-on workshop for AI development",
    category: "workshop",
    date: new Date("2024-02-20"),
    time: "09:00",
    endTime: "17:00",
    location: "Austin",
    address: "456 Innovation Ave, Austin, TX",
    maxAttendees: 50,
    eventType: "paid",
    ticketPrice: 299,
    status: "pending",
    contactEmail: "workshops@ailearn.com",
    contactPhone: "+1-555-0456",
    statusReason: "",
    createdAt: new Date("2024-01-15"),
    organizer: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-diverse.png",
      company: "AI Learning Center",
    },
    attendees: Array(23)
      .fill(null)
      .map((_, i) => ({
        id: `att-${i}`,
        firstName: `User${i}`,
        email: `user${i}@example.com`,
      })),
    speakers: [
      {
        id: "sp2",
        name: "Jane Smith",
        title: "AI Researcher",
        company: "DeepMind",
      },
    ],
  },
  {
    _id: "3",
    title: "Investment Pitch Competition",
    description: "Startups pitch to venture capitalists",
    category: "investment",
    date: new Date("2024-02-25"),
    time: "14:00",
    endTime: "18:00",
    location: "New York",
    address: "789 Money Street, New York, NY",
    maxAttendees: 200,
    eventType: "free",
    ticketPrice: 0,
    status: "rejected",
    contactEmail: "pitches@vcplaza.com",
    contactPhone: "+1-555-0789",
    statusReason:
      "Event does not meet our community guidelines. The venue capacity is insufficient for the expected attendance.",
    createdAt: new Date("2024-01-20"),
    organizer: {
      name: "Michael Brown",
      avatar: "/confident-businessman.png",
      company: "VC Plaza",
    },
    attendees: Array(12)
      .fill(null)
      .map((_, i) => ({
        id: `att-${i}`,
        firstName: `User${i}`,
        email: `user${i}@example.com`,
      })),
    speakers: [
      {
        id: "sp3",
        name: "Mike Johnson",
        title: "Partner",
        company: "Sequoia Capital",
      },
    ],
  },
  {
    _id: "4",
    title: "React Developer Meetup",
    description: "Monthly meetup for React developers",
    category: "meetup",
    date: new Date("2024-03-01"),
    time: "19:00",
    endTime: "22:00",
    location: "Seattle",
    address: "321 Code Street, Seattle, WA",
    maxAttendees: 80,
    eventType: "donation",
    ticketPrice: 0,
    status: "suspended",
    contactEmail: "meetup@reactdev.com",
    contactPhone: "+1-555-0321",
    statusReason:
      "Event temporarily suspended pending venue confirmation and safety compliance review.",
    createdAt: new Date("2024-01-25"),
    organizer: {
      name: "Emily Davis",
      avatar: "/tech-woman.png",
      company: "React Community",
    },
    attendees: Array(67)
      .fill(null)
      .map((_, i) => ({
        id: `att-${i}`,
        firstName: `User${i}`,
        email: `user${i}@example.com`,
      })),
    speakers: [
      {
        id: "sp4",
        name: "Sarah Wilson",
        title: "Senior Developer",
        company: "Meta",
      },
    ],
  },
  {
    _id: "5",
    title: "Digital Marketing Conference 2024",
    description: "Latest trends in digital marketing",
    category: "conference",
    date: new Date("2024-03-10"),
    time: "08:00",
    endTime: "18:00",
    location: "Chicago",
    address: "555 Conference Blvd, Chicago, IL",
    maxAttendees: 500,
    eventType: "paid",
    ticketPrice: 599,
    status: "pending",
    contactEmail: "info@digitalconf.com",
    contactPhone: "+1-555-0555",
    statusReason: "",
    createdAt: new Date("2024-02-01"),
    organizer: {
      name: "David Wilson",
      avatar: "/marketing-professional.png",
      company: "Digital Marketing Hub",
    },
    attendees: Array(234)
      .fill(null)
      .map((_, i) => ({
        id: `att-${i}`,
        firstName: `User${i}`,
        email: `user${i}@example.com`,
      })),
    speakers: [
      {
        id: "sp5",
        name: "Alex Brown",
        title: "Marketing Director",
        company: "Google",
      },
    ],
  },
];

const statusColors: any = {
  approved: "bg-green-600 text-white",
  pending: "bg-yellow-600 text-white",
  rejected: "bg-red-600 text-white",
  suspended: "bg-orange-600 text-white",
};

const categoryColors: any = {
  networking: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  workshop:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  meetup: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  conference:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  investment:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  training:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export default function EventTableComponent({ events }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showPerPage, setShowPerPage] = useState("10");
  type EventType = (typeof events)[number];
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [reasonAction, setReasonAction] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // Get unique locations for filter
  const uniqueLocations = useMemo(() => {
    return [...new Set(events?.map((event: any) => event.location))].sort();
  }, [events]);

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    return events?.filter((event: any) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        event.organizer.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      const matchesEventType =
        eventTypeFilter === "all" || event.eventType === eventTypeFilter;
      const matchesLocation =
        locationFilter === "all" || event.location === locationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesEventType &&
        matchesLocation
      );
    });
  }, [
    events,
    searchTerm,
    statusFilter,
    categoryFilter,
    eventTypeFilter,
    locationFilter,
  ]);

  const openReasonDialog = (action: any) => {
    setReasonAction(action);
    setReason("");
    setShowReasonDialog(true);
  };

  const handleReasonSubmit = async () => {
    if (selectedEvent && reasonAction) {
      try {
        setLoading(true);
        await handleStatusChangeWithReason(
          selectedEvent?._id!,
          reasonAction,
          reason
        );
        router.refresh(); // Refresh the page to reflect changes
        setLoading(false);
        setShowReasonDialog(false);
        setSelectedEvent(null);
        setReason("");
        setReasonAction("");
      } catch (error) {
        setLoading(false);
        console.error("Failed to update event status:", error);
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setEventTypeFilter("all");
    setLocationFilter("all");
  };

  const formatDate = (date: any) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatTime = (date: any) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(date));
  };

  const formatPrice = (price: any, eventType: any) => {
    if (eventType === "free") return "Free";
    if (eventType === "donation") return "Donation";
    return `$${price}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Events Database</h1>
        </div>
        <p className="text-muted-foreground">
          Manage and filter event information with database connectivity
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="meetup">Meetup</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Type</Label>
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="donation">Donation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Location</Label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location: any, i) => (
                  <SelectItem key={i} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <span className="text-sm text-muted-foreground">
              Showing {filteredEvents?.length} of {events?.length} events
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Show:</span>
            <Select value={showPerPage} onValueChange={setShowPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  Event
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  Type
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">Categories</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  Status
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  Location
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  Attendees
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground"
                >
                  No events found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents
                ?.slice(0, Number.parseInt(showPerPage))
                .map((event: any) => (
                  <TableRow key={event._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={event?.organizer?.avatar || "/placeholder.svg"}
                            alt={event?.organizer?.name}
                          />
                          <AvatarFallback>
                            {event?.organizer?.name
                              .split(" ")
                              .map((n: any) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(event.date)} {event.time}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            by {event?.organizer?.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium capitalize">
                        {event.eventType}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(event.ticketPrice, event.eventType)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge
                          variant="outline"
                          className={categoryColors[event?.category]}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[event.status]}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{event.location}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {event.attendees.length}/{event.maxAttendees}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center gap-2"
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
              <img
                src={selectedEvent.banner || "/images/pholder1.png"}
                alt={`${selectedEvent.title} banner`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute text-white bottom-4 left-4">
                <h2 className="text-3xl font-bold">{selectedEvent.title}</h2>
                <p className="text-lg">{selectedEvent.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
              {/* Left Column: Event Info & Description */}
              <div className="space-y-6 lg:col-span-2">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Info className="w-5 h-5 text-primary" />
                    Event Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Date:</div>
                        <p>{formatDate(selectedEvent.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Time:</div>
                        <p>
                          {selectedEvent.time} - {selectedEvent.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Location:</div>
                        <p>{selectedEvent.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Price:</div>
                        <p>
                          {formatPrice(
                            selectedEvent.ticketPrice,
                            selectedEvent.eventType
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Organizer:</div>
                        <p>{selectedEvent?.organizer?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Contact Email:</div>
                        <p>{selectedEvent.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Contact Phone:</div>
                        <p>{selectedEvent.contactPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Max Attendees:</div>
                        <p>{selectedEvent.maxAttendees}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedEvent.fullDescription && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                      <Info className="w-5 h-5 text-primary" />
                      Full Description
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selectedEvent.fullDescription}
                    </p>
                  </div>
                )}

                {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                      <Tag className="w-5 h-5 text-primary" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag: any, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedEvent.website || selectedEvent.socialMedia) && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                      <Link className="w-5 h-5 text-primary" />
                      Links
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {selectedEvent.website && (
                        <a
                          href={selectedEvent.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <Globe className="w-4 h-4" />
                          Event Website
                        </a>
                      )}
                      {selectedEvent.socialMedia && (
                        <a
                          href={selectedEvent.socialMedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <Link className="w-4 h-4" />
                          Social Media
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {selectedEvent.speakers &&
                  selectedEvent.speakers.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-xl font-semibold">
                        <User className="w-5 h-5 text-primary" />
                        Speakers
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {selectedEvent.speakers.map((speaker: any) => (
                          <div
                            key={speaker.id}
                            className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20"
                          >
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={speaker.image || "/placeholder.svg"}
                                alt={speaker.name}
                              />
                              <AvatarFallback>
                                {speaker.name
                                  .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">
                                {speaker.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {speaker.title} at {speaker.company}
                              </div>
                              {(speaker.linkedin || speaker.twitter) && (
                                <div className="flex gap-2 mt-1">
                                  {speaker.linkedin && (
                                    <a
                                      href={speaker.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-500 hover:underline"
                                    >
                                      LinkedIn
                                    </a>
                                  )}
                                  {speaker.twitter && (
                                    <a
                                      href={speaker.twitter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-400 hover:underline"
                                    >
                                      Twitter
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                      <Calendar className="w-5 h-5 text-primary" />
                      Agenda
                    </h3>
                    <ol className="space-y-2">
                      {selectedEvent.agenda.map((item: any) => (
                        <li key={item.id} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-16 text-sm font-medium">
                            {item.time}
                          </div>
                          <div>
                            <div className="text-base font-medium">
                              {item.title}
                            </div>
                            {item.speaker && (
                              <div className="text-sm text-muted-foreground">
                                Speaker: {item.speaker}
                              </div>
                            )}
                            {item.description && (
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {selectedEvent.sponsors &&
                  selectedEvent.sponsors.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-xl font-semibold">
                        <DollarSign className="w-5 h-5 text-primary" />
                        Sponsors
                      </h3>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {selectedEvent.sponsors.map((sponsor: any) => (
                          <div
                            key={sponsor.id}
                            className="flex flex-col items-center p-3 border rounded-lg bg-muted/20"
                          >
                            {sponsor.logo && (
                              <img
                                src={sponsor.logo || "/placeholder.svg"}
                                alt={sponsor.name}
                                className="object-contain h-12 mb-2"
                              />
                            )}
                            <div className="text-sm font-medium text-center">
                              {sponsor.name}
                            </div>
                            <Badge
                              variant="outline"
                              className="mt-1 capitalize"
                            >
                              {sponsor.tier}
                            </Badge>
                            {sponsor.website && (
                              <a
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-xs text-blue-500 hover:underline"
                              >
                                Website
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Right Column: Status, Actions, Stats */}
              <div className="space-y-6 lg:col-span-1">
                <div className="p-4 space-y-4 border rounded-lg shadow-sm bg-card text-card-foreground">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Info className="w-5 h-5 text-primary" />
                    Status & Actions
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">
                      Current Status:
                    </Label>
                    <Badge
                      className={`text-lg px-4 py-2 justify-center ${
                        statusColors[selectedEvent?.status]
                      }`}
                    >
                      {selectedEvent.status}
                    </Badge>
                  </div>
                  {selectedEvent.statusReason && (
                    <div className="p-3 mt-4 rounded-md bg-muted">
                      <h5 className="mb-1 text-sm font-medium">Reason:</h5>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.statusReason}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button
                      size="sm"
                      onClick={() => {
                        openReasonDialog("approved");
                      }}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={selectedEvent.status === "approved"}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openReasonDialog("suspended")}
                      className="bg-orange-600 hover:bg-orange-700"
                      disabled={selectedEvent.status === "suspended"}
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Suspend
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openReasonDialog("rejected")}
                      disabled={selectedEvent.status === "rejected"}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-4 space-y-4 border rounded-lg shadow-sm bg-card text-card-foreground">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Users className="w-5 h-5 text-primary" />
                    Registration Statistics
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Registered:</span>
                      <span>{selectedEvent.attendees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Available Slots:</span>
                      <span>
                        {selectedEvent.maxAttendees -
                          selectedEvent.attendees.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fill Rate:</span>
                      <span>
                        {Math.round(
                          (selectedEvent.attendees.length /
                            selectedEvent.maxAttendees) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                {(selectedEvent.requirements ||
                  selectedEvent.accessibility) && (
                  <div className="p-4 space-y-4 border rounded-lg shadow-sm bg-card text-card-foreground">
                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                      <Info className="w-5 h-5 text-primary" />
                      Additional Info
                    </h3>
                    <div className="space-y-2 text-sm">
                      {selectedEvent.requirements && (
                        <div>
                          <span className="font-medium">Requirements:</span>
                          <p className="text-muted-foreground">
                            {selectedEvent.requirements}
                          </p>
                        </div>
                      )}
                      {selectedEvent.accessibility && (
                        <div>
                          <span className="font-medium">Accessibility:</span>
                          <p className="text-muted-foreground">
                            {selectedEvent.accessibility}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reason Dialog */}
      <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">
              {reasonAction} Event
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for {reasonAction} this event.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder={`Enter reason for ${reasonAction}...`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowReasonDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReasonSubmit}
                // variant={
                //   reasonAction === "rejected" ? "destructive" : "default"
                // }
                className="capitalize"
                disabled={!reason.trim()}
              >
                {loading ? "Submitting..." : reasonAction}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
