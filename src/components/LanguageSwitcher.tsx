import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useColorPalette } from "../contexts/ColorPaletteContext";
import { persistLocale } from "../i18n/detect";
import { getLangFromPathname, localizedPath, stripLocalePrefix } from "../i18n/paths";
import type { Locale } from "../i18n/config";

const LOCALES: Locale[] = ["en", "es", "zh", "da"];

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = "desktop", onNavigate }) => {
  const { t } = useTranslation("common");
  const palette = useColorPalette();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = getLangFromPathname(location.pathname);

  const currentLocale: Locale = lang ?? "en";
  const basePath = stripLocalePrefix(location.pathname, lang);

  const goToLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      onNavigate?.();
      return;
    }
    persistLocale(locale);
    navigate(`${localizedPath(locale, basePath)}${location.search}`);
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <div className="px-3 py-2">
        <div className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: `${palette.secondary}99` }}>
          {t("languageSwitcher.label")}
        </div>
        <div className="flex flex-wrap gap-2">
          {LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => goToLocale(locale)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{
                backgroundColor: locale === currentLocale ? `${palette.accent}20` : "transparent",
                color: locale === currentLocale ? palette.primary : palette.secondary,
                border: `1px solid ${palette.accent}20`,
              }}
            >
              {t(`languageSwitcher.${locale}`)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-200 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap"
        style={
          {
            color: palette.secondary,
            "--tw-ring-color": palette.accent,
          } as React.CSSProperties
        }
        aria-label={t("languageSwitcher.label")}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h18M12 3a15.3 15.3 0 010 18 15.3 15.3 0 010-18z M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
          />
        </svg>
        {/* Fixed width, sized to the longest label ("Español", ~57px measured)
            plus a little slack -- otherwise switching locales (e.g. "中文" at
            ~31px vs "English" at ~53px) resizes this button and everything
            in the navbar to its left/right shifts with it. */}
        <span className="inline-block w-[60px] text-left">{t(`languageSwitcher.${currentLocale}`)}</span>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        modal={false}
        className="z-50 mt-1 min-w-[9rem] rounded-lg border py-1 shadow-lg focus:outline-none [--anchor-gap:4px]"
        style={{
          backgroundColor: palette.background,
          borderColor: `${palette.accent}20`,
        }}
      >
        {LOCALES.map((locale) => (
          <MenuItem key={locale}>
            <button
              onClick={() => goToLocale(locale)}
              className="flex w-full items-center px-3 py-2 text-[14px] data-focus:bg-white/5"
              style={{
                color: locale === currentLocale ? palette.primary : palette.secondary,
                fontWeight: locale === currentLocale ? 600 : 400,
              }}
            >
              {t(`languageSwitcher.${locale}`)}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default LanguageSwitcher;
