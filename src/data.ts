import { Project, Pillar, Metric, Client } from './types';
import woodImg from './assets/images/regenerated_image_1784089704169.png';
import barkImg from './assets/images/regenerated_image_1784090037886.jpg';
import blackRisingImg from './assets/images/regenerated_image_1784090879838.png';

export const portfolioMetrics: Metric[] = [
  { value: "250+", label: "Happy customer" },
  { value: "600+", label: "Completed projects" },
  { value: "1.8K+", label: "Available Resources" },
  { value: "11K+", label: "Subscribers" }
];

export const philosophyPillars: Pillar[] = [
  {
    id: "identity-frameworks",
    num: "01",
    title: "Unified Identity Frameworks",
    description: "Every brochure layout, slide design, banner graphic, or vector asset must reflect the exact same premium corporate narrative. Consistency across spatial and digital channels is absolute design law."
  },
  {
    id: "kinetic-storytelling",
    num: "02",
    title: "Kinetic Storytelling",
    description: "By bridging static assets with dynamic layouts and micro-animations, we convert structured, heavy data and corporate metrics into deep, memorable brand narratives that capture modern client attention."
  },
  {
    id: "architectural-honesty",
    num: "03",
    title: "Tactile Typography & Negative Space",
    description: "We utilize extreme typographic contrasts paired with architectural grid structures. By reducing unnecessary background clutter, the message gains a heavy, undeniable presence."
  },
  {
    id: "strategic-insight",
    num: "04",
    title: "Cross-Disciplinary Art Direction",
    description: "Combining high-culture editorial design with performant digital architectures allows the brand experience to translate seamlessly from heavy matte-printed lookbooks to responsive digital portals."
  }
];

export const clientPartners: Client[] = [
  { name: "Verdi Group", sector: "Luxury & Heritage Artistry" },
  { name: "Synapse Corp", sector: "Decentralized AI Infrastructure" },
  { name: "Atlas Real Estate", sector: "Premium Architectural Venues" },
  { name: "Elysian Wellness", sector: "High-End Cosmetic Science" },
  { name: "Moderna Labs", sector: "Computational Pharmacology" },
  { name: "Vanguard Partners", sector: "Venture Capitals & Equity" },
  { name: "Nova Aerospace", sector: "Next-Gen Commercial Avionics" }
];

