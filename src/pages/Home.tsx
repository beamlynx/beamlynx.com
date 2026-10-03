import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { getLangFromPathname, localizedPath } from "../i18n/paths";
import { detectOS, isMobileDevice } from "../utils/detectOS";
import { trackEvent } from "../utils/analytics";
import AppShowcase from "../components/home/AppShowcase";
import TryIt from "../components/home/TryIt";

const OG_IMAGE = "https://beamlynx.com/og-image.png";

// What an AI agent sends through beamlynx's MCP server: a doc comment saying
// what it is looking for, then plain Pine. Verified against pine-lang 0.47.0.
const AGENT_QUERY = [
  "-- Which customers left five-star reviews?",
  "customers",
  "| public.orders .customer_id",
  "| public.product_reviews .order_id",
  "| where: rating = 5",
];

const Home = () => {
  const { t } = useTranslation("home");
  const location = useLocation();
  const downloadHref = localizedPath(getLangFromPathname(location.pathname) ?? "en", "/download");
  const os = isMobileDevice() ? null : detectOS();
  const downloadLabel = os ? t(`cta.downloadFor.${os}`) : t("cta.download");

  // The navbar's "Try it" links here as /#try, from any page.
  useEffect(() => {
    if (location.hash === "#try") document.getElementById("try")?.scrollIntoView();
  }, [location.hash, location.key]);

  const DownloadButton = ({ source }: { source: string }) => (
    <Link
      to={downloadHref}
      className="bp-btn bp-btn-primary"
      onClick={() => trackEvent("home_download_clicked", { source, os })}
    >
      {downloadLabel}
    </Link>
  );

  return (
    <div className="bp-page home flex flex-col min-h-screen">
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta property="og:title" content={t("meta.ogTitle")} />
      <meta property="og:description" content={t("meta.ogDescription")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.com" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("meta.twitterTitle")} />
      <meta name="twitter:description" content={t("meta.twitterDescription")} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Hero */}
      <section className="home-hero px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="home-title">
            {t("hero.titleLine1")} <span className="home-title-accent">{t("hero.titleLine2")}</span>
          </h1>
          <div className="home-hero-row">
            <p className="home-lede">{t("hero.description")}</p>
            <div className="home-hero-actions">
              <div className="flex flex-wrap gap-3">
                <DownloadButton source="home_hero" />
                <a href="#try" className="bp-btn bp-btn-ghost">
                  {t("cta.tryHere")} <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="home-facts">{t("hero.facts")}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto max-w-6xl mt-12 sm:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AppShowcase />
        </motion.div>
      </section>

      {/* Try it */}
      <section id="try" className="home-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="home-section-head">
            <h2>{t("try.heading")}</h2>
            <p>{t("try.description")}</p>
          </div>
          <TryIt />
        </div>
      </section>

      {/* Agents */}
      <section className="home-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl home-agents">
          <div>
            <h2>{t("agents.heading")}</h2>
            <p className="home-agents-lede">{t("agents.description")}</p>
            <ul className="home-agents-list">
              <li>
                <strong>{t("agents.readOnly.title")}</strong> {t("agents.readOnly.description")}
              </li>
              <li>
                <strong>{t("agents.approval.title")}</strong> {t("agents.approval.description")}
              </li>
              <li>
                <strong>{t("agents.visible.title")}</strong> {t("agents.visible.description")}
              </li>
            </ul>
          </div>
          <div className="home-agent-card" aria-label={t("agents.cardLabel")}>
            <div className="home-agent-card-head">
              <span className="home-agent-dot" aria-hidden="true" />
              {t("agents.cardTitle")}
            </div>
            <pre>
              {AGENT_QUERY.map((line, i) => (
                <div key={i} className={line.startsWith("--") ? "tk-comment" : undefined}>
                  {line}
                </div>
              ))}
            </pre>
            <div className="home-agent-card-foot">{t("agents.cardFoot")}</div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="home-closing px-4 sm:px-6 lg:px-8">
        <h2>{t("closing.heading")}</h2>
        <p>
          <Trans t={t} i18nKey="closing.description" components={{ 1: <Link to={downloadHref} /> }} />
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <DownloadButton source="home_closing" />
        </div>
      </section>
    </div>
  );
};

export default Home;
