import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { linkDesktopInstall } from "../utils/analytics";

// The desktop app's sign-in ends here: its 127.0.0.1 page moves the browser
// on to /signed-in?id=<install ID> (beamlynx-desktop's src/main/account.ts).
// The sign-in is already complete, so this page only joins the browser's
// visits to the person. If anything here fails, nothing is lost.
const INSTALL_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const SignedIn = () => {
  const { t } = useTranslation("common");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id && INSTALL_ID.test(id)) {
      try {
        linkDesktopInstall(id);
      } catch {
        // Usage stats never get in the way.
      }
    }
    // Keep the ID out of the address bar and the browser's history.
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  return (
    <div className="bp-page flex flex-col">
      <title>{t("signedIn.title")}</title>
      <meta name="robots" content="noindex" />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--bp-text)" }}>
            {t("signedIn.title")}
          </h1>
          <p className="mt-4 text-base leading-7" style={{ color: "var(--bp-text-dim)" }}>
            {t("signedIn.body")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignedIn;
