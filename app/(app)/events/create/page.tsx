"use client";

import type React from "react";
import { useState } from "react";
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

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Creating event:", { title, description, date, time });
  return { success: true };
}

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex items-center gap-4 px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="flex items-center gap-2 px-3 py-2 transition-all duration-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Events</span>
        </Link>
      </div>

      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
        <SignedOut>
          <Card className="p-6 text-center border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl text-slate-900">
              Sign In Required
            </h2>
            <p className="max-w-md mx-auto mb-6 text-base sm:text-lg text-slate-600">
              You need to be signed in to create an event and share it with the
              StartUp-SL community.
            </p>
            <SignInButton>
              <Button
                size="lg"
                className="w-full px-6 py-3 text-base sm:w-auto sm:text-lg"
              >
                Sign In to Continue
              </Button>
            </SignInButton>
          </Card>
        </SignedOut>

        <SignedIn>
          {/* Enhanced Header Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl text-slate-900 dark:text-white">
              Create New Event
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
              Share your event with the StartUp-SL community and connect with
              like-minded entrepreneurs
            </p>
          </div>

          {errors.submit && (
            <Card className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errors.submit}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm dark:bg-slate-800/70">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="lg:col-span-2">
                    <Label htmlFor="title" className="text-base font-medium">
                      Event Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter a compelling event title"
                      className={`mt-2 h-12 text-lg ${
                        errors.title ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.title && (
                      <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    <Label
                      htmlFor="description"
                      className="text-base font-medium"
                    >
                      Short Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description that will appear in event listings (max 200 characters)"
                      maxLength={200}
                      className={`mt-2 min-h-[100px] ${
                        errors.description ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.description && (
                      <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    <Label
                      htmlFor="fullDescription"
                      className="text-base font-medium"
                    >
                      Full Description
                    </Label>
                    <Textarea
                      id="fullDescription"
                      name="fullDescription"
                      placeholder="Detailed description including agenda, what attendees can expect, requirements, etc."
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-base font-medium">
                      Category *
                    </Label>
                    <Select name="category">
                      <SelectTrigger className="h-12 mt-2">
                        <SelectValue placeholder="Select event category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="networking">
                          🤝 Networking
                        </SelectItem>
                        <SelectItem value="workshop">🛠️ Workshop</SelectItem>
                        <SelectItem value="meetup">☕ Meetup</SelectItem>
                        <SelectItem value="conference">
                          🎤 Conference
                        </SelectItem>
                        <SelectItem value="investment">
                          💰 Investment
                        </SelectItem>
                        <SelectItem value="training">📚 Training</SelectItem>
                        <SelectItem value="other">📋 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Tags</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagKeyPress}
                          placeholder="Add tags (press Enter)"
                          className="h-12"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                          className="px-4"
                        >
                          <Tag className="w-4 h-4" />
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="px-3 py-1 cursor-pointer hover:bg-red-100 hover:text-red-700"
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
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm dark:bg-slate-800/70">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <Label htmlFor="date" className="text-base font-medium">
                      Event Date *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      className={`mt-2 h-12 ${
                        errors.date ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.date && (
                      <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-base font-medium">
                      Start Time *
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      className={`mt-2 h-12 ${
                        errors.time ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.time && (
                      <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {errors.time}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="endTime" className="text-base font-medium">
                      End Time
                    </Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      className="h-12 mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm dark:bg-slate-800/70">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="location" className="text-base font-medium">
                      Venue Name *
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Freetown Innovation Hub"
                      className={`mt-2 h-12 ${
                        errors.location ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.location && (
                      <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-base font-medium">
                      Full Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, city, country"
                      className="h-12 mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm dark:bg-slate-800/70">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/30">
                    <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <Label
                    htmlFor="maxAttendees"
                    className="text-base font-medium"
                  >
                    Maximum Attendees *
                  </Label>
                  <Input
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    placeholder="e.g., 100"
                    min="1"
                    className={`mt-2 h-12 ${
                      errors.maxAttendees ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.maxAttendees && (
                    <p className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.maxAttendees}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="pt-8">
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="px-8 py-4 text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating Event...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Create Event
                      </>
                    )}
                  </Button>

                  <Link href="/events">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full px-8 py-4 text-lg font-semibold sm:w-auto"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </SignedIn>
      </div>
    </div>
  );
}
