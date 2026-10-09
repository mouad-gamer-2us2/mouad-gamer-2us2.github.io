import { useT } from "../i18n/Language";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  X,
  GitFork as Github,
  ExternalLink,
  FileText,
} from "lucide-react";
import { projects } from "../data/projects";
import { SectionHeading, Tags, asset } from "../components/UI";
import ProjectVisual from "../components/ProjectVisual";

function ProjectDialog({ project, onClose }) {
  const t = useT();

  const dialog = useRef(null);
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.current.querySelectorAll("button, a[href]")];
    const first = focusable[0],
      last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element.open) element.close();
    };
  }, []);
  return (
    <dialog
      onKeyDown={trapFocus}
      ref={dialog}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          autoFocus
          className="close-dialog"
          aria-label={t("Fermer les détails du projet")}
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <div className="eyebrow">
          {t(project.category)}
          {" / "}
          {t(project.date)}
        </div>
        {project.origin === "stage" && (
          <p className="project-context">
            {t("Stage · ")}
            {t(project.organization)}
            {project.location && ` · ${project.location}`}
          </p>
        )}
        <h2 id="dialog-title">{t(project.title)}</h2>
        {project.subtitle && <p>{t(project.subtitle)}</p>}
        <ProjectVisual type={project.visual} />
        <h3>{t("Objectif")}</h3>
        <p>{t(project.objective)}</p>
        <h3>{t("Travail réalisé")}</h3>
        <ul className="experience-bullets">
          {project.actions.map((action) => (
            <li key={action}>{t(action)}</li>
          ))}
        </ul>
        <h3>{t("Technologies & méthodes")}</h3>
        <Tags items={project.stack} />
        {project.result && (
          <>
            <h3>{t("Résultats")}</h3>
            <p>{t(project.result)}</p>
          </>
        )}
        <div className="project-links">
          {[
            [project.github, "Code source", Github],
            [project.demo, "Démo", ExternalLink],
            [project.report, "Rapport", FileText],
          ]
            .filter(([url]) => url)
            .map(([url, label, Icon]) => (
              <a
                className="button secondary"
                href={url.startsWith("https://") ? url : asset(url)}
                target="_blank"
                rel="noopener noreferrer"
                key={label}
              >
                <Icon size={17} />
                {t(label)}
              </a>
            ))}
        </div>
      </div>
    </dialog>
  );
}

function matchesFilter(project, filter) {
  return (
    filter === "Tous" ||
    (filter === "En stage"
      ? project.origin === "stage"
      : project.category === filter)
  );
}

export default function Projects() {
  const t = useT();

  const [filter, setFilter] = useState("Tous");
  const [selected, setSelected] = useState(null);
  const trigger = useRef(null);
  const filtered = projects.filter((project) => matchesFilter(project, filter));
  const filters = [
    "Tous",
    "En stage",
    "Cybersécurité",
    "Développement",
    "Systèmes & réseaux",
  ];
  function close() {
    setSelected(null);
    requestAnimationFrame(() => trigger.current?.focus());
  }
  return (
    <section id="projets" className="section container">
      <div className="projects-heading">
        <SectionHeading
          number="05"
          label={t("PROJETS")}
          title={
            <>
              {t("De la théorie")}
              <br />
              <span className="muted-title">{t("à la pratique.")}</span>
            </>
          }
          description={t(
            "Des réalisations en stage et des projets académiques et personnels, entre sécurité des infrastructures et développement applicatif.",
          )}
        />
        <span className="project-total">
          {t(String(projects.length).padStart(2, "0"))}
          <span>{t("PROJETS")}</span>
        </span>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label={t("Filtrer les projets")}
      >
        {filters.map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {t(category)}
            <span>
              {t(
                category === "Tous"
                  ? projects.length
                  : projects.filter((p) => matchesFilter(p, category)).length,
              )}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {t(filtered.length)}
        {t(" projets affichés")}
      </p>
      <div className="projects-grid">
        {filtered.map((project) => (
          <article
            className={`project-card ${project.featured ? "featured" : ""}`}
            key={project.id}
          >
            {project.image ? (
              <img
                className="project-visual"
                src={asset(project.image)}
                alt={`${t("Aperçu du projet")} ${t(project.title)}`}
                loading="lazy"
              />
            ) : (
              <ProjectVisual type={project.visual} />
            )}
            <div className="project-body">
              <div className="project-meta">
                <span>{t(project.category)}</span>
                <span>{t(project.date)}</span>
              </div>
              {project.origin === "stage" && (
                <p className="project-context">
                  {t("Stage · ")}
                  {t(project.organization)}
                </p>
              )}
              {project.featured && (
                <p className="feature-label">
                  <span />
                  {t("PROJET À LA UNE")}
                </p>
              )}
              <h3>{t(project.title)}</h3>
              {project.subtitle && (
                <p className="project-subtitle">{t(project.subtitle)}</p>
              )}
              <p className="project-summary">{t(project.summary)}</p>
              <Tags items={project.stack} />
              <button
                className="details-button"
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setSelected(project);
                }}
              >
                {t("Explorer le projet")}
                <span>
                  {project.featured ? (
                    <ArrowRight size={19} />
                  ) : (
                    <ArrowUpRight size={19} />
                  )}
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {selected && <ProjectDialog project={selected} onClose={close} />}
    </section>
  );
}
