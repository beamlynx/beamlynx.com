import { useColorPalette } from '../contexts/colorPalette';

// How code looks in the docs: inline `code` and <pre> blocks. Shared by the
// Pine docs (/docs) and the AI agents page (/docs/agents).
const DocsStyles = () => {
  const palette = useColorPalette();
  return (
    <style>
      {`
        section[id] {
          scroll-margin-top: 100px;
        }
        section[id] h2 {
          scroll-margin-top: 100px;
        }
        /* Style inline code blocks */
        code:not(pre code) {
          background-color: ${palette.accent}10;
          color: ${palette.accent};
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.875em;
          font-weight: 500;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          white-space: nowrap;
        }
        /* Remove any pseudo-elements that might be adding backticks */
        code:not(pre code)::before,
        code:not(pre code)::after {
          content: none !important;
        }
        /* Style code blocks within pre tags */
        pre {
          background-color: ${palette.accent}10;
          border-radius: 0.5em;
          padding: 1em;
          margin: 1em 0;
          overflow-x: auto;
        }
        pre code {
          color: ${palette.primary};
          padding: 0;
          background: none;
          font-size: 0.875em;
          line-height: 1.7;
        }
        pre code::before,
        pre code::after {
          content: none !important;
        }
      `}
    </style>
  );
};

export default DocsStyles;
