import { experiences } from "./profile.js";

// Source : CV, pages 1 et 2. Aucun résultat ou lien non attesté n’est ajouté.
const academicProjects = [
  {
    id: "infrastructure",
    title: "Sécurisation d’une infrastructure réseau",
    category: "Cybersécurité",
    date: "Mai 2026",
    featured: true,
    visual: "network",
    summary:
      "Pare-feu, VPN et détection d’intrusions : une approche concrète de la défense réseau.",
    objective:
      "Sécuriser une infrastructure réseau et étudier ses mécanismes de protection.",
    actions: [
      "Configuration de pfSense et OpenVPN avec autorité de certification et certificats.",
      "Durcissement Linux : SSH, PAM, Fail2Ban, Sysctl et GRUB.",
      "Suricata IDS/IPS ; scans Nmap (SYN, OS, XMAS) et tests de force brute SSH.",
    ],
    stack: ["pfSense", "Suricata", "OpenVPN", "Kali", "Fail2Ban", "Nmap"],
  },
  {
    id: "soutenances",
    title: "Gestion des soutenances",
    category: "Développement",
    date: "2026",
    visual: "workflow",
    summary:
      "Du dépôt à la planification : une plateforme pour organiser les soutenances.",
    objective:
      "Gérer le dépôt, la validation, l’affectation et la planification des soutenances.",
    actions: [
      "Plateforme complète de gestion des soutenances.",
      "Module Admin/DevOps : authentification JWT, stratégie Git et Merge Requests.",
      "Pipeline CI/CD GitLab Runner et API REST Spring Boot 3.",
    ],
    stack: [
      "Spring Boot 3",
      "Java 17",
      "JWT",
      "React",
      "Tailwind",
      "MySQL",
      "GitLab CI/CD",
    ],
  },
  {
    id: "uniscan",
    title: "UniScan",
    subtitle: "Gestion des présences aux examens",
    category: "Développement",
    date: "2026",
    visual: "scan",
    summary: "Un suivi des présences par QR code, sur mobile et sur le web.",
    objective:
      "Gérer les présences aux examens à partir des QR codes des cartes étudiantes.",
    actions: [
      "Application mobile Flutter et tableau de bord web en temps réel.",
      "Mode hors ligne et export automatique des procès-verbaux.",
      "Organisation du projet selon la méthodologie Scrum.",
    ],
    stack: [
      "Flutter",
      "Spring Boot",
      "PostgreSQL",
      "QR Code",
      "API REST",
      "Scrum",
    ],
  },
  {
    id: "schnorr",
    title: "Preuve Zero-Knowledge",
    subtitle: "Protocole de Schnorr",
    category: "Cybersécurité",
    date: "2026",
    visual: "crypto",
    summary:
      "Explorer l’authentification cryptographique et les attaques par rejeu.",
    objective: "Implémenter et analyser le protocole de Schnorr.",
    actions: [
      "Implémentation Python : engagement, défi, réponse et vérification.",
      "Simulation d’une attaque par rejeu et analyse des mécanismes de sécurité.",
    ],
    stack: [
      "Python",
      "Schnorr",
      "Zero-Knowledge",
      "Cryptographie",
      "Authentification",
    ],
  },
  {
    id: "automobile",
    github: "https://github.com/mouad-gamer-2us2/CarDealerShip",
    title: "Gestion automobile",
    category: "Développement",
    date: "Mai 2025",
    visual: "car",
    summary: "Une application Laravel pour gérer et rechercher des véhicules.",
    objective:
      "Développer une plateforme de gestion automobile suivant l’architecture MVC.",
    actions: [
      "Authentification, rôles et opérations CRUD sur les véhicules.",
      "Recherche, pagination, Eloquent ORM et clés étrangères.",
      "Interactions AJAX et interface responsive.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Eloquent", "AJAX", "Bootstrap"],
  },
  {
    id: "medical",
    title: "Medical Assistant",
    category: "Développement",
    date: "2026",
    visual: "medical",
    summary:
      "Une application web et mobile autour de l’information médicale et de l’IA.",
    objective:
      "Rendre l’information médicale accessible via l’analyse de symptômes par IA.",
    actions: [
      "Application web et mobile organisée selon Scrum.",
      "Product Backlog et Sprint Backlog ; prise en compte de la confidentialité des données.",
    ],
    stack: ["IA", "Web", "Mobile", "Scrum", "UX"],
  },
  {
    id: "samba",
    title: "Configuration Samba sur CentOS 8",
    category: "Systèmes & réseaux",
    date: "Mars 2024",
    visual: "server",
    summary:
      "Des partages publics et privés, avec une gestion fine des permissions.",
    objective: "Configurer les partages et les accès d’un serveur Samba.",
    actions: [
      "Utilisateurs, groupes, partages publics et privés ; permissions chmod/chown.",
      "Configuration SELinux (semanage, restorecon) et firewalld (ports 137–445).",
      "Tests depuis Windows 11.",
    ],
    stack: ["CentOS 8", "Samba", "SELinux", "firewalld", "Windows 11"],
  },
];

// Un projet par stage : les missions, dates et technologies restent centralisées.
const internshipProjects = [
  {
    id: "bmci-stage",
    organization: "BMCI · Groupe BNP Paribas",
    title: "Infrastructure sécurisée, SOC et automatisation",
    category: "Cybersécurité",
    visual: "securityOps",
    summary:
      "Segmentation réseau, gestion des identités, automatisation et supervision de sécurité au cours d’un stage transversal.",
    objective:
      "Mettre en pratique la sécurité des infrastructures, l’automatisation et la supervision.",
  },
  {
    id: "tool-stage",
    organization: "TOOL Consulting",
    title: "Site vitrine de TOOL Consulting",
    category: "Développement",
    visual: "website",
    summary:
      "Un site WordPress responsive pour présenter les services de l’entreprise et faciliter la prise de contact.",
    objective:
      "Développer le site officiel et soigner son architecture, son interface et l’expérience utilisateur.",
  },
  {
    id: "onee-stage",
    organization: "ONEE · Branche Électricité",
    title: "Gestion des réclamations et des rendez-vous",
    category: "Développement",
    visual: "requests",
    summary:
      "Une plateforme Laravel avec gestion des rôles, suivi des demandes, messagerie et tableaux de bord.",
    objective:
      "Gérer les réclamations et les rendez-vous avec trois profils utilisateurs et un suivi des demandes.",
  },
].map((project) => {
  const experience = experiences.find(
    (item) => item.organization === project.organization,
  );
  return {
    ...project,
    origin: "stage",
    date: experience.date,
    location: experience.location,
    actions: experience.bullets,
    stack: experience.tags,
    github: experience.link || null,
  };
});

export const projects = [
  academicProjects[0],
  ...internshipProjects,
  ...academicProjects.slice(1),
].map((project) => ({
  result: null,
  image: null,
  github: null,
  demo: null,
  report: null,
  ...project,
}));
