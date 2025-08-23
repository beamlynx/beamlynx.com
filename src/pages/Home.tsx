import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import beamlynxScreenshot from '../assets/beamlynx-1.png';

const Home = () => {
  return (
    <div className="flex flex-col">
      <title>Beamlynx - Visual & Intuitive Database Queries</title>
      <meta
        name="description"
        content="Beamlynx is a visual database client that makes database interactions delightful. Explore and interact with your data using pine-lang, a simple, intuitive query language."
      />
      <meta property="og:title" content="Beamlynx - Visual & Intuitive Database Queries" />
      <meta property="og:description" content="A visual database client that makes database interactions delightful. Explore and interact with your data using pine-lang, a simple, intuitive query language." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org" />
      <meta property="og:image" content="https://beamlynx.org/pine-social-preview.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Beamlynx - Visual & Intuitive Database Queries" />
      <meta name="twitter:description" content="A visual database client that makes database interactions delightful." />
      <meta name="twitter:image" content="https://beamlynx.org/pine-social-preview.svg" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex items-center justify-center py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-700"
            >
              Explore databases
              <span className="text-pine-600"> visually and intuitively</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 max-w-4xl mx-auto px-4 sm:px-6"
            >
              Beamlynx is a visual database client that makes database interactions delightful.
              Use a simple, composable language to write queries while seeing your database relationships come to life.
            </motion.p>
            
            {/* Screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:mt-8"
            >
              <img
                src={beamlynxScreenshot}
                alt="Beamlynx visual database client interface showing pine-lang queries and database relationships"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Visual Database Client</h3>
              <p className="text-sm sm:text-base text-gray-600">
                See your database relationships visualized in real-time as you write pine-lang queries.
                Visualizing relationships has never been easier.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">pine-lang DSL</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Write queries in pine-lang, a language that feels natural and converts seamlessly to SQL.
                This allows you to focus on the problem, not the syntax.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Interactive Experience</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Watch your database relationships come to life as you type. See how tables connect 
                and understand query paths through interactive visual feedback.
              </p>
            </motion.div>
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="https://playground.beamlynx.com"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try it out <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 