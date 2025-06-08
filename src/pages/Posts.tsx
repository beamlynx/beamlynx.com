import React from 'react';
import { motion } from 'framer-motion';
import { useColorPalette } from '../contexts/ColorPaletteContext';

const Posts: React.FC = () => {
  const palette = useColorPalette();

  const posts = [
    {
      title: "Discovering Pine-lang",
      description: "A journey from frustration with SQL complexity to the creation of Pine-lang, a domain-specific language that makes database queries as intuitive as Unix pipes.",
      date: "2024-05-25",
      url: "https://pinelang.substack.com/p/discovering-pine-lang-simplifying",
      readTime: "3 min read",
      preview: `It's 2017, and I'm working at Penneo. I've been with the company for a few years, but we're still in startup mode. The product isn't fully mature, and I often find myself diving into the data to fix bugs. Occasionally, I'm on the phone with a user, cramming the phone between my shoulder and ear—lacking decent headphones with a mic—trying to troubleshoot database issues on the fly...`
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
                  <div className="flex items-center gap-2 mb-3">
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
                    <span style={{ color: `${palette.secondary}99` }}>•</span>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: `${palette.secondary}99` }}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  <h2 
                    className="text-xl sm:text-2xl font-semibold mb-2 group-hover:text-pine-600 transition-colors duration-200"
                    style={{ color: palette.primary }}
                  >
                    {post.title}
                  </h2>

                  <p 
                    className="text-base sm:text-lg line-clamp-3"
                    style={{ color: palette.secondary }}
                  >
                    {post.preview}
                  </p>

                  <div className="mt-4 flex items-center">
                    <span 
                      className="text-sm font-medium group-hover:underline"
                      style={{ color: palette.accent }}
                    >
                      Read more
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5 inline-block">
                        →
                      </span>
                    </span>
                  </div>
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