import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { translate } from "./translations";

const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    try {
      const stored = localStorage.getItem("portfolio-language");
      return ["fr", "en", "de"].includes(stored) ? stored : "fr";
    } catch {
      return "fr";
    }
  });
  const t = useCallback((value) => translate(value, locale), [locale]);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `Mouad Jaalouti | ${t("Sécurité informatique")} & ${t("Développement")}`;
    const description = t(
      "Portfolio de Mouad Jaalouti : sécurité informatique, développement web, projets et parcours.",
    );
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute(
        "content",
        { fr: "fr_FR", en: "en_US", de: "de_DE" }[locale],
      );
    try {
      localStorage.setItem("portfolio-language", locale);
    } catch {
      /* Storage may be disabled. */
    }
  }, [locale, t]);
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useLanguage().t;

function Flag({ locale }) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
      {locale === "fr" ? (
        <>
          <path fill="#fff" d="M0 0h30v20H0z" />
          <path fill="#002395" d="M0 0h10v20H0z" />
          <path fill="#ed2939" d="M20 0h10v20H20z" />
        </>
      ) : locale === "de" ? (
        <>
          <path fill="#ffce00" d="M0 0h30v20H0z" />
          <path fill="#d00" d="M0 0h30v13.33H0z" />
          <path fill="#111" d="M0 0h30v6.67H0z" />
        </>
      ) : (
        <>
          <path fill="#fff" d="M0 0h30v20H0z" />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              fill="#b22234"
              d={`M0 ${(i * 40) / 13}h30v${20 / 13}H0z`}
            />
          ))}
          <path fill="#3c3b6e" d="M0 0h13v10.8H0z" />
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: row % 2 ? 5 : 6 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                fill="#fff"
                cx={1.1 + col * 2.1 + (row % 2 ? 1.05 : 0)}
                cy={1 + row * 1.1}
                r=".35"
              />
            )),
          )}
        </>
      )}
    </svg>
  );
}
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t("Choisir la langue")}
    >
      {[
        ["fr", "Français"],
        ["en", "English"],
        ["de", "Deutsch"],
      ].map(([code, name]) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={name}
          title={name}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          <Flag locale={code} />
          <span>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
