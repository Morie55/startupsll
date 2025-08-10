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
import { addAttendee } from "@/app/actions/event-actions";
import { useRouter } from "next/navigation";

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

export default function EventRegisration({ event }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<any>(event);
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
  const [errors, setErrors] = useState<string>("");
  const router = useRouter();
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
      const { success, error } = await addAttendee(selectedEvent._id, formData);
      if (!success) {
        setErrors(error || "Registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      router.refresh();
      setRegistrationSuccess(true);
    } catch (error) {
      setErrors(
        (error as Error).message || "Registration failed. Please try again."
      );
      setRegistrationSuccess(false);
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
    <div className="">
      {/* Registration Modal */}
      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        onClick={() => handleRegistrationClick(event)}
      >
        Register
      </Button>
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
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRegistration} className="space-y-6">
              {/* Event Summary */}
              <div className="p-4 bg-slate-50 rounded-xl dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedEvent?.banner || "/images/pholder2.png"}
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

              {errors && (
                <div className="relative flex items-center justify-center gap-3 p-4 bg-red-100 rounded-lg h-14">
                  <div
                    className="absolute p-2 rounded-full cursor-pointer top-2 bg-slate-50 right-2"
                    onClick={() => setErrors("")}
                  >
                    <X className="w-5 h-5 text-red-600 " />
                  </div>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-600 ">{errors}</p>
                </div>
              )}
              <div className="flex gap-3 ">
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
