import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Timeline from "./sections/Timeline";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import { education, experiences } from "./data/profile";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Timeline
          id="parcours"
          number="02"
          label="PARCOURS"
          title="Un parcours qui se construit."
          description="Des fondamentaux scientifiques à la spécialisation en sécurité informatique."
          items={education}
        />
        <Timeline
          id="experiences"
          number="03"
          label="EXPÉRIENCES"
          title={
            <>
              La pratique,
              <br />
              <span className="muted-title">
                en environnement professionnel.
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
    </>
  );
}
