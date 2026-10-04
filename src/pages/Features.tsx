import type React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getLangFromPathname, localizedPath } from "../i18n/paths";
import { trackEvent } from "../utils/analytics";
import { DEMO_STEPS, JOIN_CANDIDATES, joinColumnOf } from "../components/home/demoSteps";
import MiniCanvas from "../components/MiniCanvas";
import type { MiniEdge, MiniNode } from "../components/MiniCanvas";

// Each feature has a small drawing of the app beside it, mostly in the
// style of its canvas. They are drawings, not screenshots (the page says
// so), but the table names and values in them are real: join candidates and
// rows come from demoSteps.ts (recorded Pine output), and the Paths example
// is the one in pine-lang/docs/paths.md.

const OG_IMAGE = "https://beamlynx.com/og-image.png";

const FEATURES = ["joins", "paths", "traverse", "edit", "agents", "access", "sql", "keyboard", "grid"] as const;
type FeatureId = (typeof FEATURES)[number];

// Shipped, but still changing. Marked on the page so it isn't oversold.
const EXPERIMENTAL: FeatureId[] = ["agents"];

// --- Drawings ---------------------------------------------------------------
// Canvas drawings in the app's style (MiniCanvas), with as little text as
// possible: the picture should carry the idea, the paragraph beside it the
// detail.

const JoinsVisual = () => {
  // What Pine offers from `orders`: "belongs to" on the left, "has" on the
  // right, and two routes to customer_addresses told apart by column.
  const [has, belongsTo] = [JOIN_CANDIDATES[1][0].items, JOIN_CANDIDATES[1][1].items];
  const nodes: MiniNode[] = [
    { id: "orders", x: 220, y: 150, label: "orders", alias: "o_1", current: true },
    ...belongsTo.map((c, i) => ({
      id: `b${i}`,
      x: 10,
      y: 40 + i * 100,
      label: c.table,
      detail: c.columnHint ? `.${joinColumnOf(c)}` : undefined,
      candidate: true,
    })),
    ...has.map((c, i) => ({
      id: `h${i}`,
      x: 430,
      y: 30 + i * 78,
      label: c.table,
      detail: c.schema === "public" ? undefined : c.schema,
      candidate: true,
    })),
  ];
  const edges: MiniEdge[] = nodes.slice(1).map(n => ({ from: "orders", to: n.id }));
  return (
    <MiniCanvas
      height={300}
      nodes={nodes}
      edges={edges}
      overlay={
        <>
          <span className="mc-tag" style={{ left: "1.7%", top: "2%" }}>belongs to</span>
          <span className="mc-tag is-accent" style={{ right: "1.7%", top: "0%" }}>has</span>
        </>
      }
    />
  );
};

const PathsVisual = () => (
  // The example from pine-lang/docs/paths.md: three routes from company to
  // document. The one-hop route ranks last (dashed).
  <MiniCanvas
    height={270}
    nodes={[
      { id: "company", x: 10, y: 66, label: "company", current: true },
      { id: "document", x: 430, y: 66, label: "document" },
      { id: "employee", x: 220, y: 186, label: "employee" },
    ]}
    edges={[
      { from: "company", to: "document", dashed: true, offset: -14, label: "ranked last", labelAt: "start" },
      { from: "company", to: "employee", highlight: true },
      { from: "employee", to: "document", highlight: true, offset: -8, label: ".employee_id", labelAt: "start" },
      { from: "employee", to: "document", highlight: true, offset: 8, label: ".created_by", labelAt: "start" },
    ]}
    overlay={
      <span className="mc-query" style={{ left: "1.7%", top: "0%" }}>
        company <span className="fv-pipe">|</span> <span className="fv-op">?</span> document
      </span>
    }
  />
);

const TraverseVisual = () => {
  const has = JOIN_CANDIDATES[0].find(g => g.label === "has")?.items ?? [];
  const deps = [...has].sort((a, b) => Number(a.schema !== "public") - Number(b.schema !== "public")).slice(0, 6);
  return (
    <MiniCanvas
      height={330}
      nodes={[
        {
          id: "customers",
          x: 10,
          y: 135,
          label: "customers",
          alias: "c_0",
          current: true,
          below: (
            <div className="mc-menu">
              <span className="mc-menu-btn">Count rows</span>
              <span className="mc-menu-btn">Delete rows…</span>
            </div>
          ),
        },
        ...deps.map((c, i) => ({
          id: c.table,
          x: 430,
          y: 8 + i * 54,
          label: c.table,
          detail: c.schema === "public" ? undefined : c.schema,
        })),
      ]}
      edges={deps.map(c => ({ from: "customers", to: c.table }))}
    />
  );
};

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

const AgentsVisual = () => (
  <div className="fv-agent">
    <div className="fv-agent-tab">
      <span className="fv-agent-dot" aria-hidden="true" /> Agent
    </div>
    <MiniCanvas
      height={170}
      nodes={[
        { id: "c", x: 10, y: 50, label: "customers", alias: "c_0" },
        {
          id: "o",
          x: 300,
          y: 50,
          label: "orders",
          alias: "o_1",
          current: true,
          chips: [["WHERE", ["status = 'pending'"]]],
        },
      ]}
      edges={[{ from: "c", to: "o" }]}
      overlay={
        <span className="mc-comment" style={{ left: "1.7%", top: "2%" }}>
          Which customers have orders still pending?
        </span>
      }
    />
  </div>
);

const AccessVisual = () => (
  <div className="fv-stack">
    <MiniCanvas
      height={120}
      nodes={[
        {
          id: "c",
          x: 10,
          y: 14,
          label: "customers",
          alias: "c_0",
          current: true,
          chips: [["SEL", ["first_name", "🔒 email"]]],
        },
      ]}
      edges={[]}
      overlay={
        <div className="fv-approval" style={{ position: "absolute", right: "1.7%", top: "8%" }}>
          <div className="fv-approval-title">🔒 email</div>
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
          <kbd>j</kbd>
          <kbd>k</kbd>
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
  agents: AgentsVisual,
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
                  {EXPERIMENTAL.includes(id) && <span className="feat-badge">{t("experimental")}</span>}
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
