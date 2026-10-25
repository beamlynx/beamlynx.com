import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ContactEmail from "../components/ContactEmail";
import { getLangFromPathname, localizedPath } from "../i18n/paths";

type Section = { title: string; paragraphs: string[] };

const LICENSE_URL = "https://github.com/beamlynx/beamlynx-desktop/blob/main/LICENSE";
const linkClass = "underline decoration-dotted underline-offset-2 hover:no-underline";

// A page of plain legal text: the privacy page and the terms. Each is one
// translation namespace with a heading, an intro and sections of paragraphs.
// The text can place the contact address (<email/>) and links to the privacy
// page (<privacy>…</privacy>) and the licence (<licence>…</licence>).
const LegalPage = ({ ns, path }: { ns: "privacy" | "terms"; path: string }) => {
  const { t } = useTranslation(ns);
  const location = useLocation();
  const privacyPath = localizedPath(getLangFromPathname(location.pathname) ?? "en", "/privacy");
  const sections = t("sections", { returnObjects: true }) as Section[];
  const components = {
    email: <ContactEmail />,
    privacy: <Link to={privacyPath} className={linkClass} />,
    licence: <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer" className={linkClass} />,
  };

  return (
    <div className="bp-page flex flex-col">
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta property="og:title" content={t("meta.title")} />
      <meta property="og:description" content={t("meta.description")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://beamlynx.com${path}`} />

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl w-full">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--bp-text)" }}>
            {t("heading")}
          </h1>
          <p className="mt-4 text-base leading-7" style={{ color: "var(--bp-text-dim)" }}>
            <Trans t={t} i18nKey="intro" components={components} />
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
                    <Trans t={t} i18nKey={`sections.${i}.paragraphs.${j}`} components={components} />
                  </p>
                ))}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
