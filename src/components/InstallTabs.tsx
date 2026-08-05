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
        <p className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          beamlynx is a desktop app for macOS, Windows, and Linux. Visit this
          page on your computer to install it.
        </p>
      )}
      <TabList className="flex gap-1 rounded-lg bg-gray-100 p-1 mb-4 w-fit">
        {TABS.map(tab => (
          <Tab
            key={tab.key}
            className={({ selected }) =>
              `rounded-md px-4 py-1.5 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                selected ? "bg-white text-pine-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {/* macOS */}
        <TabPanel className="space-y-3">
          <p className="text-base leading-7 text-gray-600">
            Via Homebrew (Apple Silicon only for now):
          </p>
          <CopyCommand command="brew install --cask beamlynx/tap/beamlynx" />
          <p className="text-sm text-gray-500">
            Or <ReleasesLink>download the .dmg directly</ReleasesLink>.
          </p>
          <p className="text-sm text-gray-500">
            This build isn't signed yet, so macOS will block it on first
            launch -- we're working on a fix. If you'd like to try it anyway,
            you can self-sign it and clear the quarantine flag from Terminal:
          </p>
          <CopyCommand command="codesign --force --deep --sign - /Applications/beamlynx.app && xattr -cr /Applications/beamlynx.app" />
          <p className="text-sm text-gray-500">
            That's a self-applied signature, not one from us, so it may not
            get past Gatekeeper on every macOS version. Auto-update also
            doesn't work yet on macOS -- you'll need to re-download and
            re-run these commands for each new version until signing is
            fixed.
          </p>
        </TabPanel>

        {/* Windows */}
        <TabPanel className="space-y-3">
          <p className="text-base leading-7 text-gray-600">
            <ReleasesLink>Download the .exe installer</ReleasesLink> and run it.
          </p>
          <p className="text-sm text-gray-500">
            This build isn't code-signed yet, so Windows SmartScreen may warn you.
            Click <span className="font-medium">More info</span> then{" "}
            <span className="font-medium">Run anyway</span> to launch it.
          </p>
        </TabPanel>

        {/* Linux */}
        <TabPanel className="space-y-3">
          <p className="text-base leading-7 text-gray-600">
            <ReleasesLink>Download the .AppImage</ReleasesLink> (works on most
            distros, no installation needed):
          </p>
          <CopyCommand command="chmod +x beamlynx.AppImage && ./beamlynx.AppImage" />
          <p className="text-sm text-gray-500">
            Or, on Debian/Ubuntu, <ReleasesLink>download the .deb</ReleasesLink> and
            install it with your usual package manager.
          </p>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default InstallTabs;
