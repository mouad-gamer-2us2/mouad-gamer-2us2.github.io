import { useT } from "../i18n/Language";
import { ArrowUpRight, MapPin, Mail, ArrowUp } from "lucide-react";
import { profile } from "../data/profile";
import { CvLink, SocialLinks } from "../components/UI";
export default function Contact() {
  const t = useT();

  return (
    <>
      <section id="contact" className="section container">
        <div className="contact-panel">
          <div className="eyebrow">
            <span>{"07"}</span>
            {t(" / CONTACT")}
          </div>
          <div className="contact-grid">
            <div>
              <h2>
                {t("Et si l’on")}
                <br />
                <span>{t("échangeait ?")}</span>
                <ArrowUpRight className="contact-arrow" aria-hidden="true" />
              </h2>
              <p>{t(profile.objective)}</p>
              <div className="location">
                <MapPin size={15} />
                {t(profile.location)}
              </div>
            </div>
            <div className="contact-actions">
              <span className="eyebrow">
                {t("UNE OPPORTUNITÉ, UN PROJET, UNE QUESTION")}
              </span>
              <a className="email-link" href={`mailto:${profile.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span>{t(profile.email)}</span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
              <p className="mail-note">
                {t("Écrivez-moi directement depuis votre messagerie.")}
              </p>
              <SocialLinks />
              <CvLink />
            </div>
          </div>
        </div>
      </section>
      <footer className="footer container">
        <a className="footer-name" href="#accueil">
          {t(profile.name)}
          <span>{"."}</span>
        </a>
        <p>
          {"© "}
          {t(new Date().getFullYear())}
          {t(" · Conçu avec soin, développé avec React.")}
        </p>
        <a href="#accueil" className="back-top">
          {t("Retour en haut")}
          <ArrowUp size={16} />
        </a>
      </footer>
    </>
  );
}
