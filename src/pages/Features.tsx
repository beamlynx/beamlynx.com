import type React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getLangFromPathname, localizedPath } from "../i18n/paths";
import { trackEvent } from "../utils/analytics";
import { DEMO_STEPS, JOIN_CANDIDATES } from "../components/home/demoSteps";

// Each feature has a small drawing of the app beside it. They are drawings,
// not screenshots (the page says so), but every name and value in them is
// real: join candidates and rows come from demoSteps.ts (recorded Pine
// output), and the Paths example is the one in pine-lang/docs/paths.md.

const OG_IMAGE = "https://beamlynx.com/og-image.png";

const FEATURES = ["joins", "paths", "traverse", "edit", "agents", "access", "sql", "keyboard", "grid"] as const;
type FeatureId = (typeof FEATURES)[number];

// --- Drawings ---------------------------------------------------------------

const JoinsVisual = () => (
  // The orders picker: it has both groups, and two routes to the same table.
  <div className="fv-picker">
    <div className="fv-picker-head">orders · JOIN</div>
    {JOIN_CANDIDATES[1].map(g => (
      <div key={g.label}>
        <div className={`fv-group${g.label === "has" ? " is-has" : ""}`}>{g.label}</div>
        {g.items.map(c => (
          <div key={c.pine} className="fv-item">
            <span>
              {c.table}
              {c.columnHint && <span className="fv-hint"> .{c.columnHint}</span>}
            </span>
            <span className="fv-dim">{c.schema}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const PathsVisual = () => (
  <div className="fv-code">
    <div className="fv-code-in">
      company <span className="fv-pipe">|</span> <span className="fv-op">?</span> document
    </div>
    {["employee .company_id | document .employee_id", "employee .company_id | document .created_by", "document .company_id"].map(
      route => (
        <div key={route} className="fv-route">
          <span className="fv-arrow">→</span> {route}
        </div>
      ),
    )}
  </div>
);

const TraverseVisual = () => {
  const has = JOIN_CANDIDATES[0].find(g => g.label === "has")?.items ?? [];
  return (
    <div className="fv-panel">
      <div className="fv-panel-title">traverse · customers</div>
      <ul className="fv-tree">
        {has.slice(0, 6).map(c => (
          <li key={c.pine}>
            <span className="fv-dim">{c.schema}.</span>
            {c.table}
          </li>
        ))}
      </ul>
      <div className="fv-actions">
        <span className="fv-btn">Count rows</span>
        <span className="fv-btn">Delete rows…</span>
      </div>
    </div>
  );
};

const EditVisual = () => {
  const s = DEMO_STEPS[1];
  const cols = ["first_name", "order_number", "status"];
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
          {s.rows.slice(0, 4).map((r, i) => (
            <tr key={i}>
              {idx.map((j, k) => (
                <td key={k} className={i === 1 && k === 2 ? "is-edited" : undefined}>
                  {i === 1 && k === 2 ? "delivered" : String(r[j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fv-toast">✓ Saved</div>
    </div>
  );
};

const AgentsVisual = () => (
  <div className="fv-panel">
    <div className="fv-panel-title">
      <span className="fv-agent-dot" aria-hidden="true" /> MCP tools
    </div>
    <ul className="fv-tools">
      {["find_tables", "complete_query", "get_pine_doc", "run_query", "request_reveal", "check_reveal"].map(tool => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
    <div className="fv-note">update! · delete! → refused</div>
  </div>
);

const AccessVisual = () => {
  const s = DEMO_STEPS[0];
  return (
    <div className="fv-stack">
      <table className="fv-grid">
        <thead>
          <tr>
            <th>first_name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {s.rows.slice(0, 3).map((r, i) => (
            <tr key={i}>
              <td>{String(r[0])}</td>
              <td className="fv-masked">xxxxx</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fv-approval">
        <div className="fv-approval-title">Needs approval</div>
        <div className="fv-dim">Agent asks to see customers.email</div>
        <div className="fv-actions">
          <span className="fv-btn is-primary">Approve</span>
          <span className="fv-btn">Decline</span>
        </div>
      </div>
    </div>
  );
};

const SqlVisual = () => {
  const s = DEMO_STEPS[1];
  return (
    <div className="fv-stack">
      <div className="fv-code">
        <div className="fv-label">Pine</div>
        {s.expression.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div className="fv-code">
        <div className="fv-label">SQL</div>
        {s.sql.replace(/ (FROM|JOIN|LIMIT) /g, "\n$1 ").split("\n").map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};

const KEYS: [string, string][] = [
  ["i", "join"],
  ["w", "where"],
  ["s", "select"],
  ["p", "path"],
  ["j / k", "move"],
  ["x", "remove"],
];

const KeyboardVisual = () => (
  <div className="fv-panel">
    <div className="fv-keys">
      <span className="fv-key is-wide">Ctrl+Shift+P</span>
      <span className="fv-dim">commands</span>
      {KEYS.map(([k, what]) => (
        <span key={k} className="fv-keyrow">
          <span className="fv-key">{k}</span>
          <span className="fv-dim">{what}</span>
        </span>
      ))}
    </div>
  </div>
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
