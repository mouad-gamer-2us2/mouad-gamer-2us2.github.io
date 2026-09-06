import { MapPin, GraduationCap, Target, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { SectionHeading } from "../components/UI";

export default function About() {
  return (
    <section id="a-propos" className="section container">
      <SectionHeading
        number="01"
        label="À PROPOS"
        title={
          <>
            La technique, avec
            <br />
            <span className="muted-title">une culture de la sécurité.</span>
          </>
        }
      />
      <div className="about-grid">
        <div className="about-copy">
          <p>{profile.bio}</p>
          <p>{profile.objective}</p>
          <div className="strengths">
            {profile.strengths.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <dl className="profile-facts">
          <div>
            <dt>
              <MapPin size={18} />
              Localisation
            </dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>
              <GraduationCap size={18} />
              Formation
            </dt>
            <dd>
              Cycle d’ingénieur · 2024–2027
              <span>FST Guéliz · Université Cadi Ayyad</span>
            </dd>
          </div>
          <div>
            <dt>
              <Target size={18} />
              Spécialisation
            </dt>
            <dd>Sécurité informatique</dd>
          </div>
        </dl>
      </div>
      <div className="languages">
        <span className="eyebrow">LANGUES</span>
        {profile.languages.map(([name, level]) => (
          <div key={name}>
            <strong>{name}</strong>
            <span>{level}</span>
          </div>
        ))}
      </div>
      <div className="events">
        <h3>
          Apprendre aussi sur le terrain
          <span className="muted"> / Événements</span>
        </h3>
        <div className="events-grid">
          {profile.events.map((event) => (
            <article key={event.title}>
              <div className="event-date">
                {event.date}
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>
              <h4>{event.title}</h4>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
