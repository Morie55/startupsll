"use client";
import type React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  Tag,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  ImageIcon,
  X,
  Plus,
  Minus,
  User,
  DollarSign,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Award,
  ClockIcon,
} from "lucide-react";
import { createEvent } from "@/app/actions/event-actions";
import { Uploader } from "@/components/Uploader";

// Zod validation schema
const eventFormSchema = z
  .object({
    // Basic Information
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must be no more than 100 characters"),
    banner: z.string().url().optional(),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(200, "Description must be no more than 200 characters"),
    fullDescription: z.string().optional(),
    category: z.string().min(1, "Please select a category"),

    // Date & Time
    date: z
      .string()
      .min(1, "Event date is required")
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "Event date must be in the future"),
    time: z.string().min(1, "Start time is required"),
    endTime: z.string().optional(),

    // Location
    location: z
      .string()
      .min(3, "Venue name must be at least 3 characters")
      .max(100, "Venue name must be no more than 100 characters"),
    address: z.string().optional(),

    // Capacity
    maxAttendees: z
      .string()
      .min(1, "Maximum attendees is required")
      .refine((val) => {
        const num = Number.parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 10000;
      }, "Maximum attendees must be between 1 and 10,000"),

    // Event Type & Pricing
    eventType: z.enum(["free", "paid", "donation"], {
      required_error: "Please select an event type",
    }),
    ticketPrice: z.string().optional(),
    registrationDeadline: z
      .string()
      .min(1, "Registration deadline is required"),

    // Contact
    contactEmail: z
      .string()
      .min(1, "Contact email is required")
      .email("Please enter a valid email address"),
    contactPhone: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        return /^[+]?[0-9\s\-()]{10,}$/.test(val);
      }, "Please enter a valid phone number"),

    // Optional fields
    requirements: z.string().optional(),
    accessibility: z.string().optional(),
    website: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        return /^https?:\/\/.+/.test(val);
      }, "Website URL must start with http:// or https://"),
    socialMedia: z.string().optional(),

    // Dynamic arrays
    tags: z.array(z.string()).default([]),
    speakers: z
      .array(
        z.object({
          id: z.string(),
          name: z.string().min(2, "Speaker name must be at least 2 characters"),
          title: z.string().min(1, "Speaker title is required"),
          company: z.string().optional(),
          bio: z.string().optional(),
          image: z.string().nullable().optional(),
          linkedin: z
            .string()
            .optional()
            .refine((val) => {
              if (!val) return true;
              return val.includes("linkedin.com");
            }, "LinkedIn URL must be a valid LinkedIn profile"),
          twitter: z
            .string()
            .optional()
            .refine((val) => {
              if (!val) return true;
              return val.includes("twitter.com") || val.includes("x.com");
            }, "Twitter URL must be a valid Twitter/X profile"),
        })
      )
      .default([]),
    agenda: z
      .array(
        z.object({
          id: z.string(),
          time: z.string(),
          title: z.string(),
          description: z.string(),
          speaker: z.string(),
        })
      )
      .default([]),
    sponsors: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          logo: z.string().nullable().optional(),
          website: z.string().optional(),
          tier: z.enum(["platinum", "gold", "silver", "bronze"]),
        })
      )
      .default([]),
  })
  .refine(
    (data) => {
      // Conditional validation for ticket price
      if (data.eventType === "paid") {
        if (!data.ticketPrice) return false;
        const price = Number.parseFloat(data.ticketPrice);
        return !isNaN(price) && price >= 0 && price <= 10000;
      }
      return true;
    },
    {
      message:
        "Ticket price is required for paid events and must be between $0 and $10,000",
      path: ["ticketPrice"],
    }
  )
  .refine(
    (data) => {
      // End time validation
      if (data.endTime && data.time && data.date) {
        const startDateTime = new Date(`${data.date}T${data.time}`);
        const endDateTime = new Date(`${data.date}T${data.endTime}`);
        return endDateTime > startDateTime;
      }
      return true;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  )
  .refine(
    (data) => {
      // Registration deadline validation
      if (data.registrationDeadline && data.date && data.time) {
        const deadline = new Date(data.registrationDeadline);
        const eventDateTime = new Date(`${data.date}T${data.time}`);
        const now = new Date();

        return deadline > now && deadline < eventDateTime;
      }
      return true;
    },
    {
      message:
        "Registration deadline must be in the future and before the event",
      path: ["registrationDeadline"],
    }
  );

type EventFormData = z.infer<typeof eventFormSchema>;

export default function CreateEventPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSpeakerForm, setShowSpeakerForm] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState({
    name: "",
    title: "",
    company: "",
    bio: "",
    image: null as string | null,
    linkedin: "",
    twitter: "",
  });

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      category: "",
      date: "",
      time: "",
      endTime: "",
      location: "",
      address: "",
      maxAttendees: "",
      eventType: undefined,
      ticketPrice: "",
      registrationDeadline: "",
      contactEmail: "",
      contactPhone: "",
      requirements: "",
      accessibility: "",
      website: "",
      socialMedia: "",
      tags: [],
      speakers: [],
      agenda: [],
      sponsors: [],
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    fields: speakerFields,
    append: appendSpeaker,
    remove: removeSpeaker,
  } = useFieldArray({
    control: form.control,
    name: "speakers",
  });

  const {
    fields: agendaFields,
    append: appendAgenda,
    remove: removeAgenda,
  } = useFieldArray({
    control: form.control,
    name: "agenda",
  });

  const {
    fields: sponsorFields,
    append: appendSponsor,
    remove: removeSponsor,
  } = useFieldArray({
    control: form.control,
    name: "sponsors",
  });

  // Watch for conditional validation
  const watchEventType = form.watch("eventType");
  const watchTags = form.watch("tags");

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      await createEvent(data);
      router.push("/events");
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error creating event:", error);
      form.setError("root", {
        message: "Failed to create event. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tag management
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    if (trimmedTag.length < 2) {
      form.setError("tags", {
        message: "Tags must be at least 2 characters long",
      });
      return;
    }

    if (trimmedTag.length > 20) {
      form.setError("tags", {
        message: "Tags must be no more than 20 characters long",
      });
      return;
    }

    const currentTags = form.getValues("tags");
    if (currentTags.includes(trimmedTag)) {
      form.setError("tags", { message: "Tag already exists" });
      return;
    }

    if (currentTags.length >= 10) {
      form.setError("tags", { message: "Maximum 10 tags allowed" });
      return;
    }

    form.setValue("tags", [...currentTags, trimmedTag]);
    form.clearErrors("tags");
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
    form.clearErrors("tags");
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Speaker management
  const addSpeaker = () => {
    if (!currentSpeaker.name.trim() || !currentSpeaker.title.trim()) {
      form.setError("speakers", {
        message: "Speaker name and title are required",
      });
      return;
    }

    if (currentSpeaker.name.length < 2) {
      form.setError("speakers", {
        message: "Speaker name must be at least 2 characters",
      });
      return;
    }

    if (
      currentSpeaker.linkedin &&
      !currentSpeaker.linkedin.includes("linkedin.com")
    ) {
      form.setError("speakers", {
        message: "LinkedIn URL must be a valid LinkedIn profile",
      });
      return;
    }

    if (
      currentSpeaker.twitter &&
      !currentSpeaker.twitter.includes("twitter.com") &&
      !currentSpeaker.twitter.includes("x.com")
    ) {
      form.setError("speakers", {
        message: "Twitter URL must be a valid Twitter/X profile",
      });
      return;
    }

    appendSpeaker({
      ...currentSpeaker,
      id: Date.now().toString(),
    });

    setCurrentSpeaker({
      name: "",
      title: "",
      company: "",
      bio: "",
      image: null,
      linkedin: "",
      twitter: "",
    });
    setShowSpeakerForm(false);
    form.clearErrors("speakers");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="flex items-center gap-2 px-4 py-2 transition-all duration-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </Link>
      </div>

      <div className="px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold lg:text-6xl text-slate-900 dark:text-white">
            Share Your Vision
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Connect with the StartUp-SL community by creating engaging events
            that inspire, educate, and bring entrepreneurs together
          </p>
        </div>

        {form.formState.errors.root && (
          <Card className="mb-8 border-red-200 bg-red-50/80 backdrop-blur-sm dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">
                  {form.formState.errors.root.message}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Banner Upload */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl dark:from-pink-900/30 dark:to-rose-900/30">
                    <ImageIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  Event Banner
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Upload an eye-catching banner image for your event
                  (recommended: 800x800px square, max 10MB)
                </p>
              </CardHeader>
              <CardContent>
                <Uploader
                  multiple={false}
                  accept={{
                    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
                  }}
                  maxSizeMB={10}
                  uploadTitle={` Upload an eye-catching banner image for your event
                  (recommended: 800x800px square, max 10MB)`}
                  imageClassName="!object-cover  w-[500px] object-top h-[500px]"
                  className="object-cover p-6 border-2 border-gray-300 border-dashed rounded-lg h-[500px] w-[500px]"
                  onUploadComplete={(urls: any) =>
                    form.setValue("banner", urls)
                  }
                />
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl dark:from-blue-900/30 dark:to-indigo-900/30">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="lg:col-span-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                            Event Title *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter a compelling event title (5-100 characters)"
                              className="mt-3 text-lg border-2 h-14 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                            Short Description *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description that will appear in event listings (20-200 characters)"
                              maxLength={200}
                              className="mt-3 min-h-[120px] border-2 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <FormMessage />
                            <span className="text-sm text-slate-500">
                              {field.value?.length || 0}/200
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <FormField
                      control={form.control}
                      name="fullDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                            Full Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed description including agenda, what attendees can expect, requirements, etc."
                              rows={8}
                              className="mt-3 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                            Category *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="mt-3 border-2 h-14 rounded-xl">
                                <SelectValue placeholder="Select event category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="networking">
                                🤝 Networking
                              </SelectItem>
                              <SelectItem value="workshop">
                                🛠️ Workshop
                              </SelectItem>
                              <SelectItem value="meetup">☕ Meetup</SelectItem>
                              <SelectItem value="conference">
                                🎤 Conference
                              </SelectItem>
                              <SelectItem value="investment">
                                💰 Investment
                              </SelectItem>
                              <SelectItem value="training">
                                📚 Training
                              </SelectItem>
                              <SelectItem value="other">📋 Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-slate-900 dark:text-white">
                      Tags (Optional)
                    </Label>
                    <div className="mt-3 space-y-4">
                      <div className="flex gap-3">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagKeyPress}
                          placeholder="Add tags (2-20 characters, max 10 tags)"
                          className="border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                          className="px-6 bg-transparent border-2 h-14 rounded-xl"
                          disabled={watchTags.length >= 10}
                        >
                          <Tag className="w-5 h-5" />
                        </Button>
                      </div>
                      {form.formState.errors.tags && (
                        <p className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          {form.formState.errors.tags.message}
                        </p>
                      )}
                      {watchTags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {watchTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="px-4 py-2 text-sm transition-colors cursor-pointer rounded-xl hover:bg-red-100 hover:text-red-700"
                              onClick={() => removeTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-slate-500">
                        {watchTags.length}/10 tags used
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl dark:from-green-900/30 dark:to-emerald-900/30">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Event Date *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Start Time *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          End Time
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl dark:from-purple-900/30 dark:to-violet-900/30">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Venue Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Freetown Innovation Hub"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Full Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Street address, city, country"
                            className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl dark:from-orange-900/30 dark:to-amber-900/30">
                    <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <FormField
                    control={form.control}
                    name="maxAttendees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Maximum Attendees *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 100 (1-10,000)"
                            min="1"
                            max="10000"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Type & Pricing */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl dark:from-emerald-900/30 dark:to-teal-900/30">
                    <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Event Type & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Event Type *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="mt-3 border-2 h-14 rounded-xl">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="free">🎁 Free Event</SelectItem>
                            <SelectItem value="paid">💳 Paid Event</SelectItem>
                            <SelectItem value="donation">
                              💝 Donation Based
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ticketPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Ticket Price {watchEventType === "paid" && "*"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 25.00 (max $10,000)"
                            min="0"
                            max="10000"
                            step="0.01"
                            className="mt-3 border-2 h-14 rounded-xl"
                            disabled={watchEventType !== "paid"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="registrationDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                        Registration Deadline *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="mt-3 border-2 h-14 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Contact & Requirements */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl dark:from-rose-900/30 dark:to-pink-900/30">
                    <Phone className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  Contact & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Contact Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@example.com"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Contact Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                        Requirements & Prerequisites
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any requirements, prerequisites, or items attendees should bring"
                          rows={4}
                          className="mt-3 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accessibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                        Accessibility Information
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Information about venue accessibility, accommodations available, etc."
                          rows={3}
                          className="mt-3 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Social Media & Website */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl dark:from-indigo-900/30 dark:to-blue-900/30">
                    <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Social Media & Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Event Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://your-event-website.com"
                            className="mt-3 border-2 h-14 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-900 dark:text-white">
                          Social Media Hashtag
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="#YourEventHashtag"
                            className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Speakers */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl dark:from-violet-900/30 dark:to-purple-900/30">
                    <User className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  Speakers & Presenters
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Add speakers and presenters for your event
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {speakerFields.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {speakerFields.map((speaker, index) => (
                      <div
                        key={speaker.id}
                        className="p-4 border-2 border-slate-200 rounded-xl dark:border-slate-600"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {speaker.image ? (
                              <img
                                src={speaker.image || "/placeholder.svg"}
                                alt={speaker.name}
                                className="object-cover w-12 h-12 rounded-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-600">
                                <User className="w-6 h-6 text-slate-500" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">
                                {speaker.name}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {speaker.title}
                              </p>
                              {speaker.company && (
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                  {speaker.company}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSpeaker(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        {speaker.bio && (
                          <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                            {speaker.bio}
                          </p>
                        )}
                        <div className="flex gap-2">
                          {speaker.linkedin && (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {speaker.twitter && (
                            <a
                              href={speaker.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-500"
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showSpeakerForm ? (
                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl dark:border-slate-600">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium">
                          Speaker Name *
                        </Label>
                        <Input
                          value={currentSpeaker.name}
                          onChange={(e) =>
                            setCurrentSpeaker({
                              ...currentSpeaker,
                              name: e.target.value,
                            })
                          }
                          placeholder="Full name (min 2 characters)"
                          className="h-12 mt-2 border-2 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Title/Position *
                        </Label>
                        <Input
                          value={currentSpeaker.title}
                          onChange={(e) =>
                            setCurrentSpeaker({
                              ...currentSpeaker,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g., CEO, Founder"
                          className="h-12 mt-2 border-2 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Company/Organization
                        </Label>
                        <Input
                          value={currentSpeaker.company}
                          onChange={(e) =>
                            setCurrentSpeaker({
                              ...currentSpeaker,
                              company: e.target.value,
                            })
                          }
                          placeholder="Company name"
                          className="h-12 mt-2 border-2 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          LinkedIn URL
                        </Label>
                        <Input
                          value={currentSpeaker.linkedin}
                          onChange={(e) =>
                            setCurrentSpeaker({
                              ...currentSpeaker,
                              linkedin: e.target.value,
                            })
                          }
                          placeholder="https://linkedin.com/in/..."
                          className="h-12 mt-2 border-2 rounded-xl"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium">Bio</Label>
                        <Textarea
                          value={currentSpeaker.bio}
                          onChange={(e) =>
                            setCurrentSpeaker({
                              ...currentSpeaker,
                              bio: e.target.value,
                            })
                          }
                          placeholder="Brief speaker biography"
                          rows={3}
                          className="mt-2 border-2 rounded-xl"
                        />
                      </div>
                    </div>
                    {form.formState.errors.speakers && (
                      <p className="flex items-center gap-2 mt-4 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {form.formState.errors.speakers.message}
                      </p>
                    )}
                    <div className="flex gap-3 mt-4">
                      <Button
                        type="button"
                        onClick={addSpeaker}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Speaker
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowSpeakerForm(false);
                          form.clearErrors("speakers");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSpeakerForm(true)}
                    className="w-full border-2 border-dashed h-14 border-slate-300 rounded-xl hover:border-slate-400 dark:border-slate-600"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Speaker
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Event Agenda */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl dark:from-cyan-900/30 dark:to-blue-900/30">
                    <ClockIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  Event Agenda
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Create a detailed schedule for your event
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {agendaFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 border-2 border-slate-200 rounded-xl dark:border-slate-600"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      <div>
                        <Label className="text-sm font-medium">Time</Label>
                        <Input
                          type="time"
                          {...form.register(`agenda.${index}.time`)}
                          className="h-10 mt-2 border-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Title</Label>
                        <Input
                          {...form.register(`agenda.${index}.title`)}
                          placeholder="Session title"
                          className="h-10 mt-2 border-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Speaker</Label>
                        <select
                          {...form.register(`agenda.${index}.speaker`)}
                          className="w-full h-10 px-3 mt-2 bg-white border-2 rounded-lg border-slate-200 focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                        >
                          <option value="">Select speaker</option>
                          {speakerFields.map((speaker) => (
                            <option key={speaker.id} value={speaker.name}>
                              {speaker.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAgenda(index)}
                          className="h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-sm font-medium">Description</Label>
                      <Textarea
                        {...form.register(`agenda.${index}.description`)}
                        placeholder="Session description"
                        rows={2}
                        className="mt-2 border-2 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendAgenda({
                      id: `agenda-${Date.now()}-${Math.floor(
                        Math.random() * 10000
                      )}`,
                      time: "",
                      title: "",
                      description: "",
                      speaker: "",
                    })
                  }
                  className="w-full h-12 border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 dark:border-slate-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Agenda Item
                </Button>
              </CardContent>
            </Card>

            {/* Sponsors */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl dark:from-yellow-900/30 dark:to-orange-900/30">
                    <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  Sponsors & Partners
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Add event sponsors and partners
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {sponsorFields.map((sponsor, index) => (
                  <div
                    key={sponsor.id}
                    className="p-4 border-2 border-slate-200 rounded-xl dark:border-slate-600"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Sponsor Name
                        </Label>
                        <Input
                          {...form.register(`sponsors.${index}.name`)}
                          placeholder="Company name"
                          className="h-10 mt-2 border-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Website</Label>
                        <Input
                          {...form.register(`sponsors.${index}.website`)}
                          placeholder="https://company.com"
                          className="h-10 mt-2 border-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Sponsor Tier
                        </Label>
                        <select
                          {...form.register(`sponsors.${index}.tier`)}
                          className="w-full h-10 px-3 mt-2 bg-white border-2 rounded-lg border-slate-200 focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                        >
                          <option value="platinum">🥇 Platinum</option>
                          <option value="gold">🥈 Gold</option>
                          <option value="silver">🥉 Silver</option>
                          <option value="bronze">🏅 Bronze</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSponsor(index)}
                          className="h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendSponsor({
                      id: Date.now().toString(),
                      name: "",
                      logo: null,
                      website: "",
                      tier: "bronze",
                    })
                  }
                  className="w-full h-12 border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 dark:border-slate-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sponsor
                </Button>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card className="border-0 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm dark:from-slate-800/80 dark:to-slate-700/80">
              <CardContent className="pt-10 pb-8">
                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="px-12 py-6 text-xl font-bold transition-all duration-200 transform shadow-2xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        Creating Event...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6 mr-3" />
                        Create Event
                      </>
                    )}
                  </Button>
                  <Link href="/events">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full px-12 py-6 text-xl font-bold bg-transparent border-2 sm:w-auto rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
                {!form.formState.isValid &&
                  Object.keys(form.formState.errors).length > 0 && (
                    <div className="p-4 mt-6 border border-red-200 bg-red-50 rounded-xl dark:bg-red-900/20 dark:border-red-800">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">
                          Please fix the errors above before submitting
                        </span>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
