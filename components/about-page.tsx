"use client";

import Image from "next/image";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Users,
  Target,
  Globe,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const team = [
  {
    id: 1,
    name: "Francis Steven George",
    role: "Executive Director",
    image: "/FrancisGeorge.png",
    bio: "Mr. Francis has over 15 years of experience in entrepreneurship and ecosystem building, leading strategic initiatives across West Africa.",
    expertise: ["Strategy", "Leadership", "Ecosystem Building"],
  },
  {
    id: 2,
    name: "Ngevao Sesay",
    role: "Head of Programs",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Ngevao leads our startup support programs and mentorship initiatives, with a focus on sustainable business development.",
    expertise: ["Program Management", "Mentorship", "Business Development"],
  },
  {
    id: 3,
    name: "Diana Lake",
    role: "Investor Relations",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Diana connects startups with investors and manages funding relationships, bringing extensive experience in venture capital.",
    expertise: ["Investment", "Fundraising", "Venture Capital"],
  },
  {
    id: 4,
    name: "Morie Keita",
    role: "Technology Lead",
    image: "/images/Morie_Keita.jpg",
    bio: "Morie oversees and develop our technology infrastructure and digital initiatives, ensuring scalable solutions for our ecosystem.",
    expertise: ["Technology", "Digital Innovation", "Infrastructure"],
  },
];

const partners = [
  {
    name: "Ministry of Innovation",
    description: "Government partner supporting innovation initiatives",
    icon: Building2,
  },
  {
    name: "Global Ventures",
    description: "International investment and advisory firm",
    icon: Globe,
  },
  {
    name: "Tech Foundation",
    description: "Non-profit supporting technology education",
    icon: Award,
  },
  {
    name: "Innovation Hub",
    description: "Co-working and incubation space provider",
    icon: Users,
  },
];

const stats = [
  { label: "Startups Supported", value: "150+" },
  { label: "Jobs Created", value: "500+" },
  { label: "Funding Raised", value: "$2.5M+" },
  { label: "Active Partners", value: "25+" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container px-4 py-12 mx-auto md:px-6 lg:px-8 dark:bg-gray-900">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-transparent md:text-5xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text">
            About StartUpSL
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Empowering Sierra Leone's next generation of entrepreneurs and
            innovators
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6 mb-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800"
            >
              <CardContent className="pt-6">
                <div className="mb-2 text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="mission" className="w-full ">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm dark:bg-gray-800">
            <TabsTrigger value="mission" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Our Mission</span>
              <span className="sm:hidden">Mission</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Our Team</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partners</span>
              <span className="sm:hidden">Partners</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
              <span className="sm:hidden">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="space-y-8">
            <Card className="border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-800">
              <CardHeader className="pb-8 text-center">
                <CardTitle className="text-3xl font-bold">
                  Our Mission
                </CardTitle>
                <CardDescription className="text-lg">
                  Building Sierra Leone's most vibrant startup ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="relative overflow-hidden aspect-video rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <Image
                    src="/images/startupslbg.png"
                    alt="StartUpSL ecosystem"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-2xl font-semibold text-slate-900">
                        Who We Are
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        StartUpSL is Sierra Leone's premier startup ecosystem
                        platform, designed to connect, support, and accelerate
                        the growth of innovative businesses across the country.
                        We serve as the central hub where entrepreneurs,
                        investors, mentors, and resources converge to create
                        lasting impact.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-4 text-2xl font-semibold text-slate-900">
                        Our Vision
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        To position Sierra Leone as a leading innovation hub in
                        West Africa, fostering sustainable economic growth
                        through entrepreneurship, technology, and strategic
                        partnerships that create opportunities for all.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-6 text-2xl font-semibold text-slate-900">
                      Our Impact Goals
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Support entrepreneurs in building scalable, sustainable businesses",
                        "Connect startups with investors and funding opportunities",
                        "Provide comprehensive resources, mentorship, and training programs",
                        "Foster collaboration between startups, corporations, and government",
                        "Showcase Sierra Leone's innovation and entrepreneurial talent globally",
                        "Attract international investment and strategic partnerships",
                      ].map((goal, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                          <p className="text-muted-foreground">{goal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                Meet Our Leadership Team
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Our diverse team brings together decades of experience in
                entrepreneurship, technology, and ecosystem development.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden transition-all duration-300 border-0 group hover:shadow-xl bg-white/90 backdrop-blur-sm dark:bg-gray-800"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-square">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {member.name}
                        </h3>
                        <p className="font-medium text-primary">
                          {member.role}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-8 ">
            <Card className="border-0 bg-white/90 dark:bg-gray-800 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                  Strategic Partners
                </CardTitle>
                <CardDescription className="text-lg">
                  Collaborating with leading organizations to strengthen our
                  ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {partners.map((partner, index) => (
                    <div key={index} className="space-y-4 text-center group">
                      <div className="flex items-center justify-center w-24 h-24 mx-auto transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10">
                        <partner.icon className="w-12 h-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-slate-900">
                          {partner.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Get In Touch
                  </CardTitle>
                  <CardDescription className="text-base">
                    Ready to join Sierra Leone's startup revolution? We'd love
                    to hear from you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-slate-900">
                          Visit Our Office
                        </h3>
                        <p className="text-muted-foreground">
                          123 Innovation Street
                          <br />
                          Freetown, Sierra Leone
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-slate-900">
                          Email Us
                        </h3>
                        <p className="text-muted-foreground">
                          info@startupsl.org
                          <br />
                          support@startupsl.org
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-slate-900">
                          Call Us
                        </h3>
                        <p className="text-muted-foreground">
                          +232 76 123 4567
                          <br />
                          +232 77 987 6543
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Have a question or want to learn more? Drop us a line.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className="resize-none"
                      />
                    </div>

                    <Button className="w-full py-3 font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary/80 dark:to-primary/60 ">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
