import LegalPage from "./LegalPage";

// The terms for using the app and this site. The app's first-run screen links
// here (beamlynx-ui's components/settings/AccountSection.tsx, TERMS_URL), so
// keep the /terms path.
const Terms = () => <LegalPage ns="terms" path="/terms" />;

export default Terms;
