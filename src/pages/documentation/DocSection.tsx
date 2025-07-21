import React, { useState } from 'react';
import { useColorPalette } from '../../contexts/ColorPaletteContext';

interface DocSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const DocSection: React.FC<DocSectionProps> = ({ id, title, children }) => {
  const palette = useColorPalette();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const permalink = `${window.location.origin}${window.location.pathname}#${id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(permalink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for older browsers or insecure contexts
      // 
      // I'm trying to check if this works with domain forwarding with masking
      const textArea = document.createElement('textarea');
      textArea.value = permalink;
      
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <section id={id} className="mb-16">
      <div className="relative group -ml-8 pl-8">
        <h2
          className="text-3xl font-bold mb-6 tracking-tight"
          style={{ color: palette.primary }}
        >
          {title}
        </h2>
        <a
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            handleCopy();
            window.history.pushState(null, '', `#${id}`);
          }}
          className="absolute left-0 top-0 p-1 mt-1 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          style={{ color: palette.secondary }}
          aria-label="Copy permalink"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.596a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          )}
        </a>
      </div>
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </section>
  );
};

export default DocSection; 