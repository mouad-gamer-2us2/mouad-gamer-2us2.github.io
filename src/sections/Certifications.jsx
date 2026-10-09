import { useT } from "../i18n/Language";
import { useEffect, useRef, useState } from "react";
import { Award, ArrowUpRight, X, Download } from "lucide-react";
import { certifications } from "../data/profile";
import { SectionHeading, asset } from "../components/UI";
export default function Certifications() {
  const t = useT();

  const [selected, setSelected] = useState(null);
  const trigger = useRef(null);
  function close() {
    setSelected(null);
    requestAnimationFrame(() => trigger.current?.focus());
  }
  return (
    <section id="certifications" className="section container">
      <SectionHeading
        number="06"
        label={t("CERTIFICATIONS")}
        title={t("Apprendre. Mettre en pratique. Progresser.")}
        description={t(
          "Des formations complémentaires à mon cursus d’ingénieur.",
        )}
      />
      <div className="certifications-grid">
        {certifications.map((cert) => (
          <article className="certificate-card" key={cert.name}>
            <div className="certificate-icon">
              <Award size={26} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className="eyebrow">{t(cert.issuer)}</p>
            <h3>{t(cert.name)}</h3>
            <p className="certificate-date">{t(cert.date)}</p>
            {cert.expiry && (
              <p className={cert.expired ? "expired" : "muted"}>
                {t(cert.expired ? "Expiré en " : "Expiration : ")}
                {t(cert.expiry)}
              </p>
            )}
            {cert.image && (
              <button
                type="button"
                className="certificate-open"
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setSelected(cert);
                }}
                aria-haspopup="dialog"
                aria-label={`${t("Voir le certificat")} — ${t(cert.name)}`}
              >
                {t("Voir le certificat")}
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            )}
            {cert.verification && (
              <a
                href={cert.verification}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Vérifier auprès de l’émetteur")}
                <ArrowUpRight size={17} />
              </a>
            )}
          </article>
        ))}
      </div>
      {selected && <CertificateDialog certificate={selected} onClose={close} />}
    </section>
  );
}

function CertificateDialog({ certificate, onClose }) {
  const t = useT();

  const dialog = useRef(null);
  const timer = useRef(null);
  const [closing, setClosing] = useState(false);
  function close() {
    if (closing) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
    timer.current = setTimeout(onClose, 180);
  }
  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer.current);
      document.body.style.overflow = overflow;
      element.close();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`certificate-dialog ${closing ? "closing" : ""}`}
      aria-labelledby="certificate-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            close();
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const items = [...dialog.current.querySelectorAll("button, a[href]")];
        const first = items[0],
          last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
    >
      <header>
        <div>
          <p className="eyebrow">{t(certificate.issuer)}</p>
          <h2 id="certificate-title">{t(certificate.name)}</h2>
        </div>
        <button
          type="button"
          autoFocus
          aria-label={t("Fermer le certificat")}
          onClick={close}
        >
          <X aria-hidden="true" />
        </button>
      </header>
      <img src={asset(certificate.image)} alt={t(certificate.name)} />
      <footer>
        <span>{t(certificate.date)}</span>
        <a href={asset(certificate.image)} download>
          <Download size={17} aria-hidden="true" />
          {t("Télécharger le certificat")}
        </a>
      </footer>
    </dialog>
  );
}
