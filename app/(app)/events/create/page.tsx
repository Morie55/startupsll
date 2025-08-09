"use client";

import type React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ArrowLeft,
  Calendar,
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
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Award,
  ClockIcon,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

interface FormErrors {
  [key: string]: string;
}

async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const banner = formData.get("banner") as File;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Creating event:", {
    title,
    description,
    date,
    time,
    banner: banner?.name,
  });
  return { success: true };
}

export default function CreateEventPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [speakers, setSpeakers] = useState<
    Array<{
      id: string;
      name: string;
      title: string;
      company: string;
      bio: string;
      image: string | null;
      linkedin: string;
      twitter: string;
    }>
  >([]);
  const [currentSpeaker, setCurrentSpeaker] = useState({
    name: "",
    title: "",
    company: "",
    bio: "",
    image: null as string | null,
    linkedin: "",
    twitter: "",
  });
  const [showSpeakerForm, setShowSpeakerForm] = useState(false);
  const [agenda, setAgenda] = useState<
    Array<{
      id: string;
      time: string;
      title: string;
      description: string;
      speaker: string;
    }>
  >([]);
  const [sponsors, setSponsors] = useState<
    Array<{
      id: string;
      name: string;
      logo: string | null;
      website: string;
      tier: "platinum" | "gold" | "silver" | "bronze";
    }>
  >([]);

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.get("title")) errors.title = "Event title is required";
    if (!formData.get("description"))
      errors.description = "Description is required";
    if (!formData.get("date")) errors.date = "Event date is required";
    if (!formData.get("time")) errors.time = "Start time is required";
    if (!formData.get("location")) errors.location = "Venue name is required";
    if (!formData.get("maxAttendees"))
      errors.maxAttendees = "Maximum attendees is required";
    if (!formData.get("eventType")) errors.eventType = "Event type is required";
    if (!formData.get("contactEmail"))
      errors.contactEmail = "Contact email is required";
    if (!formData.get("registrationDeadline"))
      errors.registrationDeadline = "Registration deadline is required";

    const eventType = formData.get("eventType");
    if (eventType === "paid" && !formData.get("ticketPrice")) {
      errors.ticketPrice = "Ticket price is required for paid events";
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await createEvent(formData);
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      setErrors({ submit: "Failed to create event. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Update the file input
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeBanner = () => {
    setBannerPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addSpeaker = () => {
    if (currentSpeaker.name && currentSpeaker.title) {
      setSpeakers([
        ...speakers,
        {
          ...currentSpeaker,
          id: Date.now().toString(),
        },
      ]);
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
    }
  };

  const removeSpeaker = (id: string) => {
    setSpeakers(speakers.filter((speaker) => speaker.id !== id));
  };

  const addAgendaItem = () => {
    const newId = `agenda-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newItem = {
      id: newId,
      time: "",
      title: "",
      description: "",
      speaker: "",
    };

    setAgenda((prevAgenda) => [...prevAgenda, newItem]);
  };

  const updateAgendaItem = (id: string, field: string, value: string) => {
    setAgenda((prevAgenda) =>
      prevAgenda.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeAgendaItem = (id: string) => {
    setAgenda((prevAgenda) => prevAgenda.filter((item) => item.id !== id));
  };

  const addSponsor = () => {
    setSponsors([
      ...sponsors,
      {
        id: Date.now().toString(),
        name: "",
        logo: null,
        website: "",
        tier: "bronze",
      },
    ]);
  };

  const updateSponsor = (id: string, field: string, value: string) => {
    setSponsors(
      sponsors.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, [field]: value } : sponsor
      )
    );
  };

  const removeSponsor = (id: string) => {
    setSponsors(sponsors.filter((sponsor) => sponsor.id !== id));
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
        {/* Enhanced Header Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold lg:text-6xl text-slate-900 dark:text-white">
            Share Your Vision
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Connect with the StartUp-SL community by creating engaging events
            that inspire, educate, and bring entrepreneurs together
          </p>
        </div>

        {errors.submit && (
          <Card className="mb-8 border-red-200 bg-red-50/80 backdrop-blur-sm dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{errors.submit}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
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
                Upload an eye-catching banner image for your event (recommended:
                800x800px square)
              </p>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 ${
                  isDragOver
                    ? "border-blue-400 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-900/20"
                    : "border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="banner"
                  accept="image/*"
                  placeholder="Upload event banner"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {bannerPreview ? (
                  <div className="relative">
                    <img
                      src={bannerPreview || "/placeholder.svg"}
                      alt="Banner preview"
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute w-8 h-8 p-0 rounded-full top-3 right-3"
                      onClick={removeBanner}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
                      <Upload className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                      Upload Event Banner
                    </h3>
                    <p className="mb-4 text-slate-600 dark:text-slate-400">
                      Drag and drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      Supports: JPG, PNG, GIF (max 10MB)
                    </p>
                  </div>
                )}
              </div>
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
                  <Label
                    htmlFor="title"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a compelling event title"
                    className={`mt-3 h-14 text-lg border-2 rounded-xl ${
                      errors.title
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {errors.title && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <Label
                    htmlFor="description"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Short Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description that will appear in event listings (max 200 characters)"
                    maxLength={200}
                    className={`mt-3 min-h-[120px] border-2 rounded-xl ${
                      errors.description
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {errors.description && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <Label
                    htmlFor="fullDescription"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Full Description
                  </Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    placeholder="Detailed description including agenda, what attendees can expect, requirements, etc."
                    rows={8}
                    className="mt-3 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="category"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Category *
                  </Label>
                  <Select name="category">
                    <SelectTrigger className="mt-3 border-2 h-14 border-slate-200 rounded-xl">
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="networking">🤝 Networking</SelectItem>
                      <SelectItem value="workshop">🛠️ Workshop</SelectItem>
                      <SelectItem value="meetup">☕ Meetup</SelectItem>
                      <SelectItem value="conference">🎤 Conference</SelectItem>
                      <SelectItem value="investment">💰 Investment</SelectItem>
                      <SelectItem value="training">📚 Training</SelectItem>
                      <SelectItem value="other">📋 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold text-slate-900 dark:text-white">
                    Tags
                  </Label>
                  <div className="mt-3 space-y-4">
                    <div className="flex gap-3">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        placeholder="Add tags (press Enter)"
                        className="border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        className="px-6 border-2 h-14 rounded-xl"
                      >
                        <Tag className="w-5 h-5" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
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
                <div>
                  <Label
                    htmlFor="date"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Event Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    className={`mt-3 h-14 border-2 rounded-xl ${
                      errors.date
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {errors.date && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="time"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Start Time *
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    className={`mt-3 h-14 border-2 rounded-xl ${
                      errors.time
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {errors.time && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.time}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="endTime"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
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
                <div>
                  <Label
                    htmlFor="location"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Venue Name *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Freetown Innovation Hub"
                    className={`mt-3 h-14 border-2 rounded-xl ${
                      errors.location
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {errors.location && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.location}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="address"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Full Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address, city, country"
                    className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
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
                <Label
                  htmlFor="maxAttendees"
                  className="text-base font-semibold text-slate-900 dark:text-white"
                >
                  Maximum Attendees *
                </Label>
                <Input
                  id="maxAttendees"
                  name="maxAttendees"
                  type="number"
                  placeholder="e.g., 100"
                  min="1"
                  className={`mt-3 h-14 border-2 rounded-xl ${
                    errors.maxAttendees
                      ? "border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                  required
                />
                {errors.maxAttendees && (
                  <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.maxAttendees}
                  </p>
                )}
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
                <div>
                  <Label
                    htmlFor="eventType"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Event Type *
                  </Label>
                  <Select name="eventType">
                    <SelectTrigger className="mt-3 border-2 h-14 border-slate-200 rounded-xl">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">🎁 Free Event</SelectItem>
                      <SelectItem value="paid">💳 Paid Event</SelectItem>
                      <SelectItem value="donation">
                        💝 Donation Based
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.eventType}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="ticketPrice"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Ticket Price (if paid)
                  </Label>
                  <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    type="number"
                    placeholder="e.g., 25.00"
                    min="0"
                    step="0.01"
                    className={`mt-3 h-14 border-2 rounded-xl ${
                      errors.ticketPrice
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.ticketPrice && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.ticketPrice}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="registrationDeadline"
                  className="text-base font-semibold text-slate-900 dark:text-white"
                >
                  Registration Deadline *
                </Label>
                <Input
                  id="registrationDeadline"
                  name="registrationDeadline"
                  type="datetime-local"
                  className={`mt-3 h-14 border-2 rounded-xl ${
                    errors.registrationDeadline
                      ? "border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                  required
                />
                {errors.registrationDeadline && (
                  <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.registrationDeadline}
                  </p>
                )}
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
              {speakers.length > 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {speakers.map((speaker) => (
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
                          onClick={() => removeSpeaker(speaker.id)}
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
                        placeholder="Full name"
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
                      onClick={() => setShowSpeakerForm(false)}
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
              {agenda.map((item, index) => (
                <div
                  key={`agenda-item-${item.id}`}
                  className="p-4 border-2 border-slate-200 rounded-xl dark:border-slate-600"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                      <Label className="text-sm font-medium">Time</Label>
                      <Input
                        type="time"
                        value={item.time}
                        onChange={(e) =>
                          updateAgendaItem(item.id, "time", e.target.value)
                        }
                        className="h-10 mt-2 border-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateAgendaItem(item.id, "title", e.target.value)
                        }
                        placeholder="Session title"
                        className="h-10 mt-2 border-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Speaker</Label>
                      <select
                        value={item.speaker}
                        onChange={(e) =>
                          updateAgendaItem(item.id, "speaker", e.target.value)
                        }
                        className="w-full h-10 px-3 mt-2 bg-white border-2 rounded-lg border-slate-200 focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      >
                        <option value="">Select speaker</option>
                        {speakers.map((speaker) => (
                          <option
                            key={`speaker-option-${speaker.id}`}
                            value={speaker.name}
                          >
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
                        onClick={() => removeAgendaItem(item.id)}
                        className="h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label className="text-sm font-medium">Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) =>
                        updateAgendaItem(item.id, "description", e.target.value)
                      }
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
                onClick={addAgendaItem}
                className="w-full h-12 border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 dark:border-slate-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Agenda Item
              </Button>
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
                <div>
                  <Label
                    htmlFor="contactEmail"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="contact@example.com"
                    className={`mt-3 h-14 border-2 rounded-xl ${
                      errors.contactEmail
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {errors.contactEmail && (
                    <p className="flex items-center gap-2 mt-3 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="contactPhone"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="requirements"
                  className="text-base font-semibold text-slate-900 dark:text-white"
                >
                  Requirements & Prerequisites
                </Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Any requirements, prerequisites, or items attendees should bring"
                  rows={4}
                  className="mt-3 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="accessibility"
                  className="text-base font-semibold text-slate-900 dark:text-white"
                >
                  Accessibility Information
                </Label>
                <Textarea
                  id="accessibility"
                  name="accessibility"
                  placeholder="Information about venue accessibility, accommodations available, etc."
                  rows={3}
                  className="mt-3 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>
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
                <div>
                  <Label
                    htmlFor="website"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Event Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://your-event-website.com"
                    className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="socialMedia"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    Social Media Hashtag
                  </Label>
                  <Input
                    id="socialMedia"
                    name="socialMedia"
                    placeholder="#YourEventHashtag"
                    className="mt-3 border-2 h-14 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
              </div>
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
              {sponsors.map((sponsor) => (
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
                        value={sponsor.name}
                        onChange={(e) =>
                          updateSponsor(sponsor.id, "name", e.target.value)
                        }
                        placeholder="Company name"
                        className="h-10 mt-2 border-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Website</Label>
                      <Input
                        value={sponsor.website}
                        onChange={(e) =>
                          updateSponsor(sponsor.id, "website", e.target.value)
                        }
                        placeholder="https://company.com"
                        className="h-10 mt-2 border-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Sponsor Tier
                      </Label>
                      <Select
                        value={sponsor.tier}
                        onValueChange={(value) =>
                          updateSponsor(sponsor.id, "tier", value)
                        }
                      >
                        <SelectTrigger className="h-10 mt-2 border-2 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">🥇 Platinum</SelectItem>
                          <SelectItem value="gold">🥈 Gold</SelectItem>
                          <SelectItem value="silver">🥉 Silver</SelectItem>
                          <SelectItem value="bronze">🏅 Bronze</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSponsor(sponsor.id)}
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
                onClick={addSponsor}
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
                  className="px-12 py-6 text-xl font-bold transition-all duration-200 transform shadow-2xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
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
                    className="w-full px-12 py-6 text-xl font-bold border-2 sm:w-auto rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
