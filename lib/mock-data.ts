// Mock data for events with approval status
export const events = [
  {
    id: 1,
    title: "StartUp Pitch Night",
    description:
      "Join us for an evening of innovative startup pitches from Sierra Leone's most promising entrepreneurs.",
    fullDescription:
      "This monthly pitch night is designed to showcase the best emerging startups in Sierra Leone's growing tech ecosystem. Each startup will have 5 minutes to present their business model, followed by a 3-minute Q&A session with our expert panel.",
    date: "2024-02-15",
    time: "18:00",
    endTime: "21:00",
    location: "Freetown Innovation Hub",
    address: "15 Siaka Stevens Street, Freetown, Sierra Leone",
    attendees: 45,
    maxAttendees: 100,
    category: "Networking",
    status: "upcoming",
    approvalStatus: "approved",
    createdBy: "user_123",
    createdAt: "2024-01-15T10:00:00.000Z",
    organizer: {
      name: "StartUp-SL Team",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Connecting Sierra Leone's startup ecosystem",
    },
    speakers: [
      {
        name: "Dr. Amina Kargbo",
        role: "Tech Investor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Mohamed Sesay",
        role: "Serial Entrepreneur",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    tags: ["Startups", "Pitching", "Networking", "Investment"],
  },
  {
    id: 2,
    title: "Tech Founders Meetup",
    description:
      "Monthly gathering for tech founders to share experiences, challenges, and opportunities.",
    fullDescription:
      "Join us for our monthly Tech Founders Meetup, a casual gathering where entrepreneurs can connect, share insights, and learn from each other's experiences.",
    date: "2024-02-20",
    time: "19:00",
    endTime: "21:30",
    location: "Impact Hub Freetown",
    address: "32 Wilkinson Road, Freetown, Sierra Leone",
    attendees: 32,
    maxAttendees: 50,
    category: "Meetup",
    status: "upcoming",
    approvalStatus: "approved",
    createdBy: "user_456",
    createdAt: "2024-01-18T14:30:00.000Z",
    organizer: {
      name: "Freetown Tech Community",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Building Sierra Leone's tech community one meetup at a time",
    },
    speakers: [
      {
        name: "Ibrahim Koroma",
        role: "Fintech Founder",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    tags: ["Tech", "Networking", "Founders"],
  },
  {
    id: 3,
    title: "Blockchain Summit",
    description:
      "Exploring the future of blockchain technology and cryptocurrency adoption in Sierra Leone.",
    fullDescription:
      "A comprehensive summit covering the latest developments in blockchain technology and cryptocurrency, with a focus on practical applications in Sierra Leone's economy.",
    date: "2024-03-10",
    time: "09:00",
    endTime: "17:00",
    location: "Radisson Blu Hotel",
    address: "Aberdeen, Freetown, Sierra Leone",
    attendees: 0,
    maxAttendees: 200,
    category: "Conference",
    status: "upcoming",
    approvalStatus: "pending",
    createdBy: "user_202",
    createdAt: "2024-02-01T11:20:00.000Z",
    organizer: {
      name: "Crypto SL Community",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Promoting blockchain adoption in Sierra Leone",
    },
    speakers: [
      {
        name: "Alex Thompson",
        role: "Blockchain Expert",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    tags: ["Blockchain", "Cryptocurrency", "Fintech"],
  },
  {
    id: 4,
    title: "AI Workshop",
    description:
      "Hands-on workshop introducing artificial intelligence and machine learning concepts.",
    fullDescription:
      "A practical workshop designed to introduce participants to the fundamentals of artificial intelligence and machine learning, with real-world applications.",
    date: "2024-03-15",
    time: "10:00",
    endTime: "16:00",
    location: "University of Sierra Leone",
    address: "Njala Campus, Bo, Sierra Leone",
    attendees: 0,
    maxAttendees: 40,
    category: "Workshop",
    status: "upcoming",
    approvalStatus: "pending",
    createdBy: "user_303",
    createdAt: "2024-02-03T08:30:00.000Z",
    organizer: {
      name: "AI Sierra Leone",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Advancing AI education and research in Sierra Leone",
    },
    speakers: [
      {
        name: "Dr. James Koroma",
        role: "AI Researcher",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    tags: ["AI", "Machine Learning", "Technology"],
  },
];

// Mock data for investors
export const investors = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@angelinvestors.sl",
    company: "Sierra Leone Angel Network",
    position: "Managing Partner",
    bio: "Experienced angel investor with 15+ years in African markets. Focus on fintech, agtech, and healthcare startups.",
    investmentRange: "$10K - $100K",
    sectors: ["Fintech", "Healthcare", "Agriculture"],
    location: "Freetown, Sierra Leone",
    website: "https://angelnetwork.sl",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    approvalStatus: "approved",
    submittedAt: "2024-01-10T09:00:00.000Z",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Thomas Lee",
    email: "thomas@africavc.com",
    company: "Africa Venture Capital",
    position: "Investment Director",
    bio: "Venture capitalist specializing in early-stage African startups. Former entrepreneur with successful exits.",
    investmentRange: "$100K - $2M",
    sectors: ["Technology", "Education", "Clean Energy"],
    location: "Lagos, Nigeria",
    website: "https://africavc.com",
    linkedin: "https://linkedin.com/in/thomaslee",
    approvalStatus: "approved",
    submittedAt: "2024-01-15T11:20:00.000Z",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@globaltech.vc",
    company: "Global Tech Ventures",
    position: "Partner",
    bio: "Technology investor with expertise in AI, blockchain, and mobile solutions. Looking to expand into African markets.",
    investmentRange: "$250K - $5M",
    sectors: ["AI/ML", "Blockchain", "Mobile Technology"],
    location: "Singapore",
    website: "https://globaltech.vc",
    linkedin: "https://linkedin.com/in/michaelchen",
    approvalStatus: "pending",
    submittedAt: "2024-02-01T13:15:00.000Z",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "David Okonkwo",
    email: "david@nigeriatech.fund",
    company: "Nigeria Tech Fund",
    position: "Founding Partner",
    bio: "Former tech executive turned investor. Focus on B2B SaaS and marketplace solutions across West Africa.",
    investmentRange: "$100K - $1M",
    sectors: ["B2B SaaS", "Marketplaces", "Enterprise Software"],
    location: "Abuja, Nigeria",
    website: "https://nigeriatech.fund",
    linkedin: "https://linkedin.com/in/davidokonkwo",
    approvalStatus: "rejected",
    submittedAt: "2024-01-25T14:20:00.000Z",
    rejectionReason: "Insufficient documentation provided",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

// Mock user data
export const currentUser = {
  id: "user_123",
  name: "Demo User",
  email: "demo@example.com",
  imageUrl: "/placeholder.svg?height=40&width=40",
  isAdmin: true,
};

// Mock registered events for the current user
export const userRegisteredEvents = [1, 2];

// Mock admin statistics
export const adminStats = {
  pendingEvents: events.filter((e) => e.approvalStatus === "pending").length,
  pendingInvestors: investors.filter((i) => i.approvalStatus === "pending")
    .length,
  totalEvents: events.length,
  totalInvestors: investors.length,
  approvedEvents: events.filter((e) => e.approvalStatus === "approved").length,
  approvedInvestors: investors.filter((i) => i.approvalStatus === "approved")
    .length,
};
