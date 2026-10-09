import { useT } from "../i18n/Language";
import { MapPin, GraduationCap, Target, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { SectionHeading } from "../components/UI";

export default function About() {
  const t = useT();

  return (
    <section id="a-propos" className="section container">
      <SectionHeading
        number="01"
        label={t("À PROPOS")}
        title={
          <>
            {t("La technique, avec")}
            <br />
            <span className="muted-title">
              {t("une culture de la sécurité.")}
            </span>
          </>
        }
      />
      <div className="about-grid">
        <div className="about-copy">
          <p>{t(profile.bio)}</p>
          <p>{t(profile.objective)}</p>
          <div className="strengths">
            {profile.strengths.map((item) => (
              <span key={item}>{t(item)}</span>
            ))}
          </div>
        </div>
        <dl className="profile-facts">
          <div>
            <dt>
              <MapPin size={18} />
              {t("Localisation")}
            </dt>
            <dd>{t(profile.location)}</dd>
          </div>
          <div>
            <dt>
              <GraduationCap size={18} />
              {t("Formation")}
            </dt>
            <dd>
              {t("Cycle d’ingénieur · 2024–2027")}
              <span>{t("FST Guéliz · Université Cadi Ayyad")}</span>
            </dd>
          </div>
          <div>
            <dt>
              <Target size={18} />
              {t("Spécialisation")}
            </dt>
            <dd>{t("Sécurité informatique")}</dd>
          </div>
        </dl>
      </div>
      <div className="languages">
        <span className="eyebrow">{t("LANGUES")}</span>
        {profile.languages.map(([name, level]) => (
          <div key={name}>
            <strong>{t(name)}</strong>
            <span>{t(level)}</span>
          </div>
        ))}
      </div>
      <div className="events">
        <h3>
          {t("Apprendre aussi sur le terrain")}
          <span className="muted">{t(" / Événements")}</span>
        </h3>
        <div className="events-grid">
          {profile.events.map((event) => (
            <article key={event.title}>
              <div className="event-date">
                {t(event.date)}
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>
              <h4>{t(event.title)}</h4>
              <p>{t(event.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
