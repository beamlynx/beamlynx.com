import { useState } from "react";
import { useTranslation } from "react-i18next";

// Real screenshots of beamlynx-ui 0.64.0, one per built-in theme, taken
// against pine-lang's sample shop database (dev.docker-compose.yml). Only
// the dev-build chip and version label were hidden before capture. To
// retake them, see public/img/README.md.
const THEMES = ["dark", "light", "sepia"] as const;
type Theme = (typeof THEMES)[number];

const AppShowcase = () => {
  const { t } = useTranslation("home");
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <figure className={`shot shot-${theme}`}>
      <div className="shot-frame">
        <picture>
          <source media="(max-width: 640px)" srcSet={`/img/app-${theme}-crop.webp`} />
          <img
            src={`/img/app-${theme}.webp`}
            srcSet={`/img/app-${theme}.webp 1360w, /img/app-${theme}@2x.webp 2720w`}
            sizes="(max-width: 1200px) 100vw, 1152px"
            width={1360}
            height={800}
            alt={t("showcase.alt")}
            fetchPriority="high"
          />
        </picture>
      </div>
      <figcaption className="shot-caption">
        <span>{t("showcase.caption")}</span>
        <span className="shot-themes" role="radiogroup" aria-label={t("showcase.themeLabel")}>
          {THEMES.map(th => (
            <button
              key={th}
              type="button"
              role="radio"
              aria-checked={theme === th}
              className={`shot-swatch shot-swatch-${th}${theme === th ? " is-active" : ""}`}
              onClick={() => setTheme(th)}
            >
              <span aria-hidden="true" className="shot-dot" />
              {t(`showcase.themes.${th}`)}
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  );
};

export default AppShowcase;
