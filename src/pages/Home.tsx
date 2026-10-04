import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { getLangFromPathname, localizedPath } from "../i18n/paths";
import { detectOS, isMobileDevice } from "../utils/detectOS";
import { trackEvent } from "../utils/analytics";
import TryIt from "../components/home/TryIt";

const OG_IMAGE = "https://beamlynx.com/og-image.png";

const Home = () => {
  const { t } = useTranslation(["home", "features"]);
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname) ?? "en";
  const downloadHref = localizedPath(lang, "/download");
  const featuresHref = localizedPath(lang, "/features");
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

        {/* The hero picture is a working copy of the app's canvas, not a
            screenshot, so the page never needs a backend to run or update. */}
        <motion.div
          id="try"
          className="home-try mx-auto max-w-6xl mt-12 sm:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TryIt />
        </motion.div>
      </section>

      {/* More: a few features, each linking to its section on /features */}
      <section className="home-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="home-more-head">
            <h2>{t("more.heading")}</h2>
            <Link to={featuresHref} className="home-more-all">
              {t("more.all")} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-more">
            {(["paths", "traverse", "edit", "access"] as const).map(id => (
              <Link key={id} to={{ pathname: featuresHref, hash: `#${id}` }} className="home-more-card">
                <h3>{t(`features:items.${id}.title`)}</h3>
                <p>{t(`more.items.${id}`)}</p>
              </Link>
            ))}
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
