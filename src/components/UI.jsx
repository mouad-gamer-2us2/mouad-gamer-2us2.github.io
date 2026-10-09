import { useT } from "../i18n/Language";
import {
  ArrowUpRight,
  Download,
  GitFork,
  BriefcaseBusiness,
  Mail,
  ShieldCheck,
  Network,
  Terminal,
  Code2,
  Database,
  Wrench,
} from "lucide-react";
import { profile } from "../data/profile";

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const iconMap = {
  shield: ShieldCheck,
  network: Network,
  terminal: Terminal,
  code: Code2,
  database: Database,
  wrench: Wrench,
};

export function Tags({ items }) {
  const t = useT();

  return (
    <ul className="tags" aria-label={t("Technologies et compétences")}>
      {items.map((item) => (
        <li key={item}>{t(item)}</li>
      ))}
    </ul>
  );
}

export function SectionHeading({ number, label, title, description }) {
  const t = useT();

  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{t(number)}</span>
        {" / "}
        {t(label)}
      </div>
      <h2>{t(title)}</h2>
      {description && <p>{t(description)}</p>}
    </div>
  );
}

export function CvLink({ className = "button secondary", short = false }) {
  const t = useT();

  return (
    <a
      className={className}
      href={asset(profile.cv)}
      download="Mouad-Jaalouti-CV.pdf"
    >
      <Download size={17} aria-hidden="true" />
      {t(short ? "Mon CV" : "Télécharger mon CV")}
    </a>
  );
}

export function SocialLinks({ className = "" }) {
  const t = useT();

  return (
    <div className={`social-links ${className}`}>
      {profile.github && (
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          <GitFork size={18} aria-hidden="true" />
          {t("GitHub")}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        <BriefcaseBusiness size={18} aria-hidden="true" />
        {t("LinkedIn")}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
      <a href={`mailto:${profile.email}`}>
        <Mail size={18} aria-hidden="true" />
        {t("Email")}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}
