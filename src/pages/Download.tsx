import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import InstallTabs from "../components/InstallTabs";
import { trackEvent } from "../utils/analytics";

const Download = () => {
  const [searchParams] = useSearchParams();
  const playgroundDisabled = searchParams.get("playground") === "disabled";

  useEffect(() => {
    // Backstop for playground_clicked: also covers a visitor landing here
    // directly (an old bookmark/link to the playground itself redirecting
    // here) rather than via one of this site's own "Playground" buttons.
    if (playgroundDisabled) {
      trackEvent('playground_redirect_landed', { source: searchParams.get('source') ?? 'unknown' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bp-page flex flex-col">
      <title>beamlynx - Download</title>
      <meta
        name="description"
        content="Download beamlynx, the intuitive, visual database client."
      />
      <meta property="og:title" content="Beamlynx - Download" />
      <meta property="og:description" content="Download beamlynx, the intuitive, visual database client." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org/download" />
      <meta property="og:image" content="https://beamlynx.org/pine-social-preview.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Beamlynx - Download" />
      <meta name="twitter:description" content="Download beamlynx, the intuitive, visual database client." />
      <meta name="twitter:image" content="https://beamlynx.org/pine-social-preview.svg" />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl w-full"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{ color: 'var(--bp-text)' }}
            >
              Download
              <span className="text-pine-600"> beamlynx</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-4 max-w-3xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9"
              style={{ color: 'var(--bp-text-dim)' }}
            >
              The intuitive, visual database client.
            </motion.p>
            {playgroundDisabled && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mx-auto mt-6 max-w-2xl rounded-lg border px-4 py-3 text-sm sm:text-base"
                style={{
                  color: 'var(--bp-text-dim)',
                  borderColor: 'var(--bp-trace)',
                  backgroundColor: 'color-mix(in srgb, var(--bp-trace) 10%, transparent)',
                }}
              >
                The hosted playground is currently disabled. Download the app
                below to try beamlynx.
              </motion.p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Download Instructions */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            <InstallTabs />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Download;
