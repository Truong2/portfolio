/**
 * Single static data source for the whole portfolio, extracted from
 * CV_Frontend_Nguyen_Van_Truong.pdf. English-only for the first build (Q3),
 * but every string lives here (not scattered in JSX) so switching to a real
 * i18n setup (e.g. next-intl) later only means swapping this module's shape,
 * not touching components.
 */

export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location?: string;
  period: string;
  summary?: string;
  projects: Project[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  period: string;
  detail?: string;
}

export const personalInfo = {
  name: "Nguyen Van Truong",
  title: "Frontend Developer",
  email: "truong8dt@gmail.com",
  phone: "+84 978 803 231",
  location: "Dong Da, Hanoi, Vietnam",
  linkedin: "https://www.linkedin.com/in/truong-nguyen-443225148/",
  resumeUrl: "/cv-nguyen-van-truong.pdf",
} as const;

export const summary =
  "Frontend Developer with 3+ years of experience building enterprise web applications across banking, e-commerce, healthcare, transportation, GIS/map-based systems, and Web3 domains. Strong experience with React, Next.js, Vue, Nuxt, and TypeScript — setting up frontend architecture, developing complex business workflows, integrating REST APIs, building reusable UI components, migrating legacy systems, and supporting code reviews. Experienced in collaborating closely with backend, QA, and client teams to clarify requirements, resolve integration issues, and deliver stable, maintainable frontend solutions with a strong focus on user experience.";

/**
 * Ordered categories exactly as grouped in the CV. Reused directly by
 * hero-3d-scene (rotating tech-cards, per Q1) and skills-section.
 */
export const skillCategories: SkillCategory[] = [
  { id: "languages", label: "Languages", skills: ["TypeScript", "JavaScript"] },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Vue 3",
      "Nuxt 3",
      "Ant Design",
      "Vuetify 3",
      "Tailwind CSS",
      "styled-components",
    ],
  },
  {
    id: "state-data",
    label: "State Management & Data Fetching",
    skills: ["React Query", "Zustand", "Redux", "Redux Toolkit"],
  },
  { id: "forms", label: "Forms & Validation", skills: ["React Hook Form", "Zod"] },
  {
    id: "api-realtime",
    label: "API & Real-time",
    skills: ["Axios", "REST API", "Socket.IO", "WebRTC"],
  },
  {
    id: "visualization",
    label: "Visualization & Maps",
    skills: ["Recharts", "OpenLayers"],
  },
  { id: "web3", label: "Web3", skills: ["wagmi", "WaaS SDK", "Polygon"] },
  { id: "tools", label: "Tools", skills: ["Git", "Jira", "Fork", "Storybook", "i18n"] },
  {
    id: "backend-basics",
    label: "Backend Basics",
    skills: ["Node.js", "Express.js", "MySQL"],
  },
];

/** Flattened, deduplicated tech list — full breakdown, used by skills-section. */
export const heroTechStack: string[] = Array.from(
  new Set(skillCategories.flatMap((c) => c.skills)),
);

/**
 * Curated subset (not the full ~30-item heroTechStack) for the hero's
 * rotating 3D tech-cards (Q1 = option C). A dozen cards keeps the scene
 * legible and performant; the full breakdown belongs in skills-section.
 */
export const heroHighlightTech: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Vue 3",
  "Nuxt 3",
  "Zustand",
  "React Query",
  "Tailwind CSS",
  "wagmi",
  "Socket.IO",
  "OpenLayers",
  "Node.js",
];

