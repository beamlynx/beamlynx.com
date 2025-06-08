import { motion } from 'framer-motion';

const Playground = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Interactive Playground</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-8">
              The interactive playground is coming soon! Here you'll be able to:
            </p>
            
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <svg className="h-6 w-6 text-pine-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Write Pine Lang queries and see them transform into SQL in real-time
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 text-pine-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Visualize database relationships as an interactive graph
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 text-pine-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Get instant feedback on query structure and performance
              </li>
            </ul>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">
                We're working hard to bring you the full interactive experience.
                Check back soon or sign up for our newsletter to be notified when it's ready!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Playground; 