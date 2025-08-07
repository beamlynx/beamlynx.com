import React from 'react';
import { motion } from 'framer-motion';
import { useColorPalette } from '../contexts/ColorPaletteContext';

const Posts: React.FC = () => {
  const palette = useColorPalette();

  const posts = [
    {
      title: "Insight. Simplicity. Delight.",
      date: "2025-06-15",
      url: "https://open.substack.com/pub/beamlynx/p/insight-simplicity-delight",
      readTime: "1 min read",
      preview: `Over time, I've come to expect three things from the systems I work with: they should teach me something, they should help me think clearly, and they should make the experience enjoyable. I am constantly refining Pine to meet that bar. Building for Insight: Teach me! I don't want to read the docs - the system should figure out my intent and show me the way. Building for Simplicity: Clarity of thought! I don't want to think about things that are not relevant to the problem at hand. Building for Delight: Fun! I don't want to feel like I am doing chores. The task of solving problems should be enjoyable.`
    },
    {
      title: "Discovering Pine-lang",
      date: "2024-05-25",
      url: "https://beamlynx.substack.com/p/discovering-pine-lang-simplifying",
      readTime: "3 min read",
      preview: `It's 2017, and I'm working at Penneo. I've been with the company for a few years, but we're still in startup mode. The product isn't fully mature, and I often find myself diving into the data to fix bugs. Occasionally, I'm on the phone with a user, cramming the phone between my shoulder and ear—lacking decent headphones with a mic—trying to troubleshoot database issues on the fly...`
    },
    // Add more posts as they come
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20">
      <title>Beamlynx - Blog</title>
      <meta
        name="description"
        content="Read the latest news, articles, and insights from the Beamlynx team. Stay up-to-date with our development journey and discover the philosophy behind Beamlynx."
      />
      <meta property="og:title" content="Beamlynx - Blog" />
      <meta property="og:description" content="The latest news, articles, and insights from the Beamlynx team." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org/posts" />
      <meta property="og:image" content="https://beamlynx.org/pine-social-preview.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Beamlynx - Blog" />
      <meta name="twitter:description" content="The latest news, articles, and insights from the Beamlynx team." />
      <meta name="twitter:image" content="https://beamlynx.org/pine-social-preview.svg" />
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