import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { detectOS, isMobileDevice, type DetectedOS } from "../utils/detectOS";

const RELEASES_URL = "https://github.com/beamlynx/beamlynx-desktop/releases/latest";

const TABS: { key: DetectedOS; label: string }[] = [
  { key: "mac", label: "macOS" },
  { key: "windows", label: "Windows" },
  { key: "linux", label: "Linux" },
];

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const onCopied = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(command).then(onCopied).catch(() => fallbackCopy(command, onCopied));
    } else {
      fallbackCopy(command, onCopied);
    }
  };

  return (
    // A real <pre>, not a styled <div> -- reuses the site's existing dark
    // code-block theme (index.css's `pre`/`pre code` rules) instead of
    // fighting it. A <div> here would make this <code> match the global
    // `:not(pre) > code` inline-code-chip rule, which sets color to
    // --color-primary (#2E3440) -- the exact same navy as the intended
    // background, i.e. invisible text on identically-colored background.
    <pre className="flex items-center justify-between gap-4 !my-0">
      <code className="overflow-x-auto">{command}</code>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors duration-200"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </pre>
  );
}

// Same clipboard-fallback pattern as DocSection.tsx's handleCopy.
function fallbackCopy(text: string, onDone: () => void) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    onDone();
  } catch {
    // Nothing more we can do -- user can still select the text manually.
  }
  document.body.removeChild(textArea);
}

function ReleasesLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={RELEASES_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-pine-600 hover:text-pine-800 hover:underline font-medium transition-colors duration-200"
    >
      {children}
    </a>
  );
}

const InstallTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(() => TABS.findIndex(t => t.key === detectOS()));
  // Android's own UA string contains "Linux" (it's Linux-kernel-based), so
  // without this it would auto-select the Linux *desktop* tab -- actively
  // wrong, since beamlynx-desktop has no mobile build at all. Still show
  // the tabs (e.g. useful for grabbing the brew command to send to a
  // colleague), just don't pretend a phone is a supported install target.
  const [isMobile] = useState(isMobileDevice);

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      {isMobile && (
        <p
          className="mb-4 rounded-lg border px-4 py-3 text-sm"
          style={{ backgroundColor: 'var(--bp-panel-raised)', borderColor: 'var(--bp-amber)', color: '#f0c887' }}
        >
          beamlynx is a desktop app for macOS, Windows, and Linux. Visit this
          page on your computer to install it.
        </p>
      )}
      <TabList className="flex gap-1 rounded-lg p-1 mb-4 w-fit" style={{ backgroundColor: 'var(--bp-panel-raised)' }}>
        {TABS.map(tab => (
          <Tab
            key={tab.key}
            className={({ selected }) =>
              `rounded-md px-4 py-1.5 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                selected
                  ? "shadow-sm bg-[var(--bp-trace)] text-[var(--bp-on-trace)]"
                  : "text-[var(--bp-text-dim)] hover:text-[var(--bp-text)]"
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {/* `grid` + each panel on `[grid-area:1/1]` stacks all three in the same
          cell, so the row sizes to the TALLEST panel's content regardless of
          which one is showing - `static` keeps every panel actually rendered
          (not unmounted/collapsed to a 0-height placeholder, which is
          Headless UI's default for an inactive panel) so its height still
          counts toward that. Without this, switching to Windows - the
          shortest panel, no copy-command block - shrank the card and moved
          everything below it. `invisible` (visibility, not display) hides
          the non-selected panels visually and from the accessibility tree
          while still occupying their layout box. */}
      <TabPanels className="grid">
        {/* macOS */}
        <TabPanel static className={({ selected }) => `[grid-area:1/1] space-y-3 ${selected ? 'visible' : 'invisible'}`}>
          <p className="text-base leading-7" style={{ color: 'var(--bp-text-dim)' }}>
            Via Homebrew (Apple Silicon only for now):
          </p>
          <CopyCommand command="brew install --cask beamlynx/tap/beamlynx" />
          <p className="text-sm" style={{ color: 'var(--bp-text-faint)' }}>
            Or <ReleasesLink>download the .dmg directly</ReleasesLink>.
          </p>
        </TabPanel>

        {/* Windows */}
        <TabPanel static className={({ selected }) => `[grid-area:1/1] space-y-3 ${selected ? 'visible' : 'invisible'}`}>
          <p className="text-base leading-7" style={{ color: 'var(--bp-text-dim)' }}>
            <ReleasesLink>Download the .exe installer</ReleasesLink> and run it.
          </p>
          <p className="text-sm" style={{ color: 'var(--bp-text-faint)' }}>
            This build isn't code-signed yet, so Windows SmartScreen may warn you.
            Click <span className="font-medium">More info</span> then{" "}
            <span className="font-medium">Run anyway</span> to launch it.
          </p>
        </TabPanel>

        {/* Linux */}
        <TabPanel static className={({ selected }) => `[grid-area:1/1] space-y-3 ${selected ? 'visible' : 'invisible'}`}>
          <p className="text-base leading-7" style={{ color: 'var(--bp-text-dim)' }}>
            <ReleasesLink>Download the .AppImage</ReleasesLink> (works on most
            distros, no installation needed):
          </p>
          <CopyCommand command="chmod +x beamlynx.AppImage && ./beamlynx.AppImage" />
          <p className="text-sm" style={{ color: 'var(--bp-text-faint)' }}>
            Or, on Debian/Ubuntu, <ReleasesLink>download the .deb</ReleasesLink> and
            install it with your usual package manager.
          </p>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default InstallTabs;
