import { Award, ArrowUpRight } from "lucide-react";
import { certifications } from "../data/profile";
import { SectionHeading, asset } from "../components/UI";
export default function Certifications() {
  return (
    <section id="certifications" className="section container">
      <SectionHeading
        number="06"
        label="CERTIFICATIONS"
        title="Apprendre. Mettre en pratique. Progresser."
        description="Des formations complémentaires à mon cursus d’ingénieur."
      />
      <div className="certifications-grid">
        {certifications.map((cert) => (
          <article className="certificate-card" key={cert.name}>
            <div className="certificate-icon">
              <Award size={26} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className="eyebrow">{cert.issuer}</p>
            <h3>{cert.name}</h3>
            <p className="certificate-date">{cert.date}</p>
            {cert.expiry && (
              <p className={cert.expired ? "expired" : "muted"}>
                {cert.expired ? "Expiré en " : "Expiration : "}
                {cert.expiry}
              </p>
            )}
            {cert.image && (
              <a
                href={asset(cert.image)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Voir le certificat ${cert.name} (nouvel onglet)`}
              >
                Voir le certificat
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
            {cert.verification && (
              <a
                href={cert.verification}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vérifier auprès de l’émetteur
                <ArrowUpRight size={17} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
