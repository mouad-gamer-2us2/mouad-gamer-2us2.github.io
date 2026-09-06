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
  return (
    <section id={id} className="section container">
      <SectionHeading
        number={number}
        label={label}
        title={title}
        description={description}
      />
      <ol className="timeline">
        {items.map((item) => (
          <li
            className="timeline-item"
            key={`${item.title}-${item.organization}`}
          >
            <div className="timeline-date">
              <span>{item.date}</span>
              {item.current && <span className="small-badge">En cours</span>}
            </div>
            <article className="timeline-content">
              <p className="organization">{item.organization}</p>
              <h3>{item.title}</h3>
              {item.location && (
                <p className="location">
                  <MapPin size={13} aria-hidden="true" />
                  {item.location}
                </p>
              )}
              {item.description && <p>{item.description}</p>}
              {item.bullets && (
                <ul className="experience-bullets">
                  {item.bullets.map((text) => (
                    <li key={text}>{text}</li>
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
                  Consulter le code du projet
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
