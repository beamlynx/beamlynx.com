import type React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getLangFromPathname, localizedPath } from "../i18n/paths";
import { trackEvent } from "../utils/analytics";
import { DEMO_STEPS, JOIN_CANDIDATES } from "../components/home/demoSteps";
import MiniCanvas from "../components/MiniCanvas";
import type { MiniEdge, MiniNode } from "../components/MiniCanvas";

// Each feature has a small drawing of the app beside it, mostly in the
// style of its canvas. They are drawings, not screenshots (the page says
// so), but the table names and values in them are real: join candidates and
// rows come from demoSteps.ts (recorded Pine output), and the Paths example
// is the one in pine-lang/docs/paths.md.

const OG_IMAGE = "https://beamlynx.com/og-image.png";

const FEATURES = ["joins", "paths", "traverse", "edit", "access", "sql", "keyboard", "grid"] as const;
type FeatureId = (typeof FEATURES)[number];


// --- Drawings ---------------------------------------------------------------
// Canvas drawings in the app's style (MiniCanvas), with as little text as
// possible: the picture should carry the idea, the paragraph beside it the
// detail.

const JoinsVisual = () => {
  // What Pine offers from `orders`, kept simple: its one parent, customers,
  // and the tables that point at it. (It also belongs to customer_addresses
  // twice; the drawing leaves that out.)
  const has = JOIN_CANDIDATES[1][0].items;
  const nodes: MiniNode[] = [
    { id: "customers", x: 10, y: 140, label: "customers", candidate: true },
    { id: "orders", x: 220, y: 140, label: "orders", alias: "o_1", current: true },
    ...has.map((c, i) => ({
      id: `h${i}`,
      x: 430,
      y: 30 + i * 78,
      label: c.table,
      detail: c.schema === "public" ? undefined : c.schema,
      candidate: true,
    })),
  ];
  const edges: MiniEdge[] = nodes.filter(n => n.id !== "orders").map(n => ({ from: "orders", to: n.id }));
  return (
    <MiniCanvas
      height={300}
      nodes={nodes}
      edges={edges}
      overlay={
        <>
          <span className="mc-tag" style={{ left: "1.7%", top: "38%" }}>belongs to</span>
          <span className="mc-tag is-accent" style={{ right: "1.7%", top: "0%" }}>has</span>
        </>
      }
    />
  );
};

const PathsVisual = () => (
  // Two real routes in the sample schema, from its foreign keys
  // (pine-lang/docker/db/init/001_ecommerce_seed.sql): through orders and
  // order_items, or through product_reviews.
  <MiniCanvas
    height={270}
    nodes={[
      { id: "customers", x: 5, y: 112, w: 120, label: "customers", current: true },
      { id: "reviews", x: 240, y: 30, w: 120, label: "product_reviews" },
      { id: "orders", x: 160, y: 200, w: 120, label: "orders" },
      { id: "items", x: 315, y: 200, w: 120, label: "order_items" },
      { id: "products", x: 475, y: 112, w: 120, label: "products" },
    ]}
    edges={[
      { from: "customers", to: "reviews", highlight: true },
      { from: "reviews", to: "products", highlight: true },
      { from: "customers", to: "orders", highlight: true },
      { from: "orders", to: "items", highlight: true },
      { from: "items", to: "products", highlight: true },
    ]}
    overlay={
      <span className="mc-query" style={{ left: "1.7%", top: "0%" }}>
        customers <span className="fv-pipe">|</span> <span className="fv-op">?</span> products
      </span>
    }
  />
);

const TraverseVisual = () => (
  // Depth first: customers, the tables that point at it, then the tables
  // that point at those. Each line is a real foreign key in the sample
  // schema. The delete script works from the deepest column back.
  <MiniCanvas
    height={290}
    nodes={[
      {
        id: "customers",
        x: 10,
        y: 100,
        label: "customers",
        current: true,
        below: (
          <div className="mc-menu">
            <span className="mc-menu-btn">Count rows</span>
            <span className="mc-menu-btn">Delete rows…</span>
          </div>
        ),
      },
      { id: "orders", x: 220, y: 60, label: "orders" },
      { id: "addresses", x: 220, y: 190, label: "customer_addresses" },
      { id: "items", x: 430, y: 30, label: "order_items" },
      { id: "payments", x: 430, y: 110, label: "payment_events", detail: "audit" },
    ]}
    edges={[
      { from: "customers", to: "orders" },
      { from: "customers", to: "addresses" },
      { from: "orders", to: "items" },
      { from: "orders", to: "payments" },
    ]}
    overlay={
      <>
        <span className="mc-tag" style={{ left: "36.7%", top: "0%" }}>depth 1</span>
        <span className="mc-tag" style={{ left: "71.7%", top: "0%" }}>depth 2</span>
      </>
    }
  />
);

