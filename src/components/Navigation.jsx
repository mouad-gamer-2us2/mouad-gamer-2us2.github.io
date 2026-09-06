import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";

export const navigation = [
  ["accueil", "Accueil"],
  ["a-propos", "À propos"],
  ["parcours", "Parcours"],
  ["experiences", "Expériences"],
  ["competences", "Compétences"],
  ["projets", "Projets"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length)
          setActive(
            visible[0].target.id === "presentation"
              ? "accueil"
              : visible[0].target.id,
          );
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function onEscape(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);
  return (
    <header className="header">
      <div className="nav-shell">
        <a
          className="brand"
          href="#accueil"
          aria-label={`${profile.name}, accueil`}
          onClick={() => setOpen(false)}
        >
          <span className="monogram">
            m<span>j</span>
            <i>.</i>
          </span>
          <span className="brand-name">
            {profile.firstName.toUpperCase()}
            <br />
            <strong>{profile.lastName.toUpperCase()}</strong>
          </span>
        </a>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Navigation principale"
        >
          {navigation.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              {id === "contact" && (
                <ArrowUpRight size={14} aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
