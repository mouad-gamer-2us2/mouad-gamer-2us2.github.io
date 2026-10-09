import { profile } from "./profile.js";

// Add local image paths and descriptive alt text when the photographs are ready.
export const journey = [
  {
    title: "Innovation Week",
    label: "2026 · CIP – UCA",
    text: profile.events[0].text,
    motif: "INNOVER",
    image: "images/innovation_week.jpeg",
    alt: "Mouad présente un projet au microphone pendant Innovation Week.",
  },
  {
    title: "GITEX Africa",
    label: "2025 & 2026 · Maroc",
    text: profile.events[1].text,
    motif: "EXPLORER",
    image: "images/gitex.jpeg",
    alt: "Mouad devant le panneau GITEX Africa Morocco 2025.",
  },
  {
    title: "Licence en génie informatique",
    label: "2023–2024 · FST de Settat",
    text: "Des fondamentaux scientifiques au génie informatique, une étape de mon parcours vers la sécurité informatique.",
    motif: "CONSTRUIRE",
    image: "images/license.jpeg",
    alt: "Mouad en tenue de remise de diplôme à l’occasion de sa licence.",
  },
  {
    title: "La sécurité, au cœur du parcours",
    label: "CODE · SYSTÈMES · CYBERSÉCURITÉ",
    text: profile.intro,
    motif: "PROTÉGER",
    image: "images/cyber-journey.png",
    alt: "Portrait créatif de Mouad avec un éclairage bleu et violet et son nom lumineux.",
  },
];

// Portraits supplied for the left and right sides of the animated section.
export const facets = {
  cyberImage: "images/photo_left.png",
  normalImage: "images/photo_right.png",
};
