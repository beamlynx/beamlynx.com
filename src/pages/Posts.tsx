import React from 'react';
import { motion } from 'framer-motion';
import { useColorPalette } from '../contexts/ColorPaletteContext';

const Posts: React.FC = () => {
  const palette = useColorPalette();

  const posts = [
    {
      title: "Introducing Pine Lang",
      description: "A new way to write SQL queries with visual insights",
      date: "2024-03-20",
      url: "https://pinelang.substack.com/p/introducing-pine-lang",
    },
    {
      title: "The Power of Visual Query Building",
      description: "How Pine Lang makes database relationships clear and intuitive",
      date: "2024-03-22",
      url: "https://pinelang.substack.com/p/the-power-of-visual-query-building",
    },
    // Add more posts as they come
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 tracking-tight"
            style={{ color: palette.primary }}
          >
            Latest Posts
          </h1>
          
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200"
                style={{ borderColor: `${palette.accent}20` }}
              >
                <a 
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h2 
                    className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-pine-600 transition-colors duration-200"
                    style={{ color: palette.primary }}
                  >
                    {post.title}
                  </h2>
                  <p 
                    className="text-base sm:text-lg mb-4"
                    style={{ color: palette.secondary }}
                  >
                    {post.description}
                  </p>
                  <time 
                    className="text-sm font-medium"
                    style={{ color: `${palette.secondary}99` }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Posts; 