import { motion } from "framer-motion";
import beamlynxScreenshot from "../assets/beamlynx-1.png";
import { DEFAULT_EXAMPLE_QUERY, openInPlayground } from "../utils/playground";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <title>beamlynx - Visual & Intuitive Database Queries</title>
      <meta
        name="description"
        content="Beamlynx is a visual database client that makes database interactions delightful. Explore and interact with your data using pine-lang, a simple, intuitive query language."
      />
      <meta
        property="og:title"
        content="Beamlynx - Visual & Intuitive Database Queries"
      />
      <meta
        property="og:description"
        content="A visual database client that makes database interactions delightful. Explore and interact with your data using pine-lang, a simple, intuitive query language."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org" />
      <meta
        property="og:image"
        content="https://beamlynx.org/pine-social-preview.svg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Beamlynx - Visual & Intuitive Database Queries"
      />
      <meta
        name="twitter:description"
        content="A visual database client that makes database interactions delightful."
      />
      <meta
        name="twitter:image"
        content="https://beamlynx.org/pine-social-preview.svg"
      />

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
              Explore databases
              <span className="text-pine-600"> visually and intuitively</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9"
            >
              Beamlynx is a visual database client that makes database
              interactions delightful. Use a simple, composable language to
              write queries while seeing your database relationships come to
              life.
            </motion.p>

            {/* Screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 sm:mt-10 lg:mt-12"
            >
              <img
                src={beamlynxScreenshot}
                alt="Beamlynx visual database client interface showing pine-lang queries and database relationships"
                className="mx-auto w-full max-w-xs rounded-lg shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                Visual Database Client
              </h3>
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                See your database relationships visualized in real-time as you
                write pine-lang queries. Visualizing relationships has never
                been easier.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                pine-lang DSL
              </h3>
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Write queries in pine-lang, a language that feels natural and
                converts seamlessly to SQL. This allows you to focus on the
                problem, not the syntax.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card md:col-span-2 lg:col-span-1"
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                Interactive Experience
              </h3>
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Watch your database relationships come to life as you type. See
                how tables connect and understand query paths through
                interactive visual feedback.
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center sm:mt-20 lg:mt-24"
          >
            <button
              onClick={() => openInPlayground(DEFAULT_EXAMPLE_QUERY)}
              className="btn-primary text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4"
            >
              Try it out <span aria-hidden="true">↗</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
