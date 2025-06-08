import React from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';

const Footer: React.FC = () => {
  const palette = useColorPalette();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/pine-lang',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'Substack',
      href: 'https://pinelang.substack.com',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      )
    }
  ];

  return (
    <footer 
      className="mt-24 border-t py-12 bg-gradient-to-b from-transparent to-pine-50/30"
      style={{ 
        borderColor: `${palette.accent}20`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg p-1.5"
                style={{ 
                  color: palette.secondary,
                  '--tw-ring-color': palette.accent
                } as React.CSSProperties}
                aria-label={item.name}
              >
                <item.icon 
                  className="w-7 h-7 transition-colors group-hover:text-pine-600" 
                  aria-hidden="true" 
                />
              </a>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2 text-center">
            <div 
              className="text-sm font-medium tracking-wide flex items-center"
              style={{ color: palette.secondary }}
            >
              Made with{' '}
              <span 
                className="mx-1 transform hover:scale-110 transition-transform"
                style={{ color: '#0052A5' }} // Nordic blue from Danish flag
              >
                ♥
              </span>
              {' '}in Denmark
            </div>
            <div 
              className="text-xs"
              style={{ color: `${palette.secondary}99` }}
            >
              © {new Date().getFullYear()} Pine Lang. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 