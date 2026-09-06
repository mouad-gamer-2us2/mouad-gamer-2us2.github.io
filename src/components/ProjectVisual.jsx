import {
  ShieldCheck,
  Server,
  Laptop,
  LockKeyhole,
  QrCode,
  ScanLine,
  GitMerge,
  FileCheck2,
  CalendarCheck,
  CarFront,
  HeartPulse,
  Fingerprint,
  ArrowRight,
} from "lucide-react";
const visualSets = {
  network: {
    icons: [Laptop, ShieldCheck, Server],
    labels: ["VPN", "PARE-FEU", "RÉSEAU"],
    caption: "DEFENSE IN DEPTH",
    code: "01",
  },
  workflow: {
    icons: [FileCheck2, GitMerge, CalendarCheck],
    labels: ["DÉPÔT", "VALIDATION", "PLANNING"],
    caption: "DU DÉPÔT À LA SOUTENANCE",
    code: "02",
  },
  scan: {
    icons: [QrCode, ScanLine, FileCheck2],
    labels: ["CARTE", "SCAN", "PRÉSENCE"],
    caption: "UNISCAN / EXAMENS",
    code: "03",
  },
  crypto: {
    icons: [Fingerprint, LockKeyhole, ShieldCheck],
    labels: ["ENGAGEMENT", "DÉFI", "VÉRIFICATION"],
    caption: "SCHNORR / ZERO-KNOWLEDGE",
    code: "04",
  },
  car: {
    icons: [CarFront, Server, FileCheck2],
    labels: ["VÉHICULES", "DONNÉES", "GESTION"],
    caption: "LARAVEL / MVC",
    code: "05",
  },
  medical: {
    icons: [HeartPulse, Laptop, LockKeyhole],
    labels: ["SYMPTÔMES", "INFORMATION", "CONFIDENTIALITÉ"],
    caption: "MEDICAL ASSISTANT",
    code: "06",
  },
  server: {
    icons: [Laptop, Server, LockKeyhole],
    labels: ["CLIENT", "SAMBA", "PERMISSIONS"],
    caption: "CENTOS / PARTAGES",
    code: "07",
  },
};
export default function ProjectVisual({ type }) {
  const visual = visualSets[type];
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-top">
        <span>
          <i />
          {visual.caption}
        </span>
        <span>/{visual.code}</span>
      </div>
      <div className="visual-nodes">
        {visual.icons.map((Icon, i) => (
          <div className="node-wrap" key={i}>
            <div className="diagram-node">
              <Icon size={i === 1 ? 32 : 25} strokeWidth={1.4} />
              <span>{visual.labels[i]}</span>
            </div>
            {i < 2 && (
              <ArrowRight
                className="node-connector"
                size={18}
                strokeWidth={1}
              />
            )}
          </div>
        ))}
      </div>
      <div className="visual-footer">
        <span>ILLUSTRATION DU PROJET</span>
        <span>＋</span>
      </div>
    </div>
  );
}
