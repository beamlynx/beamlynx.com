import { motion } from "framer-motion";

const Setup = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <title>beamlynx - Getting Started</title>
      <meta
        name="description"
        content="Get started with beamlynx. Download the desktop app and start exploring databases visually."
      />
      <meta property="og:title" content="Beamlynx - Getting Started" />
      <meta property="og:description" content="Get started with beamlynx. Download the desktop app and start exploring databases visually." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org/setup" />
      <meta property="og:image" content="https://beamlynx.org/pine-social-preview.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Beamlynx - Getting Started" />
      <meta name="twitter:description" content="Get started with beamlynx. Download the desktop app and start exploring databases visually." />
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
              className="text-2xl font-bold tracking-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              Get started with
              <span className="text-pine-600"> beamlynx</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9"
            >
              Download the desktop app and start exploring your
              databases with visual, intuitive queries in minutes.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Setup Instructions */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 gap-8 lg:gap-12"
          >
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-pine-600 flex items-center justify-center text-white font-semibold mr-4">
                  1
                </div>
                <h3 className="mb-0 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Download the App
                </h3>
              </div>
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 mb-4">
                Grab the latest release for your platform &mdash; macOS (.dmg), Windows (.exe), or Linux (.AppImage / .deb):
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <a
                  href="https://github.com/beamlynx/beamlynx-desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-mono text-pine-600 hover:text-pine-800 hover:underline inline-flex items-center transition-colors duration-200"
                >
                  github.com/beamlynx/beamlynx-desktop/releases
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-pine-600 flex items-center justify-center text-white font-semibold mr-4">
                  2
                </div>
                <h3 className="mb-0 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Install and Open
                </h3>
              </div>
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 mb-4">
                Install it like any other desktop app and launch beamlynx.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-pine-600 flex items-center justify-center text-white font-semibold mr-4">
                  3
                </div>
                <h3 className="mb-0 text-xl font-semibold text-gray-900 sm:text-2xl">
                  Connect to Your Database
                </h3>
              </div>
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 mb-4">
                In the app, you'll be prompted to enter your database credentials to establish a connection.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Setup; 