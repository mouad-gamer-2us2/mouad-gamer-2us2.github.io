import { useT } from "../i18n/Language";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Fingerprint } from "lucide-react";
import { journey, facets } from "../data/journey";
import { asset } from "../components/UI";
import FacetPortrait from "../components/FacetPortrait";
import "../styles/journey.css";

function useScrollChapter(ref, horizontal = false) {
  useEffect(() => {
    const shell = ref.current;
    const pin = shell.firstElementChild;
    const track = shell.querySelector(".journey-track");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const staticLayout =
        motion.matches || innerWidth <= 700 || innerHeight <= 650;
      const distance = horizontal
        ? Math.max(0, track.scrollWidth - pin.clientWidth)
        : innerHeight * 0.8;
      shell.style.height = staticLayout
        ? "auto"
        : `${pin.offsetHeight + distance}px`;
      const top = parseFloat(getComputedStyle(pin).top) || 0;
      const progress = staticLayout
        ? 1
        : Math.max(
            0,
            Math.min(
              1,
              (top - shell.getBoundingClientRect().top) / Math.max(1, distance),
            ),
          );
      shell.style.setProperty("--chapter-progress", progress);
      const bounds = shell.getBoundingClientRect();
      const entrance = Math.max(
        0,
        Math.min(1, (innerHeight - bounds.top) / (innerHeight * 0.8)),
      );
      const exit = Math.max(
        0,
        Math.min(1, bounds.bottom / (innerHeight * 0.8)),
      );
      shell.style.setProperty(
        "--chapter-light",
        staticLayout ? 1 : Math.min(entrance, exit),
      );
      shell.style.setProperty("--journey-x", `${-distance * progress}px`);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(pin);
    if (track) observer.observe(track);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, [ref, horizontal]);
}

export default function Journey() {
  const t = useT();

  const gallery = useRef(null);
  const dual = useRef(null);
  useScrollChapter(gallery, true);
  useScrollChapter(dual);
  return (
    <>
      <section
        className="journey-shell"
        id="moments"
        ref={gallery}
        aria-labelledby="journey-title"
      >
        <div className="journey-pin">
          <header className="journey-heading">
            <div>
              <p>{t("AU FIL DU PARCOURS")}</p>
              <h2 id="journey-title">{t("Au-delà du code.")}</h2>
            </div>
            <span>
              {t("Défiler pour explorer ")}
              <ArrowDown size={16} />
            </span>
          </header>
          <div className="journey-track">
            {journey.map((item, i) => (
              <article
                className={`journey-card journey-card-${i}`}
                key={item.title}
              >
                <p className="journey-label">{t(item.label)}</p>
                <div className="journey-image">
                  {item.image ? (
                    <img
                      src={asset(item.image)}
                      alt={t(item.alt)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="journey-art" aria-hidden="true">
                      <Fingerprint />
                      <span>{t(item.motif)}</span>
                      <b>
                        {"0"}
                        {t(i + 1)}
                      </b>
                    </div>
                  )}
                </div>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </article>
            ))}
            <aside className="journey-manifesto">
              <p>{t("UNE MÊME DIRECTION")}</p>
              <h3>
                {t("Comprendre.")}
                <br />
                <em>{t("Construire.")}</em>
                <br />
                {t("Protéger.")}
              </h3>
              <span>
                {t(
                  "Du code aux infrastructures, une approche qui relie développement et sécurité.",
                )}
              </span>
            </aside>
          </div>
        </div>
      </section>
      <section
        className="facets-shell"
        id="facettes"
        ref={dual}
        aria-labelledby="facets-title"
      >
        <div className="facets-pin">
          <p className="facets-eyebrow" id="facets-title">
            {t("DEUX FACETTES · UNE MÊME RIGUEUR")}
          </p>
          <FacetPortrait
            side="left"
            className="facet-photo facet-cyber"
            src={facets.cyberImage}
            label={t("Mouad, portrait en version cybersécurité")}
          />
          <FacetPortrait
            side="right"
            className="facet-photo facet-normal"
            src={facets.normalImage}
            label={t("Portrait de Mouad Jaalouti")}
          />
          <div className="facets-copy">
            <article>
              <p>{t("CÔTÉ SÉCURITÉ")}</p>
              <h2>
                {t("Analyser.")}
                <br />
                <em>{t("Protéger.")}</em>
              </h2>
              <span>
                {t(
                  "Sécurité réseau, supervision et durcissement des systèmes.",
                )}
              </span>
              <a href="#competences">
                {t("Mes compétences ")}
                <ArrowUpRight size={18} />
              </a>
            </article>
            <article>
              <p>{t("CÔTÉ DÉVELOPPEMENT")}</p>
              <h2>
                {t("Comprendre.")}
                <br />
                <em>{t("Construire.")}</em>
              </h2>
              <span>{t("Développement web, interfaces et applications.")}</span>
              <a href="#projets">
                {t("Mes réalisations ")}
                <ArrowUpRight size={18} />
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
