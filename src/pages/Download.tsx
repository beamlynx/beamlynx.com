import { motion } from "framer-motion";
import InstallTabs from "../components/InstallTabs";

const Download = () => {
  return (
    <div className="bp-page flex flex-col min-h-screen">
      <title>beamlynx - Download</title>
      <meta
        name="description"
        content="Download beamlynx, the desktop app for exploring your databases with visual, intuitive queries."
      />
      <meta property="og:title" content="Beamlynx - Download" />
      <meta property="og:description" content="Download beamlynx, the desktop app for exploring your databases with visual, intuitive queries." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org/download" />
      <meta property="og:image" content="https://beamlynx.org/pine-social-preview.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Beamlynx - Download" />
      <meta name="twitter:description" content="Download beamlynx, the desktop app for exploring your databases with visual, intuitive queries." />
      <meta name="twitter:image" content="https://beamlynx.org/pine-social-preview.svg" />

      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
              The desktop app for exploring your databases with visual,
              intuitive queries.
            </motion.p>
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
