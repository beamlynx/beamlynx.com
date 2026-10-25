import { Trans, useTranslation } from "react-i18next";
import ContactEmail from "../components/ContactEmail";

type Section = { title: string; paragraphs: string[] };

// What Beamlynx collects, from the app and this site. The app's first-run
// screen and Settings -> Account link here (beamlynx-ui's
// components/settings/AccountSection.tsx, PRIVACY_URL), so keep the
// /privacy path.
const Privacy = () => {
  const { t } = useTranslation("privacy");
  const sections = t("sections", { returnObjects: true }) as Section[];

  return (
    <div className="bp-page flex flex-col">
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta property="og:title" content={t("meta.title")} />
      <meta property="og:description" content={t("meta.description")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.com/privacy" />

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl w-full">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--bp-text)" }}>
            {t("heading")}
          </h1>
          <p className="mt-4 text-base leading-7" style={{ color: "var(--bp-text-dim)" }}>
            <Trans t={t} i18nKey="intro" components={{ email: <ContactEmail /> }} />
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--bp-text-dim)" }}>
            {t("updated")}
          </p>

          {Array.isArray(sections) &&
            sections.map((section, i) => (
              <div key={section.title} className="mt-10">
                <h2 className="text-xl font-semibold" style={{ color: "var(--bp-text)" }}>
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph, j) => (
                  <p key={paragraph} className="mt-3 text-base leading-7" style={{ color: "var(--bp-text-dim)" }}>
                    <Trans t={t} i18nKey={`sections.${i}.paragraphs.${j}`} components={{ email: <ContactEmail /> }} />
                  </p>
                ))}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Privacy;
