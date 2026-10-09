import { useT } from "../i18n/Language";
import { MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading, Tags } from "../components/UI";

export default function Timeline({
  id,
  number,
  label,
  title,
  description,
  items,
}) {
  const t = useT();

  return (
    <section id={id} className="section container">
      <SectionHeading
        number={number}
        label={t(label)}
        title={t(title)}
        description={t(description)}
      />
      <ol className="timeline">
        {items.map((item) => (
          <li
            className="timeline-item"
            key={`${item.title}-${item.organization}`}
          >
            <div className="timeline-date">
              <span>{t(item.date)}</span>
              {item.current && (
                <span className="small-badge">{t("En cours")}</span>
              )}
            </div>
            <article className="timeline-content">
              <p className="organization">{t(item.organization)}</p>
              <h3>{t(item.title)}</h3>
              {item.location && (
                <p className="location">
                  <MapPin size={13} aria-hidden="true" />
                  {t(item.location)}
                </p>
              )}
              {item.description && <p>{t(item.description)}</p>}
              {item.bullets && (
                <ul className="experience-bullets">
                  {item.bullets.map((text) => (
                    <li key={text}>{t(text)}</li>
                  ))}
                </ul>
              )}
              <Tags items={item.tags} />
              {item.link && (
                <a
                  className="timeline-link"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Consulter le code du projet")}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
