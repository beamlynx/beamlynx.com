import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Pine Lang - Visual & Intuitive Database Queries</title>
        <meta
          name="description"
          content="Pine Lang is a simple, intuitive query language that makes database interactions delightful. Write queries while seeing your database relationships come to life."
        />
        <meta property="og:title" content="Pine Lang - Visual & Intuitive Database Queries" />
        <meta property="og:description" content="A simple, intuitive query language that makes database interactions delightful. Write queries while seeing your database relationships come to life." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pine-lang.org" />
        <meta property="og:image" content="https://pine-lang.org/pine-social-preview.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pine Lang - Visual & Intuitive Database Queries" />
        <meta name="twitter:description" content="A simple, intuitive query language that makes database interactions delightful." />
        <meta name="twitter:image" content="https://pine-lang.org/pine-social-preview.svg" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex items-center justify-center py-16 sm:py-24">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
            >
              Query databases
              <span className="text-pine-600"> visually and intuitively</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto px-4 sm:px-6"
            >
              Pine Lang is a simple, intuitive query language that makes database interactions delightful.
              Write queries while seeing your database relationships come to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 sm:mt-10 flex items-center justify-center px-4 sm:px-6"
            >
              <Link
                to="/docs"
                className="btn-primary"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Visual Query Building</h3>
              <p className="text-sm sm:text-base text-gray-600">
                See your database relationships visualized in real-time as you write queries.
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Intuitive Syntax</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Write queries in a language that feels natural and converts seamlessly to SQL.
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Real-time Visualization</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Watch your database relationships come to life as you type. See how tables connect 
                and understand query paths through interactive visual feedback.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 