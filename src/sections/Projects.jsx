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
          aria-label="Fermer les détails du projet"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <div className="eyebrow">
          {project.category} / {project.date}
        </div>
        {project.origin === "stage" && (
          <p className="project-context">
            Stage · {project.organization}
            {project.location && ` · ${project.location}`}
          </p>
        )}
        <h2 id="dialog-title">{project.title}</h2>
        {project.subtitle && <p>{project.subtitle}</p>}
        <ProjectVisual type={project.visual} />
        <h3>Objectif</h3>
        <p>{project.objective}</p>
        <h3>Travail réalisé</h3>
        <ul className="experience-bullets">
          {project.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
        <h3>Technologies & méthodes</h3>
        <Tags items={project.stack} />
        {project.result && (
          <>
            <h3>Résultats</h3>
            <p>{project.result}</p>
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
                {label}
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
          label="PROJETS"
          title={
            <>
              De la théorie
              <br />
              <span className="muted-title">à la pratique.</span>
            </>
          }
          description="Des réalisations en stage et des projets académiques et personnels, entre sécurité des infrastructures et développement applicatif."
        />
        <span className="project-total">
          {String(projects.length).padStart(2, "0")}
          <span>PROJETS</span>
        </span>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label="Filtrer les projets"
      >
        {filters.map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
            <span>
              {category === "Tous"
                ? projects.length
                : projects.filter((p) => matchesFilter(p, category)).length}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} projets affichés
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
                alt={`Aperçu du projet ${project.title}`}
                loading="lazy"
              />
            ) : (
              <ProjectVisual type={project.visual} />
            )}
            <div className="project-body">
              <div className="project-meta">
                <span>{project.category}</span>
                <span>{project.date}</span>
              </div>
              {project.origin === "stage" && (
                <p className="project-context">
                  Stage · {project.organization}
                </p>
              )}
              {project.featured && (
                <p className="feature-label">
                  <span />
                  PROJET À LA UNE
                </p>
              )}
              <h3>{project.title}</h3>
              {project.subtitle && (
                <p className="project-subtitle">{project.subtitle}</p>
              )}
              <p className="project-summary">{project.summary}</p>
              <Tags items={project.stack} />
              <button
                className="details-button"
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setSelected(project);
                }}
              >
                Explorer le projet
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
