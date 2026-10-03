import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { HTML_LANG, type Locale } from '../i18n/config';

const Posts: React.FC = () => {
  const palette = useColorPalette();
  const { t, i18n } = useTranslation('posts');
  const currentLocale = i18n.language as Locale;

  const posts = [
    {
      title: "Killing the core feature in Beamlynx",
      date: "2026-09-05",
      url: "https://beamlynx.substack.com/p/killing-the-core-feature-in-beamlynx",
      preview: `Beamlynx is opinionated. Either you love it - or you hate it with all your might. The reason why it is so polarizing is that it asks the users to use a DSL instead of SQL as the main query language.`
    },
    {
      title: "Where is the AI in Beamlynx?",
      date: "2026-07-24",
      url: "https://beamlynx.substack.com/p/where-is-the-ai-in-beamlynx",
      preview: `Beamlynx doesn't have any AI features. Many people have asked me "Why not use AI to generate SQL?" - valid question! It has made me question my choice… and every time I have decided against it. This is to protect the user experience I desperately want for Beamlynx.`
    },
    {
      title: "The Road Ahead for Beamlynx",
      date: "2026-05-19",
      url: "https://beamlynx.substack.com/p/the-road-ahead-for-beamlynx",
      preview: `Beamlynx turned into a surprisingly useful database client. I've saved a significant amount of time writing queries - although I might have spent even more time building it… but who's counting.`
    },
    {
      title: "Beamlynx gets a playground",
      date: "2025-09-15",
      url: "https://beamlynx.substack.com/p/beamlynx-gets-a-playground",
      preview: `Until now, the only way to try beamlynx was to set it up locally. And that kills curiosity fast. No one wants to do work for no apparent reason. There is no incentive. People need to see what is it it for them first. So I built the beamlynx playground. No setup. Just open it in your browser and play.`
    },
    {
      title: "Introducing Beamlynx",
      date: "2025-08-07",
      url: "https://beamlynx.substack.com/p/introducing-beamlynx",
      preview: `Pine-lang has evolved into much more than a domain-specific language (DSL). What began as a way to simplify SQL has grown into a full-fledged database client - one that lets me explore and interact with data in a visual, interactive way. This new system deserves a new name and a distinct identity. I call it Beamlynx.`
    },
    {
      title: "Insight. Simplicity. Delight.",
      date: "2025-06-15",
      url: "https://open.substack.com/pub/beamlynx/p/insight-simplicity-delight",
      preview: `Over time, I've come to expect three things from the systems I work with: they should teach me something, they should help me think clearly, and they should make the experience enjoyable. I am constantly refining Pine to meet that bar. Building for Insight: Teach me! I don't want to read the docs - the system should figure out my intent and show me the way. Building for Simplicity: Clarity of thought! I don't want to think about things that are not relevant to the problem at hand. Building for Delight: Fun! I don't want to feel like I am doing chores. The task of solving problems should be enjoyable.`
    },
    {
      title: "Discovering pine-lang",
      date: "2024-05-25",
      url: "https://beamlynx.substack.com/p/discovering-pine-lang-simplifying",
      preview: `It's 2017, and I'm working at Penneo. I've been with the company for a few years, but we're still in startup mode. The product isn't fully mature, and I often find myself diving into the data to fix bugs. Occasionally, I'm on the phone with a user, cramming the phone between my shoulder and ear—lacking decent headphones with a mic—trying to troubleshoot database issues on the fly...`
    },
    // Add more posts as they come
  ];

  return (
    <div className="bp-page min-h-screen py-12 sm:py-16 md:py-20">
      <title>{t('meta.title')}</title>
      <meta name="description" content={t('meta.description')} />
      <meta property="og:title" content={t('meta.ogTitle')} />
      <meta property="og:description" content={t('meta.ogDescription')} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.com/posts" />
      <meta property="og:image" content="https://beamlynx.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('meta.twitterTitle')} />
      <meta name="twitter:description" content={t('meta.twitterDescription')} />
      <meta name="twitter:image" content="https://beamlynx.com/og-image.png" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-8 sm:mb-12">
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: palette.primary }}
            >
              {t('heading')}
            </h1>
            {currentLocale !== 'en' && (
              <span className="text-sm" style={{ color: `${palette.secondary}99` }}>
                {t('englishOnlyNote')}
              </span>
            )}
          </div>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: 'var(--bp-panel)', borderColor: `${palette.accent}20` }}
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
                      {new Date(post.date).toLocaleDateString(HTML_LANG[currentLocale] ?? 'en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
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
                      {t('readMore')}
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