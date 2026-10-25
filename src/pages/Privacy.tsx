import LegalPage from "./LegalPage";

// What Beamlynx collects, from the app and this site. The app's first-run
// screen and Settings -> Account link here (beamlynx-ui's
// components/settings/AccountSection.tsx, PRIVACY_URL), so keep the
// /privacy path.
const Privacy = () => <LegalPage ns="privacy" path="/privacy" />;

export default Privacy;
