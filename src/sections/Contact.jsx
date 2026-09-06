import { ArrowUpRight, MapPin, Mail, ArrowUp } from "lucide-react";
import { profile } from "../data/profile";
import { CvLink, SocialLinks } from "../components/UI";
export default function Contact() {
  return (
    <>
      <section id="contact" className="section container">
        <div className="contact-panel">
          <div className="eyebrow">
            <span>07</span> / CONTACT
          </div>
          <div className="contact-grid">
            <div>
              <h2>
                Et si l’on
                <br />
                <span>échangeait ?</span>
                <ArrowUpRight className="contact-arrow" aria-hidden="true" />
              </h2>
              <p>{profile.objective}</p>
              <div className="location">
                <MapPin size={15} />
                {profile.location}
              </div>
            </div>
            <div className="contact-actions">
              <span className="eyebrow">
                UNE OPPORTUNITÉ, UN PROJET, UNE QUESTION
              </span>
              <a className="email-link" href={`mailto:${profile.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span>{profile.email}</span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
              <p className="mail-note">
                Écrivez-moi directement depuis votre messagerie.
              </p>
              <SocialLinks />
              <CvLink />
            </div>
          </div>
        </div>
      </section>
      <footer className="footer container">
        <a className="footer-name" href="#accueil">
          {profile.name}
          <span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} · Conçu avec soin, développé avec React.
        </p>
        <a href="#accueil" className="back-top">
          Retour en haut
          <ArrowUp size={16} />
        </a>
      </footer>
    </>
  );
}
