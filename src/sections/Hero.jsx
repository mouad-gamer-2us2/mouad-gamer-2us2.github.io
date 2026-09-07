import { useEffect, useState, useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { profile, experiences } from "../data/profile";
import { projects } from "../data/projects";
import { CvLink, SocialLinks, asset } from "../components/UI";
import PortraitReveal from "../components/PortraitReveal";
import "../styles/hero.css";
import { quote } from "../data/quote";
import { useHeroScroll } from "../components/ScrollEffects";

function TypedRole() {
  const [text, setText] = useState(profile.roles[0]);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    function start() {
      clearTimeout(timer);
      if (query.matches) {
        setText(profile.roles[0]);
        return;
      }
      let role = 0,
        count = profile.roles[0].length,
        deleting = true;
      const tick = () => {
        const word = profile.roles[role];
        count += deleting ? -1 : 1;
        setText(word.slice(0, count));
        let delay = deleting ? 24 : 55;
        if (count === 0) {
          deleting = false;
          role = (role + 1) % profile.roles.length;
          delay = 220;
        } else if (count === word.length && !deleting) {
          deleting = true;
          delay = 3600;
        }
        timer = setTimeout(tick, delay);
      };
      timer = setTimeout(tick, 3600);
    }
    start();
    query.addEventListener("change", start);
    return () => {
      clearTimeout(timer);
      query.removeEventListener("change", start);
    };
  }, []);
  return (
    <div className="role-line">
      <span className="sr-only">{profile.title}</span>
      <span aria-hidden="true">
        <span className="prompt">›</span> {text}
        <span className="cursor">_</span>
      </span>
    </div>
  );
}

export default function Hero({ children }) {
  const [quotePaused, setQuotePaused] = useState(false);
  const scrollScene = useRef(null);
  const smallPortrait = useHeroScroll(scrollScene);
  return (
    <>
      <section
        ref={scrollScene}
        id="accueil"
        className="hero-scroll-shell"
        aria-labelledby="hero-title"
      >
        <div className="hero-pin">
          <div className="hero-message" aria-hidden="true">
            UNE CONVICTION / MOUAD JAALOUTI
          </div>
          <div
            className="quote-marquee"
            data-paused={quotePaused}
            aria-hidden="true"
          >
            {quote.lines.map((line, index) => (
              <div className={`quote-track quote-track-${index}`} key={line}>
                {Array.from({ length: 4 }, (_, repeat) => (
                  <span key={repeat}>{line}&nbsp;</span>
                ))}
              </div>
            ))}
          </div>
          <div className="hero-scene">
            <PortraitReveal suspended={smallPortrait} />
            <span className="scene-index" aria-hidden="true">
              MJ / PORTFOLIO PERSONNEL
            </span>
            <div className="scene-name">
              <p>CODE · SYSTÈMES · CYBERSÉCURITÉ</p>
              <h1 id="hero-title">
                {profile.firstName}
                <span>{profile.lastName}</span>
              </h1>
              <small>{profile.title}</small>
            </div>
            <a className="scene-scroll" href="#presentation">
              Explorer mon portfolio <ArrowDown size={20} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-signature" aria-hidden="true">
            <div className="signature-crop">
              <svg viewBox="0 205 1000 360" aria-hidden="true">
                <defs>
                  <filter id="signature-ink" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.48  0 0 0 0 0.88  0 0 0 0 0.74  -0.2126 -0.7152 -0.0722 0 1"
                    />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="1.4" intercept="-0.1" />
                    </feComponentTransfer>
                  </filter>
                </defs>
                <image
                  href={asset(profile.signature)}
                  width="1000"
                  height="750"
                  filter="url(#signature-ink)"
                />
              </svg>
            </div>
            <span>MOUAD JAALOUTI</span>
          </div>
          <blockquote className="hero-quote-credit" inert={!smallPortrait}>
            <p className="sr-only" lang="en">
              {quote.original}
            </p>
            <cite>
              <a href={quote.source} target="_blank" rel="noopener noreferrer">
                {quote.author} · <span lang="en">The Process of Security</span>
              </a>
            </cite>
            <small>Traduction française</small>
            <button
              className="quote-pause"
              type="button"
              aria-pressed={quotePaused}
              onClick={() => setQuotePaused(!quotePaused)}
            >
              {quotePaused
                ? "Animer la citation"
                : "Mettre la citation en pause"}
            </button>
          </blockquote>
        </div>
      </section>
      {children}
      <section
        id="presentation"
        className="hero-introduction container"
        aria-labelledby="intro-title"
      >
        <div className="intro-layout">
          <div>
            {profile.status && (
              <div className="status">
                <span className="status-dot" />
                {profile.status}
              </div>
            )}
            <h2 id="intro-title" className="intro-heading">
              Construire avec rigueur.
              <br />
              <span>Sécuriser avec méthode.</span>
            </h2>
            <TypedRole />
          </div>
          <div>
            <p className="hero-description">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projets">
                Voir mes projets
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <CvLink />
            </div>
            <SocialLinks />
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-facts">
            <div>
              <strong>{String(projects.length).padStart(2, "0")}</strong>
              <span>
                projets en stage
                <br />
                et hors stage
              </span>
            </div>
            <div>
              <strong>{String(experiences.length).padStart(2, "0")}</strong>
              <span>
                expériences
                <br />
                en entreprise
              </span>
            </div>
            <div>
              <strong>{profile.expectedGraduation}</strong>
              <span>
                fin du cycle ingénieur
                <br />
                prévue
              </span>
            </div>
          </div>
          <a className="discover" href="#a-propos">
            Découvrir mon parcours
            <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