export const portfolioProjects: Project[] = [
  {
    id: "rekay-artist",
    category: "art-direction",
    title: "Rekay Artist Space",
    tagline: "An immersive digital showcase and visual identity designed for artist Rekay.",
    badge: "ART DIRECTION / MOTION",
    iconName: "music",
    description: "A tailored, high-culture visual platform created for Rekay, focusing on kinetic layouts, heavy typographic structure, and fluid media presentation.",
    challenge: "Developing a visual language that matches the raw aesthetic and pacing of modern musical and visual art.",
    solution: "Built a sleek, video-forward grid layout using high-contrast slate containers and custom typography.",
    deliverables: [
      "Core Visual Identity System",
      "Responsive Media Performance Grid",
      "Motion Direction & Video Framework",
      "Interactive Digital Showcase"
    ],
    metrics: [
      { label: "Visual Cohesion", value: "10/10" },
      { label: "Engagement Rate", value: "+210%" }
    ],
    client: "Rekay",
    year: "2026",
    videoUrl: "https://videotourl.com/videos/1783963763509-723428b6-5bf5-4c42-96f8-66cf44c0b291.mp4"
  },
  {
    id: "great-man-artist",
    category: "brand-identity",
    title: "Great Man Brand Identity",
    tagline: "A bold and cohesive physical-to-digital system crafted to project the sonic authority of Great Man.",
    badge: "BRAND SYSTEM / DIGITAL",
    iconName: "crown",
    description: "An uncompromising identity framework, custom presentation, and layout templates designed for artist Great Man, built on pure typographic contrast.",
    challenge: "Translating monumental performance energy and musical narratives into a fast, fluid digital medium.",
    solution: "Engineered high-contrast, minimalist interfaces emphasizing direct statements, tactile details, and raw video loops.",
    deliverables: [
      "Unified Brand Architecture",
      "Responsive Portfolio Showcase",
      "Editorial Asset Guidelines",
      "Social Presentation Motion Kit"
    ],
    metrics: [
      { label: "Design Fidelity", value: "99.8%" },
      { label: "Audience Reach", value: "+340%" }
    ],
    client: "Great Man",
    year: "2026",
    videoUrl: "https://videotourl.com/videos/1783964057494-e8343be1-7397-4677-8c83-3e4f2add61dd.mp4"
  },
  {
    id: "wood-ecommerce",
    category: "brand-identity",
    title: "Wood E-Commerce",
    tagline: "A premium, eco-conscious digital experience bringing the warmth of natural living into modern spaces.",
    badge: "UI/UX / SUSTAINABLE BRANDING",
    iconName: "leaf",
    description: "Wood is a premium, eco-conscious e-commerce landing page designed to bring the warmth of natural living into modern spaces. The design prioritizes organic aesthetics, seamless navigation, and a strong emphasis on sustainability to cultivate trust and drive high-intent purchases.",
    challenge: "Creating a digital environment that conveys the physical warmth and high craftsmanship of sustainable furniture while maintaining frictionless, conversion-focused user patterns.",
    solution: "Synthesized a soothing earthy color palette led by desaturated sage green, warm off-white tones, and elegant humanist typography, integrated with organic wood-grain background details and editorial product showcases.",
    deliverables: [
      "E-commerce Interface Architecture",
      "Earthy Visual System & Grid Guidelines",
      "Organic Accent & Graphic Asset Library",
      "Trust-Driven Checkout Flow Patterns"
    ],
    metrics: [
      { label: "Sustainable Trust", value: "+180%" },
      { label: "Purchase Intent", value: "4.8/5" }
    ],
    client: "Wood Furniture",
    year: "2026",
    imageUrl: woodImg
  },
  {
    id: "bark-ecommerce",
    category: "brand-identity",
    title: "Bark E-Commerce",
    tagline: "A vibrant, conversion-focused e-commerce web application designed to simplify the shopping experience for pet parents.",
    badge: "PRODUCT DESIGN / CRO",
    iconName: "shopping-bag",
    description: "Bark is a vibrant, modern, and conversion-focused e-commerce web application designed to simplify the shopping experience for pet parents. The platform combines bright, engaging visuals with high-performance UX patterns—such as quick-view modals and clear social proof—to maximize sales velocity and reduce cart abandonment.",
    challenge: "Maximizing purchase conversion velocity while maintaining a joyful, emotionally resonant shopping experience for pet owners.",
    solution: "Engineered a high-performance visual system utilizing a joyful honey-yellow primary accent, high-contrast typography, countdown scarcity banners, quick-view slide-over product detail drawers, and social sign-in utilities.",
    deliverables: [
      "End-to-End E-commerce UX Framework",
      "Joyful Honey-Yellow Visual Identity System",
      "Product Catalog & Quick-View Interaction Models",
      "Frictionless Authentication & Checkout Flow Patterns"
    ],
    metrics: [
      { label: "Conversion Rate (CRO)", value: "+32%" },
      { label: "Cart Abandonment", value: "-25%" }
    ],
    client: "Bark Co.",
    year: "2026",
    imageUrl: barkImg
  },
  {
    id: "black-rising",
    category: "digital-experience",
    title: "Black Rising Platform",
    tagline: "A compelling, high-conversion web platform designed to empower Black youth with access to education, careers, and mentorship.",
    badge: "UI/UX / NON-PROFIT BRANDING",
    iconName: "graduation-cap",
    description: "The goal of this project was to design a compelling, high-conversion landing page for Black Rising, an organization dedicated to 'Empowering Black Excellence'. The platform needed to clearly communicate their mission of providing Black youth, especially Nigerians, with access to education, careers, and mentorship. The design had to build immediate trust, showcase measurable impact, and seamlessly guide users toward getting involved as students, mentors, or donors.",
    challenge: "Communicating a strong cultural mission and large-scale educational impact to potential students, mentors, and donors while maintaining frictionless user pathways.",
    solution: "Designed a deep, premium dark mode layout paired with strategic, high-contrast orange CTA accents, African geometric pattern graphics, and a clear impact statistics grid.",
    deliverables: [
      "Impact-Driven Landing Page Design",
      "Culturally Resonant Visual Identity System",
      "Bento-Style Core Offerings Navigation",
      "Frictionless Involvement Flow Architecture"
    ],
    metrics: [
      { label: "Scholarships Awarded", value: "N50M+" },
      { label: "Students Supported", value: "500+" }
    ],
    client: "Black Rising",
    year: "2026",
    imageUrl: blackRisingImg
  }
];
