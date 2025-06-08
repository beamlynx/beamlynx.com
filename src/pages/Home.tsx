import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
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
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Write SQL with delight
              <span className="text-pine-600"> and insight</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto"
            >
              Pine Lang is a visual query language that makes database interactions intuitive and beautiful.
              Write queries while seeing your database relationships come to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center justify-center"
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
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visual Query Building</h3>
              <p className="text-gray-600">
                See your database relationships visualized in real-time as you write queries.
                Understanding complex joins has never been easier.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intuitive Syntax</h3>
              <p className="text-gray-600">
                Write queries in a language that feels natural and converts seamlessly to SQL.
                No more wrestling with complex JOIN syntax.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Preview</h3>
              <p className="text-gray-600">
                See your results instantly as you type. Debug and optimize your queries
                with immediate visual feedback.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 