// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Calendar,
//   MapPin,
//   Users,
//   Clock,
//   DollarSign,
//   User,
//   Phone,
//   Mail,
//   Globe,
//   Linkedin,
//   Twitter,
//   Award,
//   CheckCircle,
//   Share2,
//   Heart,
//   ExternalLink,
//   AlertCircle,
//   Accessibility,
//   FileText,
//   ClockIcon,
//   MessageCircle,
//   Download,
//   Building2,
// } from "lucide-react";
// import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

// export default function EventDetailPage({ event: eventData }: any) {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   const handleRegister = () => {
//     setIsRegistered(true);

//     eventData.currentAttendees += 1;
//     if (eventData.currentAttendees >= eventData.maxAttendees) {
//       eventData.currentAttendees = eventData.maxAttendees;
//       // Disable further registrations if max attendees reached
//       setIsRegistered(false);
//     } else {
//       setIsRegistered(true);
//     }
//     setIsFavorited(false); // Reset favorite status on registration

//     console.log("User registered for event:", eventData.title);
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: eventData.title,
//           text: eventData.shortDescription,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log("Error sharing:", err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//     }
//   };

//   const spotsRemaining = eventData.maxAttendees - eventData.currentAttendees;
//   const isAlmostFull = spotsRemaining <= 20;
//   const registrationOpen =
//     new Date() < new Date(eventData.registrationDeadline);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//       <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <Link
//           href="/events"
//           className="flex items-center gap-2 px-4 py-2 transition-all duration-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Back to Events</span>
//         </Link>
//         <div className="flex items-center gap-3">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setIsFavorited(!isFavorited)}
//             className={`${isFavorited ? "text-red-600" : "text-slate-600"}`}
//           >
//             <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
//           </Button>
//           <Button variant="ghost" size="sm" onClick={handleShare}>
//             <Share2 className="w-5 h-5" />
//           </Button>
//         </div>
//       </div>

