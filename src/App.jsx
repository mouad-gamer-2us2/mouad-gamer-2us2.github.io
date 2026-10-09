import { useT } from "./i18n/Language";
import ScrollEffects from "./components/ScrollEffects";
import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import Journey from "./sections/Journey";
import About from "./sections/About";
import Timeline from "./sections/Timeline";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import { education, experiences } from "./data/profile";

export default function App() {
  const t = useT();

  return (
    <>
      <a className="skip-link" href="#main">
        {t("Aller au contenu")}
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero>
          <Journey />
        </Hero>
        <About />
        <Timeline
          id="parcours"
          number="02"
          label={t("PARCOURS")}
          title={t("Un parcours qui se construit.")}
          description={t(
            "Des fondamentaux scientifiques à la spécialisation en sécurité informatique.",
          )}
          items={education}
        />
        <Timeline
          id="experiences"
          number="03"
          label={t("EXPÉRIENCES")}
          title={
            <>
              {t("La pratique,")}
              <br />
              <span className="muted-title">
                {t("en environnement professionnel.")}
              </span>
            </>
          }
          items={experiences}
        />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <ScrollEffects />
    </>
  );
}