export const experience: ExperienceEntry[] = [
  {
    id: "ekotek",
    company: "EKOTEK Technology JSC",
    role: "Frontend Developer",
    location: "Hanoi, Vietnam",
    period: "Dec 2024 - Present",
    projects: [
      {
        name: "AML (Anti-Money-Laundering) BackOffice",
        description:
          "Banking environment (Japan). Frontend modules for customer management, screening, risk assessment, transaction monitoring, and AI scoring workflows, built with a modular Nuxt Layers architecture.",
        techStack: ["Nuxt 3", "Vue 3", "TypeScript", "Vuetify 3"],
        highlights: [
          "Integrated domain-based REST API clients with form validation, loading/error states, and URL-synced search criteria",
          "Worked closely with backend teams to align API behavior and ensure stable auth, configuration, and logging flows",
        ],
      },
      {
        name: "HRM System Upgrade (Nuxt 2 to Nuxt 3)",
        description:
          "Banking environment (Japan). Migrated the HRM system from Nuxt 2 to Nuxt 3, refactoring to Vue 3 Composition API.",
        techStack: ["Nuxt 3", "Vue 3 (Composition API)", "TypeScript", "Vuetify 3"],
        highlights: [
          "Designed the frontend architecture and set up the base project on Nuxt 3 & Vuetify 3",
          "Standardized routing, layouts, plugins, theming, and TypeScript configuration",
        ],
      },
      {
        name: "Taxi Admin Platform",
        description:
          "Web admin system for a taxi/ride-hailing platform serving the Japanese B2B market — managing users, drivers, bookings, trip status, and daily dispatch.",
        techStack: [
          "React",
          "TypeScript",
          "React Query",
          "React Hook Form",
          "Zod",
          "Ant Design",
          "i18n",
          "Axios",
          "Socket.IO",
        ],
        highlights: [
          "FE Lead — owned the frontend architecture and base source code",
          "Built core User, Driver, and Booking modules with complex business workflows",
          "Reviewed code and mentored frontend team members",
        ],
      },
      {
        name: "SANO - Health Data Management & Analytics Platform",
        description:
          "Web platform aggregating and visualizing Garmin wearable data — health dashboards for end users and admin tooling for configuring metrics, insights, and wellness programs.",
        techStack: [
          "Next.js",
          "React",
          "TypeScript",
          "Zustand",
          "React Query",
          "Tailwind CSS",
          "Ant Design",
          "Axios",
          "i18n",
          "Recharts",
        ],
        highlights: [
          "FE Lead — built the foundational frontend source code as the base for the team",
          "Implemented UI from Figma designs, collaborating closely with backend teams",
        ],
      },
      {
        name: "METAME - Wallet as a Service (WaaS) Integration",
        description:
          "Integrated a WaaS SDK for secure, password-based internal wallet access without exposing private keys at the application layer.",
        techStack: ["Next.js", "React 18", "TypeScript", "wagmi", "WaaS SDK", "Polygon", "Socket.IO"],
        highlights: [
          "Implemented password-based wallet onboarding and authentication supporting NFT and token transfers",
          "Built core trading flows (buy/sell/list/transfer NFTs) with real-time transaction tracking",
        ],
      },
      {
        name: "EC Platform - Digital Audio E-Commerce",
        description:
          "Admin portal and user-facing e-commerce platform for digital audio content targeting the Japanese market.",
        techStack: [
          "React",
          "Next.js",
          "TypeScript",
          "Ant Design",
          "React Query",
          "Zustand",
          "Redux Toolkit",
          "Stripe",
          "Socket.IO",
        ],
        highlights: [
          "Implemented content, user, transaction, and notification management with role-based access control",
          "Built shopping cart, Stripe checkout, audio streaming, and secure downloads",
          "Supported multilingual (JP/EN), responsive UI, optimized SEO with SSR",
        ],
      },
    ],
  },
  {
    id: "freelancer",
    company: "Freelancer",
    role: "Frontend Developer",
    location: "Hanoi, Vietnam",
    period: "Team of 3 (2 FE, 1 BE)",
    projects: [
      {
        name: "AVT WEB SERVER - Military Object Management on the Map",
        description:
          "Map-based object management system for spatial data monitoring, tracking, and reporting.",
        techStack: ["GIS", "OpenLayers"],
        highlights: [
          "Designed and optimized visualization for objects, areas, and movement history based on GIS data",
          "Implemented a layer management mechanism for flexible, efficient map layer toggling",
          "Optimized map rendering performance and real-time interactions",
        ],
      },
      {
        name: "MARINER25 - Maritime Surveillance & Intelligence System",
        description:
          "Map-based maritime monitoring system supporting real-time vessel tracking and spatial data analysis.",
        techStack: ["Next.js", "TypeScript", "Ant Design", "React Query", "Tailwind CSS", "Zustand", "OpenLayers"],
        highlights: [
          "Integrated and visualized multi-source maritime data (AIS, radar, satellite, GSM, satphone) with historical tracking",
          "Implemented rule-based detection and real-time alerts for operational decision-making",
          "Optimized frontend rendering to handle datasets of up to 1M records",
        ],
      },
    ],
  },
  {
    id: "vnpt-technology",
    company: "VNPT Technology",
    role: "Software Engineer",
    location: "Hanoi, Vietnam",
    period: "Aug 2022 - Aug 2024",
    projects: [
      {
        name: "DX Modules / OneSME / BOS / OneDX Workplace",
        description:
          "Core frontend modules for CRM systems, enterprise management platforms, and digital workplace solutions serving a large-scale user base.",
        techStack: [
          "React",
          "Next.js",
          "TypeScript",
          "Ant Design",
          "React Query",
          "Redux",
          "Tailwind CSS",
          "styled-components",
          "Storybook",
          "CraftJS",
          "i18n",
        ],
        highlights: [
          "Built UI based on a design system, ensuring consistency, scalability, and long-term maintainability",
          "Collaborated with backend engineers to analyze requirements, resolve defects, and enhance features",
        ],
      },
      {
        name: "UI Component Library - @onesme/dxui",
        description:
          "Shared UI component library used across multiple internal products.",
        techStack: ["React", "Storybook", "TypeScript"],
        highlights: [
          "Authored usage documentation and guidelines to support effective adoption by product teams",
          "Ensured UI consistency and reusability, reducing development time",
        ],
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: "hust",
    school: "Hanoi University of Science and Technology",
    degree: "Engineer",
    field: "Electronics and Telecommunication",
    period: "2019 - 2024",
    detail: "3.28/4.0 CPA",
  },
];

export const interests = ["Gaming", "Music", "Soccer", "Singing"] as const;