//       <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         {/* Hero Section - Redesigned with 4x4 banner */}
//         <div className="mb-8">
//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
//             {/* Banner Image - 4x4 aspect ratio */}
//             <div className="lg:col-span-2">
//               <div className="relative overflow-hidden shadow-2xl rounded-3xl aspect-square">
//                 <img
//                   src={
//                     eventData.banner || "/placeholder.svg?height=400&width=400"
//                   }
//                   alt={eventData.title}
//                   className="object-cover w-full h-full"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     <Badge className="text-xs text-white border-0 bg-blue-600/90">
//                       {eventData.category.charAt(0).toUpperCase() +
//                         eventData.category.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Event Info */}
//             <div className="flex flex-col justify-center lg:col-span-3">
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {eventData?.tags.slice(0, 4).map((tag: any) => (
//                   <Badge
//                     key={tag}
//                     variant="secondary"
//                     className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
//                   >
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>

//               <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl text-slate-900 dark:text-white">
//                 {eventData.title}
//               </h1>

//               <p className="mb-6 text-lg leading-relaxed md:text-xl text-slate-600 dark:text-slate-300">
//                 {eventData.description}
//               </p>

//               {/* Quick Info Cards */}
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                 <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
//                   <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-600" />
//                   <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
//                     Date
//                   </p>
//                   <p className="text-sm font-bold text-slate-900 dark:text-white">
//                     {new Date(eventData.date).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>

//                 <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
//                   <Clock className="w-5 h-5 mx-auto mb-1 text-purple-600" />
//                   <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
//                     Time
//                   </p>
//                   <p className="text-sm font-bold text-slate-900 dark:text-white">
//                     {eventData.time}
//                   </p>
//                 </div>

//                 <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
//                   <MapPin className="w-5 h-5 mx-auto mb-1 text-orange-600" />
//                   <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
//                     Location
//                   </p>
//                   <p className="text-sm font-bold text-slate-900 dark:text-white">
//                     {eventData.location}
//                   </p>
//                 </div>

//                 <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
//                   <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600" />
//                   <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
//                     Price
//                   </p>
//                   <p className="text-sm font-bold text-slate-900 dark:text-white">
//                     {eventData.eventType === "free"
//                       ? "FREE"
//                       : `$${eventData.ticketPrice}`}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
//           {/* Main Content */}
//           <div className="space-y-8 xl:col-span-3">
//             {/* Event Details */}
//             <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl dark:from-blue-900/30 dark:to-indigo-900/30">
//                     <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   Event Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
//                       <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900 dark:text-white">
//                         Date
//                       </p>
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {new Date(eventData.date).toLocaleDateString("en-US", {
//                           weekday: "long",
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
//                       <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900 dark:text-white">
//                         Time
//                       </p>
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {eventData.time} - {eventData.endTime}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/30">
//                       <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900 dark:text-white">
//                         Location
//                       </p>
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {eventData.location}
//                       </p>
//                       <p className="text-sm text-slate-500 dark:text-slate-500">
//                         {eventData.address}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
//                       <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900 dark:text-white">
//                         Capacity
//                       </p>
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {eventData.currentAttendees} / {eventData.maxAttendees}{" "}
//                         registered
//                       </p>
//                       {isAlmostFull && (
//                         <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
//                           Only {spotsRemaining} spots remaining!
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Description */}
//             <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl dark:from-emerald-900/30 dark:to-teal-900/30">
//                     <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
//                   </div>
//                   About This Event
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="prose prose-slate dark:prose-invert max-w-none">
//                   <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
//                     {showFullDescription
//                       ? eventData.fullDescription
//                       : eventData.description}
//                   </p>
//                   {eventData.fullDescription !== eventData.description && (
//                     <Button
//                       variant="ghost"
//                       onClick={() =>
//                         setShowFullDescription(!showFullDescription)
//                       }
//                       className="h-auto p-0 mt-4 text-blue-600 hover:text-blue-700"
//                     >
//                       {showFullDescription ? "Show Less" : "Read More"}
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Speakers */}
//             {eventData.speakers.length > 0 && (
//               <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-3 text-2xl">
//                     <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl dark:from-violet-900/30 dark:to-purple-900/30">
//                       <User className="w-6 h-6 text-violet-600 dark:text-violet-400" />
//                     </div>
//                     Featured Speakers
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                     {eventData.speakers.map((speaker: any) => (
//                       <div
//                         key={speaker.id}
//                         className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
//                       >
//                         <img
//                           src={speaker.image || "/placeholder.svg"}
//                           alt={speaker.name}
//                           className="flex-shrink-0 object-cover w-16 h-16 rounded-full"
//                         />
//                         <div className="flex-1">
//                           <h4 className="font-bold text-slate-900 dark:text-white">
//                             {speaker.name}
//                           </h4>
//                           <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                             {speaker.title}
//                           </p>
//                           {speaker.company && (
//                             <p className="text-sm text-slate-600 dark:text-slate-400">
//                               {speaker.company}
//                             </p>
//                           )}
//                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
//                             {speaker.bio}
//                           </p>
//                           <div className="flex gap-2 mt-3">
//                             {speaker.linkedin && (
//                               <a
//                                 href={speaker.linkedin}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:text-blue-700"
//                               >
//                                 <Linkedin className="w-4 h-4" />
//                               </a>
//                             )}
//                             {speaker.twitter && (
//                               <a
//                                 href={speaker.twitter}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-400 hover:text-blue-500"
//                               >
//                                 <Twitter className="w-4 h-4" />
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Agenda */}
//             {eventData.agenda.length > 0 && (
//               <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-3 text-2xl">
//                     <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl dark:from-cyan-900/30 dark:to-blue-900/30">
//                       <ClockIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
//                     </div>
//                     Event Schedule
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {eventData.agenda.map((item: any, index: any) => (
//                       <div
//                         key={item.id}
//                         className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
//                       >
//                         <div className="flex-shrink-0 w-20 text-center">
//                           <div className="inline-flex items-center justify-center w-16 h-16 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
//                             {item.time}
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="mb-1 font-bold text-slate-900 dark:text-white">
//                             {item.title}
//                           </h4>
//                           <p className="mb-2 text-slate-600 dark:text-slate-400">
//                             {item.description}
//                           </p>
//                           {item.speaker && (
//                             <div className="flex items-center gap-2">
//                               <User className="w-4 h-4 text-slate-500" />
//                               <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                                 {item.speaker}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Requirements & Accessibility */}
//             {(eventData.requirements || eventData.accessibility) && (
//               <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-3 text-2xl">
//                     <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl dark:from-amber-900/30 dark:to-orange-900/30">
//                       <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                     </div>
//                     Important Information
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {eventData.requirements && (
//                     <div>
//                       <h4 className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
//                         <FileText className="w-5 h-5 text-blue-600" />
//                         Requirements & What to Bring
//                       </h4>
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {eventData.requirements}
//                       </p>
//                     </div>
//                   )}
//                   {eventData.accessibility && (
//                     <div>
//                       <h4 className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
//                         <Accessibility className="w-5 h-5 text-green-600" />
//                         Accessibility Information
//                       </h4>
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {eventData.accessibility}
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             )}

//             {/* Sponsors */}
//             {eventData.sponsors.length > 0 && (
//               // <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//               //   <CardHeader>
//               //     <CardTitle className="flex items-center gap-3 text-2xl">
//               //       <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl dark:from-yellow-900/30 dark:to-orange-900/30">
//               //         <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//               //       </div>
//               //       Event Sponsors
//               //     </CardTitle>
//               //   </CardHeader>
//               //   <CardContent>
//               //     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//               //       {eventData.sponsors.map((sponsor: any) => (
//               //         <div
//               //           key={sponsor.id}
//               //           className="p-4 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
//               //         >
//               //           <img
//               //             src={sponsor.logo || "/placeholder.svg"}
//               //             alt={sponsor.name}
//               //             className="object-contain h-16 mx-auto mb-3"
//               //           />
//               //           <h4 className="font-semibold text-slate-900 dark:text-white">
//               //             {sponsor.name}
//               //           </h4>
//               //           <Badge variant="outline" className="mt-2">
//               //             {sponsor.tier.charAt(0).toUpperCase() +
//               //               sponsor.tier.slice(1)}{" "}
//               //             Sponsor
//               //           </Badge>
//               //           {sponsor.website && (
//               //             <a
//               //               href={sponsor.website}
//               //               target="_blank"
//               //               rel="noopener noreferrer"
//               //               className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
//               //             >
//               //               Visit Website <ExternalLink className="w-3 h-3" />
//               //             </a>
//               //           )}
//               //         </div>
//               //       ))}
//               //     </div>
//               //   </CardContent>
//               // </Card>
//               <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-3 text-2xl">
//                     <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl dark:from-yellow-900/30 dark:to-orange-900/30">
//                       <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//                     </div>
//                     Event Sponsors
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                     {eventData.sponsors.map((sponsor: any) => (
//                       <div
//                         key={sponsor.id}
//                         className="p-4 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
//                       >
//                         <Building2 className="w-16 h-16 mx-auto mb-3 text-gray-600 dark:text-gray-300" />

//                         <h4 className="font-semibold text-slate-900 dark:text-white">
//                           {sponsor.name}
//                         </h4>

//                         <Badge variant="outline" className="mt-2">
//                           {sponsor.tier.charAt(0).toUpperCase() +
//                             sponsor.tier.slice(1)}{" "}
//                           Sponsor
//                         </Badge>

//                         {sponsor.website && (
//                           <a
//                             href={sponsor.website}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
//                           >
//                             Visit Website <ExternalLink className="w-3 h-3" />
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6 xl:col-span-1">
//             {/* Registration Card */}
//             <Card className="sticky border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 top-24">
//               <CardContent className="pt-6">
//                 <div className="mb-6 text-center">
//                   {eventData.eventType === "free" ? (
//                     <div className="text-3xl font-bold text-green-600 dark:text-green-400">
//                       FREE
//                     </div>
//                   ) : (
//                     <div className="text-3xl font-bold text-slate-900 dark:text-white">
//                       ${eventData.ticketPrice}
//                       <span className="text-lg font-normal text-slate-600 dark:text-slate-400">
//                         /ticket
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {!registrationOpen ? (
//                   <div className="p-4 text-center border border-red-200 bg-red-50 rounded-xl dark:bg-red-900/20 dark:border-red-800">
//                     <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
//                     <p className="font-semibold text-red-700 dark:text-red-400">
//                       Registration Closed
//                     </p>
//                     <p className="text-sm text-red-600 dark:text-red-400">
//                       Registration deadline has passed
//                     </p>
//                   </div>
//                 ) : spotsRemaining <= 0 ? (
//                   <div className="p-4 text-center border border-gray-200 bg-gray-50 rounded-xl dark:bg-gray-900/20 dark:border-gray-800">
//                     <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
//                     <p className="font-semibold text-gray-700 dark:text-gray-400">
//                       Event Full
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Join the waitlist to be notified of cancellations
//                     </p>
//                     <Button
//                       variant="outline"
//                       className="w-full mt-3 bg-transparent"
//                     >
//                       Join Waitlist
//                     </Button>
//                   </div>
//                 ) : (
//                   <SignedIn>
//                     {isRegistered ? (
//                       <div className="p-4 text-center border border-green-200 bg-green-50 rounded-xl dark:bg-green-900/20 dark:border-green-800">
//                         <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
//                         <p className="font-semibold text-green-700 dark:text-green-400">
//                           You're Registered!
//                         </p>
//                         <p className="mb-3 text-sm text-green-600 dark:text-green-400">
//                           Check your email for confirmation details
//                         </p>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="w-full bg-transparent"
//                         >
//                           <Download className="w-4 h-4 mr-2" />
//                           Download Calendar Event
//                         </Button>
//                       </div>
//                     ) : (
//                       <Button
//                         onClick={handleRegister}
//                         className="w-full text-lg font-semibold h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                       >
//                         Register Now
//                       </Button>
//                     )}
//                   </SignedIn>
//                 )}

//                 <SignedOut>
//                   <SignInButton>
//                     <Button className="w-full text-lg font-semibold h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                       Sign In to Register
//                     </Button>
//                   </SignInButton>
//                 </SignedOut>

//                 <Separator className="my-6" />

//                 <div className="space-y-4 text-sm">
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Registration Deadline
//                     </span>
//                     <span className="font-medium text-slate-900 dark:text-white">
//                       {new Date(
//                         eventData.registrationDeadline
//                       ).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Spots Remaining
//                     </span>
//                     <span
//                       className={`font-medium ${
//                         isAlmostFull
//                           ? "text-amber-600"
//                           : "text-slate-900 dark:text-white"
//                       }`}
//                     >
//                       {spotsRemaining}
//                     </span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Contact & Links */}
//             <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
//               <CardHeader>
//                 <CardTitle className="text-lg">Contact & Links</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-slate-500" />
//                   <a
//                     href={`mailto:${eventData.contactEmail}`}
//                     className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
//                   >
//                     {eventData.contactEmail}
//                   </a>
//                 </div>
//                 {eventData.contactPhone && (
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5 text-slate-500" />
//                     <a
//                       href={`tel:${eventData.contactPhone}`}
//                       className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
//                     >
//                       {eventData.contactPhone}
//                     </a>
//                   </div>
//                 )}
//                 {eventData.website && (
//                   <div className="flex items-center gap-3">
//                     <Globe className="w-5 h-5 text-slate-500" />
//                     <a
//                       href={eventData.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
//                     >
//                       Event Website <ExternalLink className="w-3 h-3" />
//                     </a>
//                   </div>
//                 )}
//                 {eventData.socialMedia && (
//                   <div className="flex items-center gap-3">
//                     <MessageCircle className="w-5 h-5 text-slate-500" />
//                     <span className="text-slate-600 dark:text-slate-400">
//                       {eventData.socialMedia}
//                     </span>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  User,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Award,
  CheckCircle,
  Share2,
  Heart,
  ExternalLink,
  AlertCircle,
  Accessibility,
  FileText,
  ClockIcon,
  MessageCircle,
  Download,
  Building2,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function EventDetailPage({ event: eventData }: any) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
    eventData.currentAttendees += 1;
    if (eventData.currentAttendees >= eventData.maxAttendees) {
      eventData.currentAttendees = eventData.maxAttendees;
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
    setIsFavorited(false);
    console.log("User registered for event:", eventData.title);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData.title,
          text: eventData.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Calendar download functionality
  const formatDateForICS = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");

    let hour24 = Number.parseInt(hours);
    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    date.setHours(hour24, Number.parseInt(minutes), 0, 0);

    // Format as YYYYMMDDTHHMMSSZ
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const formatEndDateForICS = (dateString: string, endTimeString: string) => {
    if (!endTimeString) {
      // If no end time, assume 2 hours duration
      const startDate = new Date(dateString);
      const [time, period] = eventData.time.split(" ");
      const [hours, minutes] = time.split(":");

      let hour24 = Number.parseInt(hours);
      if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
      } else if (period === "AM" && hour24 === 12) {
        hour24 = 0;
      }

      startDate.setHours(hour24 + 2, Number.parseInt(minutes), 0, 0);
      return startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    return formatDateForICS(dateString, endTimeString);
  };

  const generateICSContent = () => {
    const startDateTime = formatDateForICS(eventData.date, eventData.time);
    const endDateTime = formatEndDateForICS(eventData.date, eventData.endTime);
    const now =
      new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // Clean description for ICS format
    const cleanDescription = (eventData.description || "")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Event Calendar//Event//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${eventData.id || "event"}-${now}@eventcalendar.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `SUMMARY:${eventData.title}`,
      `DESCRIPTION:${cleanDescription}`,
      `LOCATION:${eventData.location}${
        eventData.address ? ", " + eventData.address : ""
      }`,
      `ORGANIZER:CN=Event Organizer:MAILTO:${eventData.contactEmail}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return icsContent;
  };

  const downloadCalendarEvent = () => {
    try {
      const icsContent = generateICSContent();
      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${eventData.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      console.log("Calendar event downloaded successfully");
    } catch (error) {
      console.error("Error downloading calendar event:", error);
      alert(
        "Sorry, there was an error downloading the calendar event. Please try again."
      );
    }
  };

  const spotsRemaining = eventData.maxAttendees - eventData.currentAttendees;
  const isAlmostFull = spotsRemaining <= 20;
  const registrationOpen =
    new Date() < new Date(eventData.registrationDeadline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="flex items-center gap-2 px-4 py-2 transition-all duration-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className={`${isFavorited ? "text-red-600" : "text-slate-600"}`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Banner Image - 4x4 aspect ratio */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden shadow-2xl rounded-3xl aspect-square">
                <img
                  src={
                    eventData.banner || "/placeholder.svg?height=400&width=400"
                  }
                  alt={eventData.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="text-xs text-white border-0 bg-blue-600/90">
                      {eventData.category.charAt(0).toUpperCase() +
                        eventData.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            {/* Event Info */}
            <div className="flex flex-col justify-center lg:col-span-3">
              <div className="flex flex-wrap gap-2 mb-4">
                {eventData?.tags.slice(0, 4).map((tag: any) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl text-slate-900 dark:text-white">
                {eventData.title}
              </h1>
              <p className="mb-6 text-lg leading-relaxed md:text-xl text-slate-600 dark:text-slate-300">
                {eventData.description}
              </p>
              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Date
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {new Date(eventData.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Time
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {eventData.time}
                  </p>
                </div>
                <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Location
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {eventData.location}
                  </p>
                </div>
                <div className="p-3 text-center border bg-white/60 backdrop-blur-sm rounded-xl border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
                  <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Price
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {eventData.eventType === "free"
                      ? "FREE"
                      : `$${eventData.ticketPrice}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-8 xl:col-span-3">
            {/* Event Details */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl dark:from-blue-900/30 dark:to-indigo-900/30">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                      <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Date
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {new Date(eventData.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                      <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Time
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {eventData.time} - {eventData.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/30">
                      <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Location
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {eventData.location}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        {eventData.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                      <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Capacity
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {eventData.currentAttendees} / {eventData.maxAttendees}{" "}
                        registered
                      </p>
                      {isAlmostFull && (
                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                          Only {spotsRemaining} spots remaining!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl dark:from-emerald-900/30 dark:to-teal-900/30">
                    <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  About This Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {showFullDescription
                      ? eventData.fullDescription
                      : eventData.description}
                  </p>
                  {eventData.fullDescription !== eventData.description && (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="h-auto p-0 mt-4 text-blue-600 hover:text-blue-700"
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Speakers */}
            {eventData.speakers && eventData.speakers.length > 0 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl dark:from-violet-900/30 dark:to-purple-900/30">
                      <User className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    Featured Speakers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {eventData.speakers.map((speaker: any) => (
                      <div
                        key={speaker.id}
                        className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
                      >
                        <img
                          src={speaker.image || "/placeholder.svg"}
                          alt={speaker.name}
                          className="flex-shrink-0 object-cover w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-white">
                            {speaker.name}
                          </h4>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {speaker.title}
                          </p>
                          {speaker.company && (
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {speaker.company}
                            </p>
                          )}
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {speaker.bio}
                          </p>
                          <div className="flex gap-2 mt-3">
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agenda */}
            {eventData.agenda && eventData.agenda.length > 0 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl dark:from-cyan-900/30 dark:to-blue-900/30">
                      <ClockIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    Event Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventData.agenda.map((item: any, index: any) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
                      >
                        <div className="flex-shrink-0 w-20 text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            {item.time}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="mb-2 text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                          {item.speaker && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-500" />
                              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {item.speaker}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements & Accessibility */}
            {(eventData.requirements || eventData.accessibility) && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl dark:from-amber-900/30 dark:to-orange-900/30">
                      <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {eventData.requirements && (
                    <div>
                      <h4 className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Requirements & What to Bring
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        {eventData.requirements}
                      </p>
                    </div>
                  )}
                  {eventData.accessibility && (
                    <div>
                      <h4 className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
                        <Accessibility className="w-5 h-5 text-green-600" />
                        Accessibility Information
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        {eventData.accessibility}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sponsors */}
            {eventData.sponsors && eventData.sponsors.length > 0 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl dark:from-yellow-900/30 dark:to-orange-900/30">
                      <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    Event Sponsors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {eventData.sponsors.map((sponsor: any) => (
                      <div
                        key={sponsor.id}
                        className="p-4 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-700/50"
                      >
                        <Building2 className="w-16 h-16 mx-auto mb-3 text-gray-600 dark:text-gray-300" />
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {sponsor.name}
                        </h4>
                        <Badge variant="outline" className="mt-2">
                          {sponsor.tier.charAt(0).toUpperCase() +
                            sponsor.tier.slice(1)}{" "}
                          Sponsor
                        </Badge>
                        {sponsor.website && (
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            Visit Website <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 xl:col-span-1">
            {/* Registration Card */}
            <Card className="sticky border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 top-24">
              <CardContent className="pt-6">
                <div className="mb-6 text-center">
                  {eventData.eventType === "free" ? (
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      FREE
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      ${eventData.ticketPrice}
                      <span className="text-lg font-normal text-slate-600 dark:text-slate-400">
                        /ticket
                      </span>
                    </div>
                  )}
                </div>
                {!registrationOpen ? (
                  <div className="p-4 text-center border border-red-200 bg-red-50 rounded-xl dark:bg-red-900/20 dark:border-red-800">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <p className="font-semibold text-red-700 dark:text-red-400">
                      Registration Closed
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Registration deadline has passed
                    </p>
                  </div>
                ) : spotsRemaining <= 0 ? (
                  <div className="p-4 text-center border border-gray-200 bg-gray-50 rounded-xl dark:bg-gray-900/20 dark:border-gray-800">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <p className="font-semibold text-gray-700 dark:text-gray-400">
                      Event Full
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Join the waitlist to be notified of cancellations
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mt-3 bg-transparent"
                    >
                      Join Waitlist
                    </Button>
                  </div>
                ) : (
                  <SignedIn>
                    {isRegistered ? (
                      <div className="p-4 text-center border border-green-200 bg-green-50 rounded-xl dark:bg-green-900/20 dark:border-green-800">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <p className="font-semibold text-green-700 dark:text-green-400">
                          You're Registered!
                        </p>
                        <p className="mb-3 text-sm text-green-600 dark:text-green-400">
                          Check your email for confirmation details
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={downloadCalendarEvent}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Calendar Event
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleRegister}
                        className="w-full text-lg font-semibold h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Register Now
                      </Button>
                    )}
                  </SignedIn>
                )}
                <SignedOut>
                  <SignInButton>
                    <Button className="w-full text-lg font-semibold h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign In to Register
                    </Button>
                  </SignInButton>
                </SignedOut>
                <Separator className="my-6" />
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Registration Deadline
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {new Date(
                        eventData.registrationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Spots Remaining
                    </span>
                    <span
                      className={`font-medium ${
                        isAlmostFull
                          ? "text-amber-600"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {spotsRemaining}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Links */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader>
                <CardTitle className="text-lg">Contact & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <a
                    href={`mailto:${eventData.contactEmail}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {eventData.contactEmail}
                  </a>
                </div>
                {eventData.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-500" />
                    <a
                      href={`tel:${eventData.contactPhone}`}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      {eventData.contactPhone}
                    </a>
                  </div>
                )}
                {eventData.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-500" />
                    <a
                      href={eventData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Event Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {eventData.socialMedia && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {eventData.socialMedia}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
