export interface TrophyItem {
  id: string;
  index: number;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  materials: string;
  description: string;
}

export const ARCHIVE_PROJECTS: TrophyItem[] = [
  {
    id: 'rally-coimbatore-2022',
    index: 1,
    title: 'Rally of Coimbatore Gopuram Trophy',
    client: 'CASC / FMSCI Indian National Rally Championship',
    category: 'Motorsport / Rally',
    year: '2022',
    image: '/trophy1.png',
    materials: 'Anodized Brass, Multi-Layered Acrylic, Solid Metal Base',
    description: 'Inspired by South Indian temple architecture (Gopuram), combining heritage silhouette with precision rally geometry for Round 1 winner of the Indian National Rally Championship.',
  },
  {
    id: 'inrc-red-pillar-2023',
    index: 2,
    title: 'INRC Crimson Performance Monolith',
    client: 'Blueband Sports / FMSCI INRC',
    category: 'Motorsport Championship',
    year: '2023',
    image: '/trophy2.png',
    materials: 'Matte Black Anodized Aluminium, Crimson Internal Illumination, Engraved Graphics',
    description: 'A striking architectural column featuring internal crimson illumination and high-density automotive graphics celebrating speed, endurance, and rally precision.',
  },
  {
    id: 'twisted-gold-star-2024',
    index: 3,
    title: 'The Apex Twisted Star Sculpture',
    client: 'Global Achievement Awards',
    category: 'Corporate & Excellence',
    year: '2024',
    image: '/trophy3.png',
    materials: 'Polished 24k Gold Electroplated Bronze, Nero Marquina Black Marble Base',
    description: 'A continuous ribbon of sculpted gold that twists 180 degrees into a five-pointed star symbolising ascension, fluid motion, and extraordinary leadership.',
  },
  {
    id: 'sports-mirror-gold-2024',
    index: 4,
    title: 'Embaixadores Do Rei Victory Shield',
    client: 'Embaixadores Do Rei Championship',
    category: 'Sports & Athletics',
    year: '2024',
    image: '/trophy4.png',
    materials: 'Mirror Gold Acrylic, High-Gloss Composite Base, Laser-Engraved Crest',
    description: 'Capturing the dynamic energy of victory with a gold mirror acrylic athletic silhouette soaring inside a circular emblem mounted on an obsidian pedestal.',
  },
];

export interface BrandPartner {
  name: string;
  label: string;
}

export const BRAND_PARTNERS: BrandPartner[] = [
  { name: 'INRC RALLY', label: 'Indian National Rally Championship' },
  { name: 'FMSCI', label: 'Federation of Motor Sports Clubs of India' },
  { name: 'BLUEBAND SPORTS', label: 'Official Promoter — INRC' },
  { name: 'CASC COIMBATORE', label: 'Coimbatore Auto Sports Club' },
  { name: 'MMSC CHENNAI', label: 'Madras Motor Sports Club' },
  { name: 'GODSPEED RACING', label: 'Motorsport & Event Organizers' },
];

export interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  labels: [string, string];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'research',
    title: 'Research Based Approach',
    subtitle: 'Your unique needs are considered and followed by extensive research to deliver.',
    body: 'As a team we understand how crucial it is to empathize with the client on their needs. Our aim is to solve your problem typically through well researched options. We strive to set aside our assumptions and gain real insight into your needs as a client.',
    labels: ['Discovery', 'Insight'],
  },
  {
    id: 'ideate',
    title: 'Define / Ideate',
    subtitle: 'Challenge Assumptions and Create Ideas',
    body: 'Once the first step is done, we are equipped with background and knowledge need to begin. Now is when we think "outside the box", look for alternative ways to solve the problem and identify innovative solutions to arrive at the perfect end result.',
    labels: ['Concept', 'Form'],
  },
  {
    id: 'prototype',
    title: 'Prototype',
    subtitle: 'First look / Impression of The Design',
    body: 'This is an experimental phase. The aim is to identify the best possible solution for your desired product. Our team will produce some inexpensive, scaled-down versions of the product (or specific features found within the product) to investigate the ideas we’ve generated.',
    labels: ['Make', 'Test'],
  },
];
