// Mock MongoDB database initialization for BuildBoard MVP

export const INITIAL_USERS = [
  {
    _id: "usr_101",
    name: "Alex Rivera",
    username: "arivera",
    email: "alex@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Fullstack Developer & SaaS creator building next-gen web tools.",
    createdAt: "2026-01-10T00:00:00.000Z"
  },
  {
    _id: "usr_102",
    name: "Sarah Chen",
    username: "schen_dev",
    email: "sarah@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "AI Engineer & Open Source Advocate.",
    createdAt: "2026-02-14T00:00:00.000Z"
  },
  {
    _id: "usr_103",
    name: "Marcus Vance",
    username: "mvance",
    email: "marcus@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Product Designer & Frontend Specialist.",
    createdAt: "2026-03-01T00:00:00.000Z"
  },
  {
    _id: "usr_104",
    name: "Elena Rostova",
    username: "elena_r",
    email: "elena@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    bio: "Backend Architect specializing in Go & distributed systems.",
    createdAt: "2026-04-12T00:00:00.000Z"
  }
];

export const INITIAL_PRODUCTS = [
  {
    _id: "prod_1",
    title: "DevPulse Analytics",
    tagline: "Real-time API performance & error tracking with zero config",
    description: "DevPulse Analytics provides instant observability for web applications. Instrument your app in seconds to monitor query latencies, API error rates, and client performance bottlenecks with customized dashboard alerts.",
    category: "Developer Tools",
    githubUrl: "https://github.com/buildboard/devpulse-analytics",
    websiteUrl: "https://devpulse.io",
    author: {
      _id: "usr_101",
      name: "Alex Rivera",
      username: "arivera",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    upvotes: ["usr_101", "usr_102", "usr_103", "usr_104", "usr_demo_1", "usr_demo_2", "usr_demo_3"],
    isBestOfWeek: true,
    badgeText: "#1 Product of the Week",
    reviews: [
      {
        _id: "rev_101",
        userId: "usr_102",
        userName: "Sarah Chen",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        comment: "Extremely clean installation. Solved our latency diagnosing bottleneck in less than 15 minutes of integration.",
        rating: 5,
        createdAt: "2026-08-28T14:30:00.000Z"
      },
      {
        _id: "rev_102",
        userId: "usr_103",
        userName: "Marcus Vance",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        comment: "Minimalist dashboard UX is top tier. Exactly what developer observability toolings were missing.",
        rating: 5,
        createdAt: "2026-08-30T09:15:00.000Z"
      }
    ],
    createdAt: "2026-08-25T08:00:00.000Z"
  },
  {
    _id: "prod_2",
    title: "Synthetix AI",
    tagline: "Local LLM prompt caching & cost optimization middleware",
    description: "Synthetix AI acts as a smart proxy between your server and LLM APIs. By caching semantically similar query responses and dynamically routing workloads, Synthetix reduces API billing costs by up to 60%.",
    category: "AI & Data",
    githubUrl: "https://github.com/buildboard/synthetix-ai",
    websiteUrl: "https://synthetix.ai",
    author: {
      _id: "usr_102",
      name: "Sarah Chen",
      username: "schen_dev",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    upvotes: ["usr_101", "usr_102", "usr_104", "usr_demo_1", "usr_demo_4"],
    isBestOfWeek: true,
    badgeText: "#2 Product of the Week",
    reviews: [
      {
        _id: "rev_201",
        userId: "usr_101",
        userName: "Alex Rivera",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        comment: "Game changer for production workloads running heavy OpenAI completions. Highly recommended!",
        rating: 5,
        createdAt: "2026-08-29T11:00:00.000Z"
      }
    ],
    createdAt: "2026-08-26T10:00:00.000Z"
  },
  {
    _id: "prod_3",
    title: "TypeCraft",
    tagline: "Blazing fast visual TypeScript schema and interface generator",
    description: "TypeCraft converts complex raw JSON payloads, GraphQL schemas, and database definitions into strongly-typed TypeScript interfaces automatically with validation guard generation.",
    category: "Developer Tools",
    githubUrl: "https://github.com/buildboard/typecraft",
    websiteUrl: "https://typecraft.dev",
    author: {
      _id: "usr_103",
      name: "Marcus Vance",
      username: "mvance",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    upvotes: ["usr_102", "usr_103", "usr_104"],
    isBestOfWeek: true,
    badgeText: "#3 Product of the Week",
    reviews: [],
    createdAt: "2026-08-27T12:00:00.000Z"
  },
  {
    _id: "prod_4",
    title: "KubeScale CLI",
    tagline: "Lightweight terminal dashboard for Kubernetes cluster health",
    description: "KubeScale gives DevOps teams real-time cluster metrics, pod autoscaling indicators, and resource distribution directly in their terminal with zero external dependencies.",
    category: "Productivity",
    githubUrl: "https://github.com/buildboard/kubescale-cli",
    websiteUrl: "https://kubescale.io",
    author: {
      _id: "usr_104",
      name: "Elena Rostova",
      username: "elena_r",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    upvotes: ["usr_101", "usr_104"],
    isBestOfWeek: false,
    badgeText: null,
    reviews: [
      {
        _id: "rev_401",
        userId: "usr_103",
        userName: "Marcus Vance",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        comment: "Blazing fast TUI interface. ReplacedLens for daily quick diagnostics.",
        rating: 4,
        createdAt: "2026-09-01T16:20:00.000Z"
      }
    ],
    createdAt: "2026-08-29T15:30:00.000Z"
  },
  {
    _id: "prod_5",
    title: "Palettify Studio",
    tagline: "Accessible color palette generator tuned for modern UI design",
    description: "Generate WCAG AAA compliant color scales, CSS variables, and design token exports for dark and light modes with instant contrast ratio auditing.",
    category: "Design Tools",
    githubUrl: "https://github.com/buildboard/palettify-studio",
    websiteUrl: "https://palettify.design",
    author: {
      _id: "usr_103",
      name: "Marcus Vance",
      username: "mvance",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    upvotes: ["usr_101", "usr_102", "usr_103"],
    isBestOfWeek: false,
    badgeText: null,
    reviews: [],
    createdAt: "2026-08-30T09:00:00.000Z"
  }
];
