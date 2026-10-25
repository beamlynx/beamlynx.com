// Grephyte's contact address, written so a scraper looking for an email
// address in the page doesn't find one. The page shows "contact (at)
// grephyte.com", and the full address only exists once someone clicks it.
// Translations place it with <email/> (see pages/Privacy.tsx).
const USER = 'contact';
const DOMAIN = 'grephyte.com';

const ContactEmail = ({ className }: { className?: string }) => (
  <button
    type="button"
    onClick={() => {
      window.location.href = `mailto:${USER}@${DOMAIN}`;
    }}
    className={className ?? 'underline decoration-dotted underline-offset-2 hover:no-underline'}
  >
    {USER} (at) {DOMAIN}
  </button>
);

export default ContactEmail;
