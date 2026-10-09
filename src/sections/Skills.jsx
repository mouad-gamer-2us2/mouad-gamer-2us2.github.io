import { useT } from "../i18n/Language";
import { skills } from "../data/profile";
import { SectionHeading, Tags, iconMap } from "../components/UI";
export default function Skills() {
  const t = useT();

  return (
    <section id="competences" className="section container">
      <SectionHeading
        number="04"
        label={t("COMPÉTENCES")}
        title={
          <>
            {t("Une vision d’ensemble.")}
            <br />
            <span className="muted-title">
              {t("Des compétences concrètes.")}
            </span>
          </>
        }
        description={t(
          "Les technologies et méthodes mises en pratique au fil de mon parcours.",
        )}
      />
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const Icon = iconMap[skill.icon];
          return (
            <article className="skill-card" key={skill.title}>
              <div className="skill-top">
                <span className="icon-tile">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <span className="mono muted">
                  {"0"}
                  {t(index + 1)}
                </span>
              </div>
              <h3>{t(skill.title)}</h3>
              <p>{t(skill.text)}</p>
              <Tags items={skill.items} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