const EditVisual = () => {
  const s = DEMO_STEPS[1];
  const cols = ["first_name", "order_number", "status"];
  const idx = cols.map(c => s.columns.indexOf(c));
  return (
    <div className="fv-stack">
      <MiniCanvas
        height={110}
        nodes={[
          { id: "c", x: 10, y: 20, label: "customers", alias: "c_0" },
          { id: "o", x: 430, y: 20, label: "orders", alias: "o_1", current: true },
        ]}
        edges={[{ from: "c", to: "o" }]}
      />
      <table className="fv-grid">
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.slice(0, 3).map((r, i) => (
            <tr key={i}>
              {idx.map((j, k) => (
                <td key={k} className={i === 1 && k === 2 ? "is-edited" : undefined}>
                  {i === 1 && k === 2 ? "delivered ✓" : String(r[j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AccessVisual = () => (
  <div className="fv-stack">
    <MiniCanvas
      height={150}
      nodes={[
        {
          id: "c",
          x: 10,
          y: 30,
          label: "customers",
          alias: "c_0",
          current: true,
          chips: [["SEL", ["first_name", "🔒 email"]]],
        },
      ]}
      edges={[]}
      overlay={
        <div className="fv-approval" style={{ position: "absolute", right: "1.7%", top: "8%" }}>
          <div className="fv-approval-title">Agent asks · 🔒 email</div>
          <div className="fv-actions">
            <span className="fv-btn is-primary">Approve</span>
            <span className="fv-btn">Decline</span>
          </div>
        </div>
      }
    />
    <table className="fv-grid">
      <thead>
        <tr>
          <th>first_name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {DEMO_STEPS[0].rows.slice(0, 3).map((r, i) => (
          <tr key={i}>
            <td>{String(r[0])}</td>
            <td className="fv-masked">xxxxx</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SqlVisual = () => {
  const s = DEMO_STEPS[1];
  return (
    <div className="fv-stack">
      <MiniCanvas
        height={110}
        nodes={[
          { id: "c", x: 10, y: 28, label: "customers", alias: "c_0" },
          { id: "o", x: 430, y: 28, label: "orders", alias: "o_1", current: true },
        ]}
        edges={[{ from: "c", to: "o" }]}
        overlay={
          <span className="mc-toolbar" style={{ left: "1.7%", top: "4%" }}>
            <span>PINE</span>
            <span className="is-active">SQL</span>
          </span>
        }
      />
      <div className="fv-code">
        {s.sql.replace(/ (FROM|JOIN|LIMIT) /g, "\n$1 ").split("\n").map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};

// The action bar marks each action's shortcut key. JOIN's is `i`, as in
// the app (beamlynx-ui hooks/useCanvasKeybindings.ts).
const ActionBar = () => (
  <span className="mc-actionbar">
    <span><kbd>S</kbd>ELECT</span>
    <span><kbd>W</kbd>HERE</span>
    <span>JO<kbd>I</kbd>N</span>
    <span><kbd>+</kbd></span>
  </span>
);

const KeyboardVisual = () => (
  <MiniCanvas
    height={190}
    nodes={[
      { id: "c", x: 10, y: 110, label: "customers", alias: "c_0" },
      { id: "o", x: 300, y: 110, label: "orders", alias: "o_1", current: true, above: <ActionBar /> },
    ]}
    edges={[{ from: "c", to: "o" }]}
    overlay={
      <>
        <span className="mc-keys" style={{ left: "1.7%", top: "4%" }}>
          <kbd>Ctrl+Shift+P</kbd>
          <span className="mc-keys-label">commands</span>
        </span>
        <span className="mc-keys" style={{ left: "31%", top: "80%" }}>
          <kbd>↑</kbd>
          <kbd>↓</kbd>
          <span className="mc-keys-label">move</span>
        </span>
      </>
    }
  />
);

const GridVisual = () => {
  const s = DEMO_STEPS[2];
  const cols = ["first_name", "order_id", "quantity", "unit_price"];
  const idx = cols.map(c => s.columns.indexOf(c));
  return (
    <div className="fv-grid-wrap">
      <table className="fv-grid">
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.slice(0, 5).map((r, i) => (
            <tr key={i}>
              {idx.map((j, k) => (
                <td key={k} className={i >= 1 && i <= 3 && k >= 2 ? "is-selected" : undefined}>
                  {String(r[j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fv-toast">Ctrl+C → paste into a spreadsheet</div>
    </div>
  );
};

const VISUALS: Record<FeatureId, () => React.ReactElement> = {
  joins: JoinsVisual,
  paths: PathsVisual,
  traverse: TraverseVisual,
  edit: EditVisual,
  access: AccessVisual,
  sql: SqlVisual,
  keyboard: KeyboardVisual,
  grid: GridVisual,
};

// --- Page ---------------------------------------------------------------------

const Features = () => {
  const { t } = useTranslation("features");
  const location = useLocation();
  const downloadHref = localizedPath(getLangFromPathname(location.pathname) ?? "en", "/download");
  const also = t("also.items", { returnObjects: true }) as string[];

  // Links like /features#paths (from the homepage) scroll here once the
  // page has rendered; ScrollToTop leaves hash links alone.
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [location.hash, location.key]);

  return (
    <div className="bp-page home features flex flex-col min-h-screen">
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta property="og:title" content={t("meta.title")} />
      <meta property="og:description" content={t("meta.description")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.com/features" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={OG_IMAGE} />

      <section className="home-hero px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="home-title">{t("heading")}</h1>
          <p className="home-lede mt-6">{t("lede")}</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="mx-auto max-w-6xl feat-list">
          {FEATURES.map(id => {
            const Visual = VISUALS[id];
            return (
              <motion.article
                key={id}
                id={id}
                className="feat"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
              >
                <div className="feat-text">
                  <h2>{t(`items.${id}.title`)}</h2>
                  <p>{t(`items.${id}.body`)}</p>
                </div>
                <div className="feat-visual" aria-hidden="true">
                  <Visual />
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="mx-auto max-w-6xl feat-footnote">{t("drawingsNote")}</p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-6xl feat-also">
          <h2>{t("also.heading")}</h2>
          <ul>
            {also.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-closing px-4 sm:px-6 lg:px-8">
        <h2>{t("closing.heading")}</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to={downloadHref}
            className="bp-btn bp-btn-primary"
            onClick={() => trackEvent("features_download_clicked")}
          >
            {t("closing.download")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
